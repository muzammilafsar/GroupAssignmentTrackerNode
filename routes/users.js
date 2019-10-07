var express = require('express');
var router = express.Router();
var User = require('../schema/user.schema');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}).then(val => {
    res.send(val);
  }).catch(err => res.status(500).send(err) )
});
router.post('/add', function(req, res, next) {
  console.log(req.body)
  // res.send('val');
  User.create(req.body, function (err, val) {
    // if (err) return handleError(err);
    res.send(val)
    // saved!
  });
});
module.exports = router;
