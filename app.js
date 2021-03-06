// !!!!! TODO !!!!!!
// fix consistency in variable declarations (var, let, const)
// TODO: fix routers code quality


var express = require('express');
var low = require('lowdb');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));

var db = low(__dirname + '/data/objects.json');
db._.mixin(require('underscore-db'));

app.use(express.static(__dirname + '/public'));
app.use('/libs', express.static(__dirname + '/node_modules'));
app.use(bodyParser.json());


// Routers
var hotelsRouter = require(__dirname + '/routers/hotelsRouter')(db);
app.use('/api/hotels', hotelsRouter);

var sightseeingRouter = require(__dirname + '/routers/sightseeingRouter')(db);
app.use('/api/sightseeing', sightseeingRouter);

var restaurantsRouter = require(__dirname + '/routers/restaurantsRouter')(db);
app.use('/api/restaurants', restaurantsRouter);

var objectsRouter = require(__dirname + '/routers/objectsRouter')(db);
app.use('/api/all', objectsRouter);

var usersRouter = require(__dirname + '/routers/usersRouter')(db);
app.use('/api/users', usersRouter);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


