const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather')

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

geocode.getCoordinates(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        
        console.log(`Weather for: ${results.address}`);

        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {

            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`The temperature is ${weatherResults.temperature} deg C although it feels ${weatherResults.realfeel} deg C.`);
            }
        });
    }
});

// api code
//57a96f1ab913bd10ead8859e18323f27






//https://api.darksky.net/forecast/57a96f1ab913bd10ead8859e18323f27/-26.1510854,28.3695699