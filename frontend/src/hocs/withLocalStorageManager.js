import * as localStorage from 'store';
import { compose, withHandlers } from 'recompose';

const withLocalStorageManager = compose(
  withHandlers({
    getLSItem: props => name => localStorage.get(name),
    setLSItem: props => (name, value) => {
      localStorage.set(name, value);
    },
    removeLSItem: props => name => {
      localStorage.remove(name);
    },
    clearLS: props => () => {
      localStorage.clearAll();
    },
  }),
);

export default withLocalStorageManager;
