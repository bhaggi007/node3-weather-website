const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/05f03e085148134ae2d0faf9bcc73944/${encodeURIComponent(longitude)},${encodeURIComponent(latitude)}`;
    request({ url, json: true }, (err, {body}) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined,`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is ${body.currently.precipProbability}% chance of rain.`);
        }
    })
}

module.exports = forecast;