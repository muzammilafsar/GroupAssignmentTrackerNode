var express = require('express');
var router = express.Router();
var Group = require('../schema/group.schema');
var mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
/* GET users listing. */
router.get('/:id', function (req, res, next) {
    Group.aggregate([
        {
            "$match": { _id: ObjectId(req.params.id) }
        },
        { "$unwind": "$members" },
        {
            "$lookup": {
                from: "users",
                "localField": "members",
                "foreignField": "_id",
                "as": "members"
            },
        },
        { "$unwind": "$members" },
        {
            "$group": {
                "_id": "$_id",
                "members": { "$push": "$members" }
            }
        }
    ]).then(val => {
        res.send(val);
    }).catch(err => res.status(500).send(err))
});
router.post('/add', function (req, res, next) {
    console.log(req.body)
    // res.send('val');
    Group.create(req.body, function (err, val) {
        // if (err) return handleError(err);
        res.send(val)
        // saved!
    });
});
module.exports = router;
