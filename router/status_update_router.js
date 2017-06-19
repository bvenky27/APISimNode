var express = require('express');
var getConfigBat = require('./connect_router').getConfigBat;
var saveMap = require('../model/res_map').saveMap;
var connectConfig = require('../model/connection_config');
var resObjKey = require('../model/res_obj_key');
var router = express.Router();

var resMsg = { responseMessage: "" };


router.use(function timeLog(req, res, next) {
    console.log('Time:', Date.now)
    console.log("Handling statusUpdate request")
    next()
})
//To execute the Run Command
router.get('/run', function (req, res) {
    var connecConfigObj = new connectConfig(req.query['hostAddress'], req.query['portNumber'], req.query['userName'], req.query['udsName'], req.query['executiveName']);
    var connectConfigJSON = JSON.stringify(connecConfigObj);
    var resKey = new resObjKey(connectConfigJSON, "run");
    //save the response object
    saveMap(resKey, res);
    console.log('In status update router: ' + getConfigBat(connectConfigJSON));
    if (getConfigBat(connectConfigJSON) != null) {
        getConfigBat(connectConfigJSON).stdin.write("Run\n");
    } else {
        resMsg.responseMessage = 'Not Connected, Run Exection Failed. Reconnect and Try again!!!';
        sendResponse(resMsg, res);
    }
})
//to exxecute Freeze command
router.get('/freeze', function (req, res) {
    var connecConfigObj = new connectConfig(req.query['hostAddress'], req.query['portNumber'], req.query['userName'], req.query['udsName'], req.query['executiveName']);
    var connectConfigJSON = JSON.stringify(connecConfigObj);
    console.log('In status update freeze: ' + getConfigBat(connectConfigJSON));
    if (getConfigBat(connectConfigJSON) != null) {
        getConfigBat(connectConfigJSON).stdin.write("Freeze\n");
    } else {
        resMsg.responseMessage = 'Not Connected, Freeze Exection Failed. Reconnect and Try again!!!';
        sendResponse(resMsg, res);
    }
})
//To execute Hold command
router.get('/hold', function (req, res) {
    var connecConfigObj = new connectConfig(req.query['hostAddress'], req.query['portNumber'], req.query['userName'], req.query['udsName'], req.query['executiveName']);
    var connectConfigJSON = JSON.stringify(connecConfigObj);
    console.log('In status update freeze: ' + getConfigBat(connectConfigJSON));
    if (getConfigBat(connectConfigJSON) != null) {
        getConfigBat(connectConfigJSON).stdin.write("Freeze\n");
    } else {
        resMsg.responseMessage = 'Not Connected, Freeze Exection Failed. Reconnect and Try again!!!';
        sendResponse(resMsg, res);
    }
})

function sendResponse(data, res) {
    var jsonData = JSON.stringify(data);
    res.send(jsonData);

}

function handleRequest(req) {
    var connecConfigObj = new connectConfig(req.query['hostAddress'], req.query['portNumber'], req.query['userName'], req.query['udsName'], req.query['executiveName']);
    return JSON.stringify(connecConfigObj);
}

module.exports = router;