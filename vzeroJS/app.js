//START SERVER WITH > node app.js

var express = require('express')
var app = express()
var util = require('util'),
    braintree = require('braintree');

var server = app.listen(4000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('v.zero is LIVE at http://%s:%s', host, port)

})

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: 'insert merchant ID here',
  publicKey: 'insert publicKey here',
  privateKey: 'insert privateKey here'
});

// Using the .html extension instead of having to name the views as *.ejs
app.engine('.html', require('ejs').__express);
 
// Set the folder where the pages are kept
app.set('views', __dirname + '/views');
 
// This avoids having to provide the extension to res.render()
app.set('view engine', 'html');
 
// Serve index page


gateway.clientToken.generate({}, function (err, response) {
  app.locals.clientToken = response.clientToken
  console.log(response.clientToken)
});

app.get("/", function (req, res) {
  res.render('index', {
    pageTitle: 'V.ZER0 | NodeJS'
  });
});

app.post('/checkout', function(req, res) {
  console.log(req);
  var nonce = "fake-valid-nonce"
  app.locals.nonce = nonce

  gateway.transaction.sale({
      amount: '10.00',
      paymentMethodNonce: nonce,
    }, 

  function (err, result) {
    console.log("THIS IS THE ERROR AND RESULTS --------->>>>>         ");
    console.log(err);
    console.log(result);

  }),
  res.render('checkout');
});



app.get("/subscription", function (req, res) {
  res.render('subscription', {
    pageTitle: 'Subs - V.ZER0 | NodeJS'
  });
});


app.post('/subscription', function(req, res) {
  console.log(req);
  var nonce = "fake-valid-nonce";
  console.log(nonce);
  app.locals.nonce = nonce;
  app.locals.pageTitle = "FAIL";
  app.locals.errormsg = "FAIL";

  gateway.subscription.create({
      paymentMethodToken: "insert pmt here",
      planId: "insert plan id here",
      firstBillingDate: "enter a date"
    }, 

  function (err, result) {
    console.log(err);
    console.log(result);

    if (result.success == false) {
      app.locals.pageTitle = "Subscription Failed!";
      app.locals.errormsg = "Error";
    } else {
      app.locals.errormsg = "Success!";
      app.locals.pageTitle = "Subscription Created!";
    }

  }),
  res.render('subscription-post');
});


