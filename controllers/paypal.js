var env = require("dotenv").config();
var request = require('request');
var payPalEndPoint = "https://api.sandbox.paypal.com"
var options = {
  url: payPalEndPoint,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.accessToken}`
  },
  body: {
    "intent":"sale",
    "payer":{
      "payment_method":"credit_card",
      "funding_instruments":[
        {
          "credit_card":{
            "number":"4012888888881881",
            "type":"visa",
            "expire_month":11,
            "expire_year":2018,
            "cvv2":"874",
            "first_name":"Betsy",
            "last_name":"Buyer",
            "billing_address":{
              "line1":"111 First Street",
              "city":"Saratoga",
              "state":"CA",
              "postal_code":"95070",
              "country_code":"US"
            }
          }
        }
      ]
    },
    "transactions":[
      {
        "amount":{
          "total":"7.47",
          "currency":"USD",
          "details":{
            "subtotal":"7.41",
            "tax":"0.03",
            "shipping":"0.03"
          }
        },
      "description":"This is the payment transaction description."
      }
    ]
  },
  json: true
};

console.log('sending request')
request(options, function (error, response, body) {
  console.log('receiving request')
    console.log(response);
  if(error) console.log(error);
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
})


