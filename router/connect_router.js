var express = require('express');
var connectConfig = require('../model/connection_config');

var getResObject = require('../model/res_map').getResponseObj;
var resObjKey = require('../model/res_obj_key');
var map = new Map();
var router = express.Router();
const spawn = require('child_process').spawn;


//middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time:', Date.now)
    console.log("Handling connection request");
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
})

//Router to handle connect request
router.get('/connect', function (req, res) {
    var connectFlag = true;
    var connecConfigObj = new connectConfig(req.query['hostAddress'], req.query['portNumber'], req.query['userName'], req.query['udsName'], req.query['executiveName']);
    var connectConfigJSON = JSON.stringify(connecConfigObj);
    var giiDemoExeString = "C:\\GSES\\SimExec\\Users\\setenv.cmd && C:\\GSES\\SimExec\\mbin\\ia32\\giidemo.exe " + connecConfigObj.hostAddress + " " + connecConfigObj.portNumber + " " + connecConfigObj.userName + " " + connecConfigObj.udsName + " " + connecConfigObj.executiveName  
    var bat = spawn("C:\\Windows\\System32\\cmd.exe", ['/c', giiDemoExeString]);
    console.log('configObj: ' + connecConfigObj);
    map.set(connectConfigJSON, bat);
    map.get(connectConfigJSON).stdout.on('data', (data) => {
        console.log(data.toString());
        var resMsg = { responseMessage: "Connect Succeeded!!!" }
       
        if (data.toString().includes('Connect succeeded') && connectFlag) {
            resMsg.responseMessage = "Connect Succeeded!!!";
            sendResponse(resMsg, res);
        } else if (data.toString().includes('Connect failed') && connectFlag) {
            resMsg.responseMessage = "Connect Failed!!!";
            sendResponse(resMsg, res);
            disconnect(connectConfigJSON);
        } else if (data.toString().includes('giiExecRun returned 0')) {
            resMsg.responseMessage = "Run Command Successful!!!";
            var resObj = getResponseObj(connectConfigJSON, "run");
            sendResponse(resMsg, resObj);
        } else if (data.toString().includes('giiExecRun returned -1')){
            resMsg.responseMessage = "Run Command Failed!!!";
            var resObj = getResponseObj(connectConfigJSON, "run");
            sendResponse(resMsg, resObj);
        } else if (data.toString().includes('giiExecFreeze returned 0')) {
            resMsg.responseMessage = "Freeze Command Successful!!!";
            var resObj = getResponseObj(connectConfigJSON, "freeze");
            sendResponse(resMsg, resObj);
        } else if (data.toString().includes('giiExecFreeze returned -1')) {
            resMsg.responseMessage = "Freeze Command Failed!!!";
            var resObj = getResponseObj(connectConfigJSON, "freeze");
            sendResponse(resMsg, resObj);
        } else if (data.toString().includes('giiExecHold returned 0')) {
            resMsg.responseMessage = "Hold Command Successful!!!";
            var resObj = getResponseObj(connectConfigJSON, "hold");
            sendResponse(resMsg, resObj);
        } else if (data.toString().includes('giiExecHold returned -1')) {
            resMsg.responseMessage = "Hold Command Failed!!!";
            var resObj = getResponseObj(connectConfigJSON, "hold");
            sendResponse(resMsg, resObj);
        } else if (data.toString().includes('giiExecRate returned 0')) {
            resMsg.responseMessage = "Rate Command Successful!!!";
            var resObj = getResponseObj(connectConfigJSON, "rate");
            sendResponse(resMsg, resObj);
        } else if (data.toString().includes('giiExecRate returned -1')) {
            resMsg.responseMessage = "Rate Command Failed!!!";
            var resObj = getResponseObj(connectConfigJSON, "rate");
            sendResponse(resMsg, resObj);
        } else if (data.toString().includes('giiExecSnap returned 0')) {
            resMsg.responseMessage = "Snap Command Successful!!!";
            var resObj = getResponseObj(connectConfigJSON, "snap");
            sendResponse(resMsg, resObj);
        } else if (data.toString().includes('giiExecSnap returned -1')) {
            resMsg.responseMessage = "Snap Command Failed!!!";
            var resObj = getResponseObj(connectConfigJSON, "snap");
            sendResponse(resMsg, resObj);
        } else if (data.toString().includes('giiExecReset returned 0')) {
            resMsg.responseMessage = "Reset Command Successful!!!";
            var resObj = getResponseObj(connectConfigJSON, "reset");
            sendResponse(resMsg, resObj);
        } else if (data.toString().includes('giiExecReset returned -1')) {
            resMsg.responseMessage = "Reset Command Failed!!!";
            var resObj = getResponseObj(connectConfigJSON, "reset");
            sendResponse(resMsg, resObj);
        } else if (data.toString().includes('giiExecReset returned 0')) {
            resMsg.responseMessage = "GetDbmMap Command Successful!!!";
            var resObj = getResponseObj(connectConfigJSON, "GetDbmMap");
            sendResponse(resMsg, resObj);
        } else if (data.toString().includes('giiExecReset returned -1')) {
            resMsg.responseMessage = "GetDbmMap Command Failed!!!";
            var resObj = getResponseObj(connectConfigJSON, "GetDbmMap");
            sendResponse(resMsg, resObj);
        }
        
    });

    map.get(connectConfigJSON).stderr.on('data', (data) => {
        console.log(data.toString());
    });

    map.get(connectConfigJSON).on('exit', (code) => {
        console.log(`Child exited with code ${code}`);
    });
})

// To disconnect the executive
function disconnect(connectConfigJSON) {
    if (map.get(connectConfigJSON) != null) {
        map.get(connectConfigJSON).stdin.write("\n");
        console.log('Disconnected Successfully');
        map.delete(connectConfigJSON);
    }
}

//Router to handle Executive Spawn connect
router.get('/spawn', function (req, res) {
    res.send('Executive Spawned')
})

var getConfigBat = function (config) {
    return map.get(config);
}

function sendResponse(data, res) {
    var jsonData = JSON.stringify(data);
    res.send(jsonData);

}

function getResponseObj(connectConfigJSON, command) {
    var resKey = new resObjKey(connectConfigJSON, command);
    var resKeyJSON = JSON.stringify(resKey);
    return getResObject(resKeyJSON);
}



module.exports = { router, getConfigBat}