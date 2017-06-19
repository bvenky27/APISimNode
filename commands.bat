C:\GSES\SimExec\Users\setenv.cmd && C:\GSES\SimExec\mbin\ia32\giidemo.exe localhost 9000 fws load testexec && Run

http://localhost:3000/connection/connect/?hostAddress=localhost&portNumber=9000&userName=fws&udsName=load&executiveName=testexec
http://localhost:3000/statusUpdate/run/?hostAddress=localhost&portNumber=9000&userName=fws&udsName=load&executiveName=testexec

http://localhost:3000/connection/connect/?hostAddress=localhost&portNumber=9000&userName=load&udsName=load&executiveName=testexec


<div class =" container">
  <h1>Configure Connection</h1>
  <p>{{submitted}}</p>
  <form #connectForm="ngForm">
    
    <div class=" form-group">
      <label for=" hostAddress"> Host Address</label>
      <input type="text" class=" form-control" id=" hostAddress" required [(ngModel)] =" connectConfig.hostName" hostName="hostName"/>
      TODO: remove this: {{connetConfig.hostName}}
    </div>
    <div class=" form-group">
      <label for=" portNumber"> Port Number</label>
      <input type="text" class=" form-control" id=" portNumber" required [(ngModel)] =" connectConfig.portNumber" portNumber =" portNumber"/>
    </div>
    <div class=" form-group">
      <label for=" userName"> User Name</label>
      <input type="text" class=" form-control" id=" userName" required [(ngModel)] =" connectConfig.userName" userName =" userName"/>
    </div>
    <div class=" form-group">
      <label for=" udsName"> UDS Name</label>
      <input type="text" class=" form-control" id=" udsName" required [(ngModel)] =" connectConfig.udsName" udsName =" udsName"/>
    </div>
    <div class=" form-group">
      <label for=" executiveName"> Executive Name</label>
      <input type="text" class=" form-control" id=" executiveName" required [(ngModel)] =" connectConfig.executiveName" executiveName =" executiveName"/>
    </div>
    <button type="submit" class="btn btn-success">Connect</button>
  </form>
</div>

  <div [hidden]="!submitted">
    <h2>You submitted the following:</h2>
    <div class="row">
      <div class="col-xs-3">Name</div>
      <div class="col-xs-9  pull-left">{{ model.name }}</div>
    </div>
    <div class="row">
      <div class="col-xs-3">Alter Ego</div>
      <div class="col-xs-9 pull-left">{{ model.alterEgo }}</div>
    </div>
    <div class="row">
      <div class="col-xs-3">Power</div>
      <div class="col-xs-9 pull-left">{{ model.power }}</div>
    </div>
    <br>
    <button class="btn btn-primary" (click)="submitted=false">Edit</button>
  </div>
</div>