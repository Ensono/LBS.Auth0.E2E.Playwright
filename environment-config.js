const fs = require('fs')
require('dotenv').config()
const config = {
    domain: process.env.DOMAIN,
    clientId: process.env.CLIENTID,
    audience: 'https://api.london.edu/'
}

generateConfig()
function generateConfig() {
    const jsonConfig = JSON.stringify(config)
    fs.writeFile('auth_config.json', jsonConfig, function(err, result) {
        if(err) console.log('error', err);
      });
}
module.exports = {
    generateConfig
}