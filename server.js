var express = require('express'),
    path = require('path'),
    http = require('http'),

    wine = require('./routes/wines');
    patient = require('./routes/patients');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });
});

app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);


app.get('/patients', patient.findAll);
app.get('/patients/:id', patient.findById);
app.post('/patients', patient.addPatient);
app.put('/patients/:id', patient.updatePatient);
app.delete('/patients/:id', patient.deletePatient);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
