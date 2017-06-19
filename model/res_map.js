var resMap = new Map();

function saveMap(resKey, res) {
    var resKeyJSON = JSON.stringify(resKey);
    resMap.set(resKeyJSON, res);
}

var getResponseObj = function (resObjKey) {
    return resMap.get(resObjKey);
}

module.exports = { saveMap, getResponseObj};