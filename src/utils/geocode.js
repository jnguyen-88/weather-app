const request = require('request');

// the Geocode function
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoibmd1eWVuLWoiLCJhIjoiY2p3MzFwcDFrMDY1MTQ4cXNnOTQ1OTdrayJ9.Okh3rLS_xUzjYwVSw6yfJA&limit=1';
    
    request({url: url, json: true}, function(err, res){
        if(err){
            callback('Unable to Connect to services');
        } else if(res.body.features.length === 0){
            callback('Please try another Search');
        } else {
            callback(undefined, {
                latitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0],
                place_name: res.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode