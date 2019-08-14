import React from 'react';
import { compose, withStateHandlers } from 'recompose';

const withLocalStorageManager = compose(
  withStateHandlers(
    () => ({}),
    {
      addRef: props => id => ({
        [String(id)]: React.createRef(),
      }),
      removeRef: props => id => {
        const state = { ...props };

        delete state[id];

        return ({ ...state });
      },
      scrollDownByID: props => id => {
        // console.log(props[id]);

        const doIt = () => props[id].current.scrollIntoView({
          behavior: 'auto',
          block: 'end',
        });
        // setTimeout(doIt, 1000);
        doIt();
        window.scrollBy(0, 40);
      },
      tst: props => () => {
        console.log(props);
      },
    }
  ),
);

export default withLocalStorageManager;
