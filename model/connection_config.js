function connectConfig(hostAddress, portNumber, userName, udsName, executiveName){
    this.hostAddress = hostAddress
    this.portNumber = portNumber
    this.userName = userName
    this.udsName = udsName
    this.executiveName = executiveName
}

module.exports = connectConfig;