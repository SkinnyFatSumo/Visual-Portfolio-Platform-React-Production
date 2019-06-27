import {
  AUTHENTICATION_LOADING,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
} from './types';

// CHECK TOKEN AND LOAD USER

export const logoutUser = () => (dispatch, getState) => {
  const token = getState().auth.token;
  const auth_endpoint = 'http://localhost:8000/api/auth/logout';
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
      console.log(error);
    });
};

export const authenticateUser = () => (dispatch, getState) => {
  dispatch({type: AUTHENTICATION_LOADING});
  

  const token = getState().auth.token;
  const auth_endpoint = 'http://localhost:8000/api/auth/user';
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

  const login_endpoint = 'http://localhost:8000/api/auth/login';

  fetch(login_endpoint, login_lookupOptions)
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
        type: LOGIN_SUCCESS,
        payload: response,
      });
    })
    .catch(error => {
      console.log(error);
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

  const register_endpoint = 'http://localhost:8000/api/auth/register';

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
