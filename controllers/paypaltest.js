var env = require("dotenv").config()
var http = require('http'),
    paypal = require('paypal-rest-sdk'),
    uuid = require('node-uuid'),
    bodyParser = require('body-parser'),
    app = require('express')();

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.ClientID
    'client_secret': process.env.Secret
});

app.get('/create', function(req, res) {
    //build PayPal payment request
    var payReq = {
        'intent': 'sale',
        'redirect_urls': {
            'return_url': 'http://localhost:3000/process',
            'cancel_url': 'http://localhost:3000/cancel'
        },
        'payer': {
            'payment_method': 'paypal'
        },
        'transactions': [{
            'amount': {
                'total': '7.47',
                'currency': 'USD'
            },
            'description': 'This is the payment transaction description.'
        }]
    };
    paypal.payment.create(payReq, function(error, payment) {
        if (error) {
            console.error(error);
        } else {
            //capture HATEOAS links
            var links = {};
            payment.links.forEach(function(linkObj) {
                links[linkObj.rel] = {
                    'href': linkObj.href,
                    'method': linkObj.method
                };
            })

            //if redirect url present, redirect user
            if (links.hasOwnProperty('approval_url')) {
                res.redirect(links['approval_url'].href);
            } else {
                console.error('no redirect URI present');
            }
        }
    });
});

app.get('/process', function(req, res){
    var paymentId = req.query.paymentId;
    var payerId = { 'payer_id': req.query.PayerID };

    paypal.payment.execute(paymentId, payerId, function(error, payment){
        if(error){
            console.error(error);
        } else {
            if (payment.state === 'approved'){
                res.send('payment completed successfully');
            } else {
                res.send('payment not successful');
            }
        }
    });
});


