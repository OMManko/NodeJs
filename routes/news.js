var express = require('express');
var router = express.Router();
var news_controller = require('../controllers/news.controller');
var passport = require('passport');


module.exports = function() {

    // read many
    router.get('/news', news_controller.readAllEntries);

    // read one
    router.get('/news/:_id', news_controller.readOneEntry);

    // create
    router.post('/news', news_controller.createEntry);

    // update
    router.put('/news/:_id',  passport.authenticate('jwt', { session: false}), news_controller.updateEntry);

    // remove
    router.delete('/news/:_id',  passport.authenticate('jwt', { session: false}), news_controller.deleteEntry);

    return router;
};


