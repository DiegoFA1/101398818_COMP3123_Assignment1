var express = require('express')
var routes = express.Router()












routes.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something Broke On Employee Routes');
});

module.exports = routes