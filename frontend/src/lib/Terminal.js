import specialLog from './specialLog';

class Terminal {
  constructor(props) { // super(props);
    this.host = props.host;
    this.user = props.user;
    this.pass = props.pass;
    // this.out = props.out;
    this.cbExe = props.cbExe;
    this.cbError = props.cbError;
    this.cbExit = props.cbExit;
    this.cbOut = props.cbOut;
  }
  // create({ host, user, pass }) {}
  run(comand) {
    // console.log(this);
    // specialLog('call', null, []);

    if (window && window.SSH) {
      this.ssh = new window.SSH({
        host: this.host,
        user: this.user,
        pass: this.pass,
      })
        .on('error', (err) => {
          // console.log(err);
          this.cbError(err);
        })
        .on('ready', () => {
          specialLog('ready', 'info', ['SSH READY']);
          // this.cbExe('SSH READY');
        });
    } else {
      this.ssh = null;
    }

    this.ssh
      .exec(comand, {
        out: stdout => {
          // this.out += '\n' + stdout;
          this.cbOut(String(stdout));
        },
        exit: code => {
          this.cbExit(code);
          // this.ssh.end();
        },
        err: stderr => {
          specialLog(`${comand} ERRORED`, 'warn', [stderr]);
          this.cbError(stderr);
        }
      })
      .start({
        success: () => {
          // this.cbExe('pwd started');
          specialLog(`${comand} SUCCESS`, null, ['Started successfully']);
        },
        fail: err => {
          specialLog(`${comand} FAIL`, 'warn', ['Was not started', err]);
          this.cbError(err);
        },
      });
  }

  get(fieldName) {
    return this[fieldName];
  }
};

export default Terminal;
