import { createSymbiote } from 'redux-symbiote';
// import Terminal from '../lib/Terminal';

export const { actions: windowsActions, reducer: windows } = createSymbiote(
  {
    /* EXAMPLE
      '123': {
        info: {
          id,
          host: '83.220.171.26',
          // port: '22',
          user: 'root',
        },
        out: '',
        comand: '',
        description: '',

        // Should not be updated (like immutable):
        terminal: new Terminal({
          host: '83.220.171.26',
          // port: '22',
          user: 'root',
          pass: 'your_passwd',
          cbOut: out => {},
          cbExe: out => {},
          cbExit: code => {},
          cbError: stderr => {}
        }),
      }
    */
  },
  {
    add: (state, { id, stuff }) => ({
      ...state,
      [id]: stuff,
    }),
    updateOut: (state, { id, out }) => ({
      ...state,
      [id]: {
        ...state[id],
        out: !state[id].out ? out : state[id].out + '\n' + out
      },
    }),
    update: (state, { id, fieldName, newValue }) => {
      const elementToUpdate = { ...state[id] };

      elementToUpdate[fieldName] = newValue;

      return({
        ...state,
        [id]: elementToUpdate,
      });
    },
    remove: (state, id) => {
      const newState = { ...state };

      delete newState[id];

      return ({ ...newState });
    },
  },
);
