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
    var resKey = new resObjKey(handleRequest(req), "run");
    saveMap(resKey, res);                   //save the response object
    console.log('In status update run: ' + getConfigBat(handleRequest(req)));
    if (getConfigBat(handleRequest(req)) != null) {
        getConfigBat(handleRequest(req)).stdin.write("Run\n");
    } else {
        resMsg.responseMessage = 'Not Connected, Run Exection Failed. Reconnect and Try again!!!';
        sendResponse(resMsg, res);
    }
})


//to execute Freeze command
router.get('/freeze', function (req, res) {
    var resKey = new resObjKey(handleRequest(req), "freeze");
    saveMap(resKey, res);               //save the response object
    console.log('In status update freeze: ' + getConfigBat(handleRequest(req)));
    if (getConfigBat(handleRequest(req)) != null) {
        getConfigBat(handleRequest(req)).stdin.write("Freeze\n");
    } else {
        resMsg.responseMessage = 'Not Connected, Freeze Exection Failed. Reconnect and Try again!!!';
        sendResponse(resMsg, res);
    }
})


//To execute Hold command
router.get('/hold', function (req, res) {
    var resKey = new resObjKey(handleRequest(req), "hold");
    saveMap(resKey, res);               //save the response object
    console.log('In status update hold: ' + getConfigBat(handleRequest(req)));
    if (getConfigBat(handleRequest(req)) != null) {
        getConfigBat(handleRequest(req)).stdin.write("Hold\n");
    } else {
        resMsg.responseMessage = 'Not Connected, Hold Exection Failed. Reconnect and Try again!!!';
        sendResponse(resMsg, res);
    }
})

//To execute Rate Command.. Parameters expected <int> along with connection details
router.get('/rate', function (req, res) {
    var int = req.query['int'];
    var command = "Hold " + int + "\n";
    var resKey = new resObjKey(handleRequest(req), "rate");
    saveMap(resKey, res);               //save the response object
    console.log('In status update rate: ' + getConfigBat(handleRequest(req)));
    if (getConfigBat(handleRequest(req)) != null) {
        getConfigBat(handleRequest(req)).stdin.write(command);
    } else {
        resMsg.responseMessage = 'Not Connected, Rate Exection Failed. Reconnect and Try again!!!';
        sendResponse(resMsg, res);
    }
})

//To execute Snap Command.. Parameters expected <icname> along with connection details
router.get('/snap', function (req, res) {
    var icname = req.query['icname'];
    var command = "Snap " + icname + "\n";
    var resKey = new resObjKey(handleRequest(req), "snap");
    saveMap(resKey, res);               //save the response object
    console.log('In status update snap: ' + getConfigBat(handleRequest(req)));
    if (getConfigBat(handleRequest(req)) != null) {
        getConfigBat(handleRequest(req)).stdin.write(command);
    } else {
        resMsg.responseMessage = 'Not Connected, Snap Exection Failed. Reconnect and Try again!!!';
        sendResponse(resMsg, res);
    }
})

//To execute Reset Command.. Parameters expected <icname> along with connection details
router.get('/reset', function (req, res) {
    var icname = req.query['icname'];
    var command = "Reset " + icname + "\n";
    var resKey = new resObjKey(handleRequest(req), "reset");
    saveMap(resKey, res);               //save the response object
    console.log('In status update reset: ' + getConfigBat(handleRequest(req)));
    if (getConfigBat(handleRequest(req)) != null) {
        getConfigBat(handleRequest(req)).stdin.write(command);
    } else {
        resMsg.responseMessage = 'Not Connected, Reset Exection Failed. Reconnect and Try again!!!';
        sendResponse(resMsg, res);
    }
})

//To execute Reset Command.. Parameters expected <icname> along with connection details
router.get('/GetDbmMap', function (req, res) {
    var symbol = req.query['symbol'];
    var level = req.query['level'];
    var command = "GetDbmMap " + icname + " " + level + "\n";
    var resKey = new resObjKey(handleRequest(req), "GetDbmMap");
    saveMap(resKey, res);               //save the response object
    console.log('In status update GetDbmMap: ' + getConfigBat(handleRequest(req)));
    if (getConfigBat(handleRequest(req)) != null) {
        getConfigBat(handleRequest(req)).stdin.write(command);
    } else {
        resMsg.responseMessage = 'Not Connected, GetDbmMap Exection Failed. Reconnect and Try again!!!';
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