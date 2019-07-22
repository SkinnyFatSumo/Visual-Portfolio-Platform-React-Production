import {
  AUTHENTICATION_LOADING,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILURE,
  GET_ERRORS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
} from './types';

import {api_root} from './apiRoot';
console.log('api_root: ', api_root);

// CHECK TOKEN AND LOAD USER

export const logoutUser = () => (dispatch, getState) => {
  const token = getState().auth.token;
  const auth_endpoint = api_root + 'api/auth/logout';
  const auth_lookupOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };

  if (token) {
    auth_lookupOptions.headers['Authorization'] = `Token ${token}`;
  }

  fetch(auth_endpoint, auth_lookupOptions)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then(
      dispatch({
        type: LOGOUT,
      }),
    )
    .catch(error => {
      const errors = {
        message: error.response.data,
        status: error.response.status,
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};

export const authenticateUser = () => (dispatch, getState) => {
  dispatch({type: AUTHENTICATION_LOADING});

  const token = getState().auth.token;
  const auth_endpoint = api_root + 'api/auth/user';
  const auth_lookupOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };

  if (token) {
    auth_lookupOptions.headers['Authorization'] = `Token ${token}`;
  }

  fetch(auth_endpoint, auth_lookupOptions)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(response => {
      dispatch({
        type: AUTHENTICATION_SUCCESS,
        payload: response,
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: AUTHENTICATION_FAILURE,
      });
    });
};

export const loginUser = userData => dispatch => {
  const login_lookupOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userData),
  };

  const login_endpoint = api_root + 'api/auth/login';

  fetch(login_endpoint, login_lookupOptions)
    .then(response => {
      if (!response.ok) {
        if (response.status == 400) {
          throw Error('Invalid login credentials');
        }
        throw Error('Unknown error');
      }
      return response;
    })
    .then(response => response.json())
    .then(response => {
      console.log('response', response);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response,
      });
    })
    .catch(error => {
      console.log('The error is: ', error);
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
      dispatch({
        type: LOGIN_FAILURE,
      });
    });
};

export const registerUser = userData => dispatch => {
  userData.username = userData.username.toLowerCase();

  console.log('stringified', JSON.stringify(userData));
  const register_lookupOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userData),
  };

  const register_endpoint = api_root + 'api/auth/register';

  fetch(register_endpoint, register_lookupOptions)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(response => {
      console.log('response', response);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response,
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: REGISTER_FAILURE,
      });
    });
};
