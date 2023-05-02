"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const paypal = require('paypal-rest-sdk');
const global_service_1 = require("../shared/global.service");
const querystring = require("qs");
const crypto = require("crypto");
const date_fns_1 = require("date-fns");
const prisma_service_1 = require("../prisma/prisma.service");
let PaymentService = class PaymentService {
    constructor(config, prisma) {
        this.config = config;
        this.prisma = prisma;
        const clientId = this.config.get('PAYPAL_CLIENT_ID');
        const clientSecret = this.config.get('PAYPAL_CLIENT_SECRET');
        paypal.configure({
            mode: 'sandbox',
            client_id: clientId,
            client_secret: clientSecret,
        });
    }
    vndToUsd(vnd) {
        const trans = vnd * Number(this.config.get('VND_USD'));
        const result = Math.round(trans * 100) / 100;
        return result;
    }
    async checkoutLink(userId) {
        try {
            const host = global_service_1.globalVariables.paymentHost[userId];
            const { total, itemValue, shipFee } = global_service_1.globalVariables.orderDetail[userId];
            const location = global_service_1.globalVariables.deliveryLocation[userId];
            const create_payment_json = {
                intent: 'sale',
                payer: {
                    payment_method: 'paypal',
                },
                redirect_urls: {
                    return_url: host + '/success',
                    cancel_url: host + '/cancel',
                },
                transactions: [
                    {
                        item_list: {
                            shipping_address: {
                                line1: location.address,
                                line2: location.ward,
                                city: location.district,
                                state: location.province,
                                country_code: 'VN',
                            },
                        },
                        amount: {
                            currency: 'USD',
                            total: this.vndToUsd(total),
                            details: {
                                subtotal: this.vndToUsd(itemValue),
                                shipping: this.vndToUsd(shipFee),
                            },
                        },
                        shipping_method: 'United Postal Service',
                        description: 'Pay with paypal',
                    },
                ],
            };
            console.log(JSON.stringify(create_payment_json));
            function paymentCreateAsync() {
                return new Promise(function (resolve, reject) {
                    paypal.payment.create(create_payment_json, function (error, payment) {
                        if (error) {
                            reject(error);
                        }
                        else {
                            for (let i = 0; i < payment.links.length; i++) {
                                if (payment.links[i].rel === 'approval_url') {
                                    resolve(payment.links[i].href);
                                }
                            }
                        }
                    });
                });
            }
            return await paymentCreateAsync();
        }
        catch (error) {
            throw error;
        }
    }
    async succcessCheckout(userId) {
        const payerId = global_service_1.globalVariables.other[userId].payerId;
        const paymentId = global_service_1.globalVariables.other[userId].paymentId;
        const { total, itemValue, shipFee } = global_service_1.globalVariables.orderDetail[userId];
        const execute_payment_json = {
            payer_id: payerId,
            transactions: [
                {
                    amount: {
                        currency: 'USD',
                        total: this.vndToUsd(total),
                        details: {
                            subtotal: this.vndToUsd(itemValue),
                            shipping: this.vndToUsd(shipFee),
                        },
                    },
                },
            ],
        };
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            }
            else {
                return;
            }
        });
    }
    async payoutSeller(orderId) {
        try {
            const order = await this.prisma.order.findFirst({ where: { id: orderId } });
            const receiver = await this.prisma.shopWallet.findFirst({ where: { SID: order.SID } });
            let sender_batch_id = Math.random().toString(36).substring(9);
            let create_payout_json = {
                sender_batch_header: {
                    recipient_type: 'EMAIL',
                    email_message: 'SDK payouts test txn',
                    note: 'Enjoy your Payout!!',
                    sender_batch_id: sender_batch_id,
                    email_subject: 'This is a test transaction from SDK',
                },
                items: [
                    {
                        note: 'Your reveived for order',
                        amount: {
                            currency: 'USD',
                            value: (order.total *
                                (1 - Number(this.config.get('FEE'))) *
                                Number(this.config.get('VND_USD'))).toFixed(2),
                        },
                        receiver: receiver.paypalMethod,
                    },
                ],
            };
            paypal.payout.create(create_payout_json, function (error, payout) {
                if (error) {
                    console.log(error.response);
                    throw error;
                }
                else {
                    console.log('Create Payout Response');
                }
            });
            await this.prisma.order.update({
                where: { id: order.id },
                data: { payVendor: true }
            });
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async VNPayCheckoutUrl() {
        let date = new Date();
        let tmnCode = '891L1NN1';
        let secretKey = 'DYCWCOMEWPNAOXLIXYELMZVJCYAXYWJT';
        let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
        let returnUrl = 'http://localhost:8000/api/payment/return';
        let createDate = (0, date_fns_1.format)(date, 'yyyyMMddHHmmss');
        let orderId = date.getTime();
        let amount = 50000;
        let bankCode = 'VNBANK';
        let locale = 'vn';
        if (locale === null || locale === '') {
            locale = 'vn';
        }
        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = '118.70.192.52';
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }
        vnp_Params = this.sortObject(vnp_Params);
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac('sha512', secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
        return vnpUrl;
    }
    sortObject(obj) {
        let sorted = {};
        let str = [];
        let key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
        }
        return sorted;
    }
    VNPayReturn(req) {
        let vnp_Params = req.query;
        let secureHash = vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];
        vnp_Params = this.sortObject(vnp_Params);
        let secretKey = 'DYCWCOMEWPNAOXLIXYELMZVJCYAXYWJT';
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac('sha512', secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
        if (secureHash === signed) {
            return { code: vnp_Params['vnp_ResponseCode'] };
        }
        else {
            return { code: 97 };
        }
    }
};
PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, prisma_service_1.PrismaService])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map