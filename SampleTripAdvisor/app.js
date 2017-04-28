// !!!!! TODO !!!!!!
// fix consistency in variable declarations (var, let, const)

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
app.use('/hotels', hotelsRouter);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
