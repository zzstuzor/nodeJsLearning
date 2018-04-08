const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('Unable to append to server .log');
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

// NOTE: must be after the maintenance redirect - these are set up in order
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

// routes
app.get('/', (req, res) => {
    // e.g.
    // res.send('<h1>hello express!</h1>');

    // e.g.
    // res.send({
    //     name: 'stuzor',
    //     likes: [
    //         'stuff',
    //         'things',
    //     ],
    // });

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        message: 'This is the home page. Cool eh?',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error fetching page'
    });
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
