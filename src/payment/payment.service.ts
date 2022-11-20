import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const checkout = require('paypal-rest-sdk');
const payout = require('@paypal/payouts-sdk');
import { globalVariables } from 'src/shared/global.service';

@Injectable()
export class PaymentService {
  private payoutClient: any;

  constructor(private config: ConfigService) {
    const clientId = this.config.get('PAYPAL_CLIENT_ID');
    const clientSecret = this.config.get('PAYPAL_CLIENT_SECRET');

    // cài môi trường cho paypal checkout
    checkout.configure({
      mode: 'sandbox', //sandbox or live
      client_id: clientId,
      client_secret: clientSecret,
    });

    // cài mồi trường cho paypal payout
    let environment = new payout.core.SandboxEnvironment(
      clientId,
      clientSecret,
    );

    this.payoutClient = new payout.core.PayPalHttpClient(environment);
  }

  async checkoutLink(
    userId: number,
    listItem: {
      name: string;
      quantity: number;
      price: number;
    }[],
  ) {
    const host = globalVariables.paymentHost[userId];
    const total = globalVariables.paymentTotal[userId];
    const location = globalVariables.diliveryLocation[userId];
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
            // items: listItem.map((item) => ({
            //   name: item.name,
            //   price: (item.price * Number(this.config.get('VND_USD'))).toFixed(2).toString(),
            //   quantity: item.quantity,
            //   currency: 'USD',
            // })),
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
            total: (total * Number(this.config.get('VND_USD')))
              .toFixed(2)
              .toString(),
          },

          shipping_method: 'United Postal Service',
          description: 'Pay with paypal',
        },
      ],
    };

    //payment.create là một callback hàm checkout này sẽ trả về kq trức khi callback đc gọi
    //chuyển payment.create thành Promise paymentCreateAsync để đợi kết quà trược khi return

    function paymentCreateAsync() {
      return new Promise(function (resolve, reject) {
        checkout.payment.create(create_payment_json, function (error, payment) {
          if (error) {
            reject(error);
          } else {
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

  async succcessCheckout(userId: number) {
    const payerId = globalVariables.other[userId].payerId;
    const paymentId = globalVariables.other[userId].paymentId;
    const total = globalVariables.paymentTotal[userId];

    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: 'USD',
            total: (total * this.config.get('VND_USD')).toFixed(2),
          },
        },
      ],
    };

    checkout.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        if (error) {
          console.log(error.response);
          throw error;
        } else {
          this.payoutSeller(userId);
        }
      },
    );
  }

  async payoutSeller(userId: number) {
    const items = globalVariables.cartList[userId];
    let requestBody = {
      sender_batch_header: {
        recipient_type: 'EMAIL',
        email_message: 'SDK payouts test txn',
        note: 'Enjoy your Payout!!',
        sender_batch_id: 'Test_sdk_1',
        email_subject: 'This is a test transaction from SDK',
      },
      items: items.map((item) => ({
        note: 'Your reveived for + ' + item.quantiry + ' product ' + item.name,
        amount: {
          currency: 'USD',
          value: (
            item.price *
            item.quantity *
            this.config.get('FEE') *
            this.config.get('VND_USD')
          ).toFixed(2),
        },
        receiver: item.paypalMethod,
      })),
      // items: [
      //   {
      //     note: 'Your Payout!',
      //     amount: {
      //       currency: 'USD',
      //       value: '10.00',
      //     },
      //     receiver: 'sb-z0jrf20461080@business.example.com',
      //     sender_item_id: 'Test_txn_1',
      //   },
      //   {
      //     note: 'Your 1$ Payout!',
      //     amount: {
      //       currency: 'USD',
      //       value: '10.00',
      //     },
      //     receiver: 'sb-2xqqg20461078@business.example.com',
      //     sender_item_id: 'Test_txn_2',
      //   },
      // ],
    };

    let request = new payout.payouts.PayoutsPostRequest();
    request.requestBody(requestBody);

    let createPayouts = async function () {
      let response = await this.payoutClient.execute(request);
      console.log('================================');
      console.log(`Response: ${JSON.stringify(response)}`);
      console.log('================================');
      // If call returns body in response, you can get the deserialized version from the result attribute of the response.
      console.log(
        `Payouts Create Response: ${JSON.stringify(response.result)}`,
      );
    };
    createPayouts();
  }
}
