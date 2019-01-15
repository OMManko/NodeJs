var mongoose = require('mongoose');

// database config
var Schema = mongoose.Schema;
mongoose.connect('mongodb://volha.manko:htl123htl@ds211504.mlab.com:11504/newsdb?authSource=newsdb&w=1', {useNewUrlParser: true});

// schemas

var newsSchema = new Schema({
        content: String,
        created: { type: Date, default: Date.now }
    },
    { strict: false }
);

var models = {};
models.News = mongoose.model('news', newsSchema);

module.exports = models;
