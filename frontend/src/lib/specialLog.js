import { getHoursMinutesSecondsByMS } from './timeConverter';

const makeCounter = () => {
  let currentCounter = 0;

  return (step = 1) => {
    currentCounter += step;
    return currentCounter;
  };
};
const logCounter = makeCounter();

const specialLog = (header, logType, args) => {
  const logID = logCounter();
  const timeInMs = new Date().getTime();

  console.group(`LOG #${logID} (${getHoursMinutesSecondsByMS(timeInMs)}) ${header}`); // eslint-disable-line no-console
  switch (logType) {
    case 'error': args.map((e) => console.error(e)); break; // eslint-disable-line no-console
    case 'warn': args.map((e) => console.warn(e)); break; // eslint-disable-line no-console
    case 'table': console.table(args); break; // eslint-disable-line no-console
    default: args.map((e) => console.log(e)); break; // eslint-disable-line no-console
  }
  console.groupEnd(`LOG #${logID} (${getHoursMinutesSecondsByMS(timeInMs)}) ${header}`); // eslint-disable-line no-console
};

export default specialLog;
