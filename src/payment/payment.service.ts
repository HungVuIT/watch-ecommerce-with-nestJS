import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const paypal = require('paypal-rest-sdk');
// const payout = require('@paypal/payouts-sdk');
import { globalVariables } from 'src/shared/global.service';

@Injectable()
export class PaymentService {
  // private payoutClient: any;

  constructor(private config: ConfigService) {
    const clientId = this.config.get('PAYPAL_CLIENT_ID');
    const clientSecret = this.config.get('PAYPAL_CLIENT_SECRET');

    // cài môi trường cho paypal checkout
    paypal.configure({
      mode: 'sandbox', //sandbox or live
      client_id: clientId,
      client_secret: clientSecret,
    });

    // cài mồi trường cho paypal payout
    // let environment = new payout.core.SandboxEnvironment(
    //   clientId,
    //   clientSecret,
    // );

    // this.payoutClient = new payout.core.PayPalHttpClient(environment);
  }

  vndToUsd(vnd: number) {
    const result = vnd * Number(this.config.get('vND_USD'));
    return Math.round(result * 100) / 100;
  }

  async checkoutLink(
    userId: number,
    listItem: {
      name: string;
      quantity: number;
      price: number;
    }[],
  ) {
    try {
      const host = globalVariables.paymentHost[userId];
      const { total, itemValue, shipFee } = globalVariables.orderDetail[userId];
      const location = globalVariables.deliveryLocation[userId];

      const create_payment_json = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal',
        },
        redirect_urls: {
          return_url:  host + '/success',
          cancel_url: host + '/cancel',
        },
        transactions: [
          {
            item_list: {
              // items: listItem.map((item) => ({
              //   name: item.name,
              //   price: this.vndToUsd(item.price),
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
              total: this.vndToUsd(total).toFixed(2),
              details: {
                subtotal: this.vndToUsd(itemValue).toFixed(2),
                shipping: this.vndToUsd(shipFee).toFixed(2),
              },
            },

            shipping_method: 'United Postal Service',
            description: 'Pay with paypal',
          },
        ],
      };

      console.log( JSON.stringify(create_payment_json))
      //payment.create là một callback hàm checkout này sẽ trả về kq trức khi callback đc gọi
      //chuyển payment.create thành Promise paymentCreateAsync để đợi kết quà trược khi return

      function paymentCreateAsync() {
        return new Promise(function (resolve, reject) {
          paypal.payment.create(create_payment_json, function (error, payment) {
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
    } catch (error) {
      console.log(error.response.details[0]);
    }
  }

  async succcessCheckout(userId: number) {
    const payerId = globalVariables.other[userId].payerId;
    const paymentId = globalVariables.other[userId].paymentId;
    const { total, itemValue, shipFee } = globalVariables.orderDetail[userId];

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

    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        if (error) {
          console.log(error.response);
          throw error;
        } else {
          return;
        }
      },
    );
  }

  async payoutSeller(userId: number) {
    try {
      const items = globalVariables.cartList[userId];
      // let requestBody = {
      //   sender_batch_header: {
      //     recipient_type: 'EMAIL',
      //     email_message: 'SDK payouts test txn',
      //     note: 'Enjoy your Payout!!',
      //     sender_batch_id: 'Test_sdk_1',
      //     email_subject: 'This is a test transaction from SDK',
      //   },
      //   items: items.map((item) => ({
      //     note: 'Your reveived for + ' + item.quantiry + ' product ' + item.name,
      //     amount: {
      //       currency: 'USD',
      //       value: (
      //         item.price *
      //         item.quantity *
      //         this.config.get('FEE') *
      //         this.config.get('VND_USD')
      //       ).toFixed(2),
      //     },
      //     receiver: item.paypalMethod,
      //   })),
      //   // items: [
      //   //   {
      //   //     note: 'Your Payout!',
      //   //     amount: {
      //   //       currency: 'USD',
      //   //       value: '10.00',
      //   //     },
      //   //     receiver: 'sb-z0jrf20461080@business.example.com',
      //   //     sender_item_id: 'Test_txn_1',
      //   //   },
      //   //   {
      //   //     note: 'Your 1$ Payout!',
      //   //     amount: {
      //   //       currency: 'USD',
      //   //       value: '10.00',
      //   //     },
      //   //     receiver: 'sb-2xqqg20461078@business.example.com',
      //   //     sender_item_id: 'Test_txn_2',
      //   //   },
      //   // ],
      // };

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
          note:
            'Your reveived for + ' + item.quantiry + ' product ' + item.name,
          amount: {
            currency: 'USD',
            value: (
              item.price *
              item.quantity *
              (1 - Number(this.config.get('FEE'))) *
              Number(this.config.get('VND_USD'))
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

      // let request = new payout.payouts.PayoutsPostRequest();
      // request.requestBody(requestBody);

      // let createPayouts = async function () {
      //   let response = await this.payoutClient.execute(request);
      //   console.log('================================');
      //   console.log(`Response: ${JSON.stringify(response)}`);
      //   console.log('================================');
      //   // If call returns body in response, you can get the deserialized version from the result attribute of the response.
      //   console.log(
      //     `Payouts Create Response: ${JSON.stringify(response.result)}`,
      //   );
      // };
      // createPayouts();

      paypal.payout.create(create_payout_json, function (error, payout) {
        if (error) {
          console.log(error.response);
          throw error;
        } else {
          console.log('Create Payout Response');
          // console.log(payout);
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
