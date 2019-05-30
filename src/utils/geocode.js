const request = require('request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYmhhZ2dpMDA3IiwiYSI6ImNqdnowNm55ZDBsYjY0NHA4Mnh3ZDJhc2gifQ.LlOuaK04FOoe3wSjRXOyYA&limit=1`;
    request({ url, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect to location service', undefined);
        } else if (res.body.features.length === 0) {
            callback('Unable to get location details. Please try with some other search query', undefined)
        } else {
            callback(undefined, {
                latitude: res.body.features[0].center[0],
                longitude: res.body.features[0].center[1],
                location: res.body.features[0].place_name
            })
        }
    });
}

module.exports = geoCode;