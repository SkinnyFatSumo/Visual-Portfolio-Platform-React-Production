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
        message: error,
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
      if (response.ok) {
        response.json().then(response =>
          dispatch({
            type: LOGIN_SUCCESS,
            payload: response,
          }),
        );
      } else {
        response.json().then(errors => {
          console.log('LOGIN ERRORS', errors);
          dispatch({
            type: LOGIN_FAILURE,
          });
          dispatch({
            type: GET_ERRORS,
            payload: errors,
          });
        });
      }
    })
    .catch(error => {
      dispatch({
        type: LOGIN_FAILURE,
      });
    });
};

export const passwordsMatch = (p1, p2) => dispatch => {
  if (p1 !== p2) {
    const errors = {password: ['Passwords do not match.']};
    dispatch({
      type: GET_ERRORS,
      payload: errors,
    });
    return false;
  }
  return true;
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
      if (response.ok) {
        response.json().then(response =>
          dispatch({
            type: REGISTER_SUCCESS,
            payload: response,
          }),
        );
      } else {
        response.json().then(errors => {
          console.log('Errors:', errors);
          dispatch({
            type: REGISTER_FAILURE,
          });
          dispatch({
            type: GET_ERRORS,
            payload: errors,
          });
        });
      }
    })
    .catch(error => {
      console.log('Network Failure', error);
      dispatch({
        type: REGISTER_FAILURE,
      });
    });
};
