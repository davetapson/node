const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = weather('./weather/weather.js');

const argv = yargs
    .options(
    {
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    }
    )
    .help()
    .alias('help', 'h')
    .argv;

// geocode.getCoordinates(argv.address, (errorMessage, results) => {
//     if(errorMessage){
//         console.log(errorMessage);
//     } else{
//         console.log(JSON.stringify(results, undefined, 2));
//     }
// });

//57a96f1ab913bd10ead8859e18323f27
//https://api.darksky.net/forecast/57a96f1ab913bd10ead8859e18323f27/37.8267,-122.4233
//https://api.darksky.net/forecast/57a96f1ab913bd10ead8859e18323f27/-26.1510854,28.3695699
weather.getWether();