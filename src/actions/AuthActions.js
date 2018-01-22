import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER,
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text,
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text,
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => {
        loginUserFailure(dispatch);
      });
  };
};

export const userStateLoaded = (user) => {
  const screen = user ? 'BudgetHome' : 'Login';
  return NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: screen }),
    ],
  });
};

export const logout = () => {
  return NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Login' }),
    ],
  });
};

const loginUserFailure = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAILURE,
  });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user,
  });
  const navigateToMain = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'BudgetHome' }),
    ],
  });
  dispatch(navigateToMain);
};
