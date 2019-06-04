const request = require('request');

const forecast = (lat, long, callback) => {

    const url = 'https://api.darksky.net/forecast/7d46cc79dc1639f16ae90a04f510e96b/' + lat + ',' + long;

    request( {url: url, json: true}, (err, res) => {
        if(err) {
            callback("You cannot connect to the weather app", undefined);
        } else if(res.body.error){
            callback("Unable to locate", undefined);
        } else {
            callback(undefined, `${res.body.currently.temperature}`);
        }
    });
}

module.exports = forecast