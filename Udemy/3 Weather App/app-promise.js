const yargs = require('yargs');
const axios = require('axios');
const fs = require('fs');
const argv = yargs
    .options(
    {
        a: {
            demand: false,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        },
        // default location argument
        d: {
            demand: false,
            alias: "default",
            describe: "Default location to fetch weather for",
        }
    }
    )
    .help()
    .alias('help', 'h')
    .argv;

var locationAddress = argv.a;

if (argv.d) {
    fs.writeFileSync("default-location.txt", argv.d);
};

if (fs.exists('default-location.txt') && locationAddress === undefined) {
    console.log('in');
    locationAddress = fs.readFileSync('default-location.txt');
}
console.log(locationAddress);
var googleServerURI = `https://maps.googleapis.com/maps/api/geocode/json`;
var queryString = `address=${encodeURI(locationAddress)}`;

var geocodelURL = `${googleServerURI}?${queryString}`;

axios.get(geocodelURL).then((response) => {
    if (locationAddress === undefined) {
        throw new Error('No address has been passed in, and no default address exists.');
    }
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error(`Unable to find address: ${locationAddress}.`);
    }

    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    weatherURL = `https://api.darksky.net/forecast/57a96f1ab913bd10ead8859e18323f27/${latitude},${longitude}?units=si`,

        console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}\u2103.  It feels like ${apparentTemperature}\u2103.`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.')
    } else {
        console.log(e.message);
    }
});

// api code
//57a96f1ab913bd10ead8859e18323f27
//https://api.darksky.net/forecast/57a96f1ab913bd10ead8859e18323f27/-26.1510854,28.3695699