const https = require('https')
module.exports = {


    friendlyName: 'Approve payment for Pi Network',
  
  
    description: 'Approve payment for Pi Network',
  
  
    inputs: {
        user: {
            type: 'string',
            description: 'txn ID'
        },

        payment_id: {
            type: 'string',
            description: 'txn ID'
        },

        amount: {
            type: 'number',
            description: 'amount of transfer'
        }
    },


    exits: {},
  
  
    fn: async function (inputs) {
        const API_TOKEN = process.env.PI_API;
        console.log(inputs);
        const data = new TextEncoder().encode(
            JSON.stringify({})
        );        
        const options = {
            hostname: 'api.minepi.com',
            port: 443,
            path: '/v2/payments/' + inputs.payment_id + '/approve',
            method: 'POST',
            headers: {
                'Authorization': 'Key ' + API_TOKEN,
            }
        };

        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
          
            res.on('data', d => {
              process.stdout.write(d)
            })
          });
        
        req.on('error', error => {
            console.error(error)
        })
        
        req.write(data)
        req.end()
  
    }
  
  
  };
  