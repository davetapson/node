const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var googleServerURI = `https://maps.googleapis.com/maps/api/geocode/json`;
        var queryString = `address=${encodeURI(address)}`;
        var fullURI = `${googleServerURI}?${queryString}`;

        request({
            url: fullURI,
            json: true
        }, (error, response, body) => {
            //console.log(body.status);
            if (error) {
                reject('Unable to connect to Google servers.');
            } else if (body.status === 'ZERO_RESULTS' ||
                       body.status === 'INVALID_REQUEST') {
                reject('Unable to find that address.');
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    })
};

geocodeAddress('Benoni').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log('Error: ', errorMessage);
});