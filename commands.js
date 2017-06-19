const exec = require('child_process').exec;

exec('C:\\GSES\\SimExec\\Users\\setenv.cmd', (e, stdout, stderr) => {
    if (e instanceof Error) {
        console.error(e);
        throw e;
    }
    console.log('stdout ', stdout);
    console.log('stderr ', stderr);
}); 
exec('C:\\GSES\\SimExec\\mbin\\ia32\\giidemo.exe localhost 9000 fws load testexec', (e, stdout, stderr) => {
    if (e instanceof Error) {
        console.error(e);
        throw e;
    }
    console.log('stdout ', stdout);
    console.log('stderr ', stderr);
}); 

