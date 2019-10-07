var express = require('express');
var router = express.Router();
var Assignment = require('../schema/assignment.schema');
var mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
/* GET users listing. */
router.get('/:id', function(req, res, next) {
    Assignment.aggregate([
        {
            "$match": { _id: ObjectId(req.params.id) }
        },
        { "$unwind": "$details" },
        {
            "$lookup": {
                "from": "users",
                "localField": "details.member",
                "foreignField": "_id",
                "as": "assignee"
            },
        },
        {
            "$lookup": {
                "from": "groups",
                "localField": "group",
                "foreignField": "_id",
                "as": "group"
            },
        },
        { "$unwind": "$assignee" },
        { "$unwind": "$group" },
        {
            $addFields: {
              details: { "member": "$assignee"}
            }
        },
        {
            $project: {
                "assignee": 0,
                "group.members": 0,
                "details.member.password": 0
            }
        },
        {
            "$group": {
                "_id": "$_id",
                "details": { "$push": "$details" }
            }
        }
    ]).then(val => {
    res.send(val);
  }).catch(err => res.status(500).send(err) )
});
router.post('/add', function(req, res, next) {
  console.log(req.body)
  // res.send('val');
  Assignment.create(req.body, function (err, val) {
    // if (err) return handleError(err);
    res.send(val)
    // saved!
  });
});
module.exports = router;
