import { windowsActions } from '../reducers/windows';

export const addWindow = newObj => async (dispatch) => {
  // console.log(newObj);
  try {
    await dispatch(windowsActions.add(newObj));
    return Promise.resolve();
  }
  catch(err) {
    return Promise.reject(err);
  }
};

export const updateWindow = newObj => async (dispatch) => {
  // console.log(newObj); // { id, fieldName, newValue }
  try {
    await dispatch(windowsActions.update(newObj));
    return Promise.resolve();
  }
  catch(err) {
    return Promise.reject(err);
  }
};

export const updateOut = newObj => async (dispatch) => {
  // console.log(newObj); // { id, fieldName, newValue }
  try {
    await dispatch(windowsActions.updateOut(newObj));
    return Promise.resolve();
  }
  catch(err) {
    return Promise.reject(err);
  }
};

export const removeWindow = id => async (dispatch) => {
  try {
    await dispatch(windowsActions.remove(id));
    return Promise.resolve();
  }
  catch(err) {
    return Promise.reject(err);
  }
};
