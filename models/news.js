var mongoose = require('mongoose');

var NewsSchema = mongoose.Schema({
    content: String,
    created: { type: Date, default: Date.now }
    },
    { strict: false }
);

module.exports = mongoose.model('News', NewsSchema);