var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var groupRouter = require('./routes/groups');
var assignmentRouter = require('./routes/assignment');

var app = express();
var Group = require('./schema/group.schema');
var Assignment = require('./schema/assignment.schema');
var User = require('./schema/user.schema'); 
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@cluster0-shard-00-00-x6fti.mongodb.net:27017,cluster0-shard-00-01-x6fti.mongodb.net:27017,cluster0-shard-00-02-x6fti.mongodb.net:27017/weeklyquran?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected to db")
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit:10241024102420,type:'application/json'}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/groups', groupRouter);
app.use('/assignment', assignmentRouter);

module.exports = app;
