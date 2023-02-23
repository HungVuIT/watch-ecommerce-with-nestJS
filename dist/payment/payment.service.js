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
const vn_payments_1 = require("vn-payments");
const querystring = require("qs");
const crypto = require("crypto");
let PaymentService = class PaymentService {
    constructor(config) {
        this.config = config;
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
    async checkoutLink(userId, listItem) {
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
    async payoutSeller(userId) {
        try {
            const items = global_service_1.globalVariables.cartList[userId];
            let sender_batch_id = Math.random().toString(36).substring(9);
            let create_payout_json = {
                sender_batch_header: {
                    recipient_type: 'EMAIL',
                    email_message: 'SDK payouts test txn',
                    note: 'Enjoy your Payout!!',
                    sender_batch_id: sender_batch_id,
                    email_subject: 'This is a test transaction from SDK',
                },
                items: items.map((item) => ({
                    note: 'Your reveived for + ' + item.quantiry + ' product ' + item.name,
                    amount: {
                        currency: 'USD',
                        value: (item.price *
                            item.quantity *
                            (1 - Number(this.config.get('FEE'))) *
                            Number(this.config.get('VND_USD'))).toFixed(2),
                    },
                    receiver: item.paypalMethod,
                })),
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
        }
        catch (error) {
            throw error;
        }
    }
    async vnPay() {
        const vnpay = new vn_payments_1.VNPay({
            merchant: '891L1NN1',
            paymentGateway: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
            secureSecret: 'DYCWCOMEWPNAOXLIXYELMZVJCYAXYWJT',
        });
        let date = new Date();
        let signData = querystring.stringify('VNBANK', { encode: false });
        let hmac = crypto.createHmac("sha512", 'DYCWCOMEWPNAOXLIXYELMZVJCYAXYWJT');
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        let createDate = date.toDateString;
        let orderId = '122224';
        const checkoutData = {
            createdDate: '31180112172309',
            amount: 500000,
            clientIp: '127.0.0.1',
            locale: 'vn',
            currency: 'VND',
            orderId: orderId,
            orderInfo: 'Thanh toan cho ma GD:' + orderId,
            orderType: 'fashion',
            returnUrl: 'http://localhost:8000/payment/callback',
            transactionId: '985623145',
            customerId: 'thanhvt',
            bankCode: 'VNBANK',
            vnpSecretKey: signed
        };
        const checkout = await vnpay.buildCheckoutUrl(checkoutData);
        return checkout;
    }
};
PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map