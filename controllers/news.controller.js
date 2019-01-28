var News = require('../models/news');

module.exports.readAllEntries = function(req, res) {
    News.find(function(err, result) {
        if (err)
            res.send({'error':'An error has occurred'});

        res.send(result);
    });
};

module.exports.readOneEntry = function(req, res) {
    News.findById(req.params, function(err, result) {
        if (err)
            res.send({'error':'An error has occurred'});

        res.send(result);
    });
}

module.exports.createEntry = function(req, res) {
    var newEntry = req.body;
    News.create(newEntry, function(err, newEntry) {
        if (err)
            res.send({'error':'An error has occurred'});

        res.send(newEntry);
    });
}

module.exports.updateEntry = function(req, res) {
    var changedEntry = req.body;
    var token = getToken(req.headers);
    if (token) {
        News.updateOne({ _id: req.params._id }, { $set: changedEntry }, function(err) {
            if (err)
                res.send({'error':'An error has occurred'});

            res.send(changedEntry);
        });
    }
    else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }

}

module.exports.deleteEntry = function(req, res) {
    var id = req.params._id;
    var token = getToken(req.headers);
    if (token) {
        News.deleteOne({ _id: id }, function(err) {
            if (err)
                res.send({'error':'An error has occurred'});

            res.send('Note ' +  id + ' is deleted!');
        });
    }
    else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }

}