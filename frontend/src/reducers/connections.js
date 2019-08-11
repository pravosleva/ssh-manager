import { createSymbiote } from 'redux-symbiote';
// import Terminal from '../lib/Terminal';

export const { actions: connectionsActions, reducer: connections } = createSymbiote(
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
        terminal: new Terminal({
          host: '83.220.171.26',
          // port: '22',
          user: 'root',
          pass: 'your_passwd',
          cbOut: out => {
            const newConnections = { ...this.state.connections };
            newConnections[id].out = out;

            this.setState(prevState => ({ connections: newConnections }));
          },
          cbExe: out => {

          },
          cbExit: code => {},
          cbError: stderr => {
            const newConnections = { ...this.state.connections };

            newConnections[id].out = String(stderr);
            this.setState(prevState => ({ connections: newConnections }));
          }
        }),
      }
    */
  },
  {
    add: (state, { id, stuff }) => ({
      ...state,
      [id]: stuff,
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
