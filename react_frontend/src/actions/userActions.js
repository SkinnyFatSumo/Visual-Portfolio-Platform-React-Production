import {
  ALL_USERS_SUCCESS,
  ALL_USERS_LOADING,
  ALL_USERS_FAILURE,
  USER_INFO_SUCCESS,
  USER_INFO_LOADING,
  USER_INFO_FAILURE,
  FAVORITES_SUCCESS,
  FAVORITES_LOADING,
  FAVORITES_FAILURE,
  VIEWING_USER_SUCCESS,
  VIEWING_USER_FAILURE,
} from './types';

export const viewingUser = (username, bool) => {
  if (bool) {
    return {
      type: VIEWING_USER_SUCCESS,
      payload: username,
    };
  } else {
    return {
      type: VIEWING_USER_FAILURE,
    };
  }
};

export const fetchAllUsers = () => dispatch => {
  const allUsers_lookupOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  const allUsers_endpoint = 'http://localhost:8000/api/auth/users';
  dispatch({
    type: ALL_USERS_LOADING,
  });

  fetch(allUsers_endpoint, allUsers_lookupOptions)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then(response => {
      response.json().then(data => {
        console.log('DATA', data);
        dispatch({
          type: ALL_USERS_SUCCESS,
          payload: data,
        });
      });
    })
    .catch(error => {
      console.log('ERROR', error);
      dispatch({
        type: ALL_USERS_FAILURE,
      });
    });
};
