// const yargs = require('yargs');

// const geocode = require('./geocode/geocode.js');

// const argv = yargs
//     .options(
//     {
//         a: {
//             demand: true,
//             alias: 'address',
//             describe: 'Address to fetch weather for',
//             string: true
//         }
//     }
//     )
//     .help()
//     .alias('help', 'h')
//     .argv;

// geocode.getCoordinates(argv.address, (errorMessage, results) => {
//     if(errorMessage){
//         console.log(errorMessage);
//     } else{
//         console.log(JSON.stringify(results, undefined, 2));
//     }
// });

//57a96f1ab913bd10ead8859e18323f27
//https://api.darksky.net/forecast/57a96f1ab913bd10ead8859e18323f27/37.8267,-122.4233

const request = require('request');

request({
    url: 'https://api.darksky.net/forecast/57a96f1ab913bd10ead8859e18323f27/37.8267,-122.4233',
    json: true
}, (error, response, body) => {
    if (error) {
        console.log('Unable to connect to Forecast.io servers.');
    } 
    else if(response.statusCode === 200) {
        console.log(JSON.stringify(body.currently.temperature, undefined, 2));
    } else {
        console.log('Unable to fetch weather.')
    }
});

//https://api.darksky.net/forecast/57a96f1ab913bd10ead8859e18323f27/-26.1510854,28.3695699