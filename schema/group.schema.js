var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var GroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    members: [
        ObjectId
    ],
});

module.exports = mongoose.model('Group', GroupSchema);