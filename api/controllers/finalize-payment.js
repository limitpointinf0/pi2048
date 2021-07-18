const https = require('https')
module.exports = {


    friendlyName: 'Finalize payment for Pi Network',
  
  
    description: 'Finalize payment for Pi Network',
  
  
    inputs: {

        payment_id: {
            type: 'string',
            description: 'payment ID'
        },

        transaction_id: {
            type: 'number',
            description: 'txn ID'
        },
        
    },


    exits: {},
  
  
    fn: async function (inputs) {
        const API_TOKEN = '[API_TOKEN]'
        console.log(inputs);
        const data = new TextEncoder().encode(
            JSON.stringify({})
        );        
        const options = {
            hostname: 'api.minepi.com',
            port: 443,
            path: '/v2/payments/' + inputs.payment_id + '/complete',
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
  