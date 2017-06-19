const express = require('express')
const bodyParser = require('body-parser')

var connect = require('./router/connect_router').router
var statusUpdate = require('./router/status_update_router').router 

const app = express()
var expObject = null;

//const spawn = require('child_process').spawn;
//var bat = null;

app.use('/connection', connect);
app.use('/statusUpdate', statusUpdate);

app.get('/', function (req, res) {
    var name = req.query['name']
    console.log('request params: '+name)
    expObject = new exp(name);
    res.send('Welcome to APIs to the SimExec Simulator ' + expObject.name);
    console.log("Welcome to APIs to the SimExec Simulator");
});

app.get('/test', function (req, res) {

    res.send(expObject.expFun2());
    
})


function exp(name) {
    this.name = name
}


var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('App listening at http://%s:%s', host, port)
})