var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AssignmentSchema = new Schema({
    startDate: Schema.Types.Date,
    endDate: Schema.Types.Date,
    group: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    details: [
        {
            member: Schema.Types.ObjectId,
            assignment: String,
            completed: Boolean
        }
    ]
});
module.exports = mongoose.model('Assignment',AssignmentSchema);
