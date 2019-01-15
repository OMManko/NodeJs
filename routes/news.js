var express = require('express');
var router = express.Router();

module.exports = function(Collection) {

    // read many
    router.get('/news', function(req, res) {
        Collection.find(function(err, result) {
            if (err)
                res.send({'error':'An error has occurred'});

            res.send(result);
        });
    });


    // read one
    router.get('/news/:_id', function(req, res) {
        Collection.findById(req.params, function(err, result) {
            if (err)
                res.send({'error':'An error has occurred'});

            res.send(result);
        });
    });


    // create
    router.post('/news', function(req, res) {
        var newEntry = req.body;
        Collection.create(newEntry, function(err, newEntry) {
            if (err)
                res.send({'error':'An error has occurred'});

            res.send(newEntry);
        });
    });


    // update
    router.put('/news/:_id', function(req, res) {
        var changedEntry = req.body;
        Collection.updateOne({ _id: req.params._id }, { $set: changedEntry }, function(err) {
            if (err)
                res.send({'error':'An error has occurred'});

            res.send(changedEntry);
        });
    });


    // remove
    router.delete('/news/:_id', function(req, res) {
        var id = req.params._id;
        Collection.deleteOne({ _id: id }, function(err) {
            if (err)
                res.send({'error':'An error has occurred'});

            res.send('Note ' +  id + ' is deleted!');
        });
    });

    return router;

};
