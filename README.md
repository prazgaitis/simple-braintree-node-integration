# simple-braintree-node-integration
A barebones integration with Braintree with Express.js

## How to Run
* Clone the repo
* Add API keys in `app.js` file

```javascript
var gateway = braintree.connect({
 environment: braintree.Environment.Sandbox,
 merchantId: 'insert merchant ID here',
 publicKey: 'insert publicKey here',
 privateKey: 'insert privateKey here'
});
```

* Navigate to root directory and execute `node vzeroJS/app.js`
