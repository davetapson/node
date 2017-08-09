const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

// helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

// home
app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello, welcome to my home page!'
    });
});

// about
app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

// bad
app.get('/bad', (request, response) => {
    response.send({
        errorNumber: 1,
        errorMessage: 'Unable to service request.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});