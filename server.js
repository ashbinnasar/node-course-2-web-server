const express = require('express')
const hbs = require('hbs')
const app = express()
const fs = require('fs')
const port = process.env.PORT || 3000

app.use(express.static(`${__dirname}/public`))
app.set('view engine', 'hbs')
hbs.registerPartials(`${__dirname}/views/partials`)
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('toUpperCase', (text) => {
    return text.toUpperCase();
})

app.use((req, res, next) => {
    var now = new Date().toString();
    var logs = `${now} - ${req.method} - ${req.path}`
    fs.appendFile('server.log', logs + '\n', (err) => {
        if (err)
            console.log(err)
    })
    next();
})
// app.use((req, res, next) => {
//     res.render('maintanence.hbs', {
//         title: 'Maintanence'
//     })
// })
app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'Home',
        welcomeMessage: 'Welcome to my website'
    });
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About Page'
    })
})

app.listen(port, () => {
    console.log('app is running')
})