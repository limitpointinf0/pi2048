const https = require('https');
const API_TOKEN = '[API_TOKEN]'
// console.log(inputs);
const data = new TextEncoder().encode(
    JSON.stringify({})
);        
const options = {
    hostname: 'api.minepi.com',
    port: 443,
    path: '/v2/payments/' + 'HU7lmE3hyvxd4Y7wi2N9D0w9yj0n' + '/complete',
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