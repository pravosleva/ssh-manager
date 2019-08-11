import { connectionsActions } from '../reducers/connections';

export const addConnection = newObj => async (dispatch) => {
  // console.log(newObj);
  try {
    await dispatch(connectionsActions.add(newObj));
    return Promise.resolve();
  }
  catch(err) {
    return Promise.reject(err);
  }
};

export const updateConnection = newObj => async (dispatch) => {
  // console.log(newObj); // { id, fieldName, newValue }
  try {
    await dispatch(connectionsActions.update(newObj));
    return Promise.resolve();
  }
  catch(err) {
    return Promise.reject(err);
  }
};

export const removeConnection = id => async (dispatch) => {
  try {
    await dispatch(connectionsActions.remove(id));
    return Promise.resolve();
  }
  catch(err) {
    return Promise.reject(err);
  }
};
