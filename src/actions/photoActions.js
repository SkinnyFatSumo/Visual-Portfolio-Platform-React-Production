import {
  ALL_PHOTOS_SUCCESS,
  ALL_PHOTOS_LOADING,
  ALL_PHOTOS_FAILURE,
  GET_ERRORS,
  GET_NETWORK_ERRORS,
  NEW_PHOTO_SUCCESS,
  PHOTOS_SUCCESS,
  PHOTOS_LOADING,
  PHOTOS_FAILURE,
  RUD_PHOTO_LOADING,
  RUD_PHOTO_FAILURE,
  RUD_PHOTO_SUCCESS,
} from './types';

import {api_root} from './apiRoot';

///////////////////////////////////////////////////////////////////////////////
////////////////////                                   ////////////////////////
////////////////////  RETRIEVE, UPDATE, DESTROY PHOTO  ////////////////////////
////////////////////                                   ////////////////////////
///////////////////////////////////////////////////////////////////////////////
export const rudPhoto = (id, method, photoData) => (dispatch, getState) => {
  dispatch({type: RUD_PHOTO_LOADING});

  const rud_lookupOptions = {
    method: method,
    headers: {},
  };
  const rud_endpoint = api_root + 'api/photos/' + id;

  const token = getState().auth.token;
  if (token) rud_lookupOptions.headers['Authorization'] = `Token ${token}`;
  if (photoData) rud_lookupOptions.body = photoData;

  fetch(rud_endpoint, rud_lookupOptions)
    .then(response => {
      if (response.ok) dispatch({type: RUD_PHOTO_SUCCESS});
      else {
        response.json().then(errors => {
          dispatch({
            type: RUD_PHOTO_FAILURE,
            payload: errors,
          });
        });
      }
    })
    .catch(errors => {
      dispatch({
        type: RUD_PHOTO_FAILURE,
      });
      dispatch({
        type: GET_NETWORK_ERRORS,
      });
    });
};

///////////////////////////////////////////////////////////////////////////////
////////////////////                                   ////////////////////////
////////////////////        SET CURRENT PHOTOS         ////////////////////////
////////////////////                                   ////////////////////////
///////////////////////////////////////////////////////////////////////////////
export const setPhotos = (username, tag_string) => dispatch => {
  console.log('SET PHOTOS CALLED');
  dispatch({type: PHOTOS_LOADING});
  const tagged_lookupOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  var tagged_endpoint;
  tag_string == ''
    ? (tagged_endpoint = api_root + 'api/photos/' + username + '/list')
    : (tagged_endpoint =
        api_root + 'api/photos/' + username + '/sort?tags=' + tag_string);

  fetch(tagged_endpoint, tagged_lookupOptions)
    .then(res => res.json())
    .then(tagged_photos =>
      dispatch({
        type: PHOTOS_SUCCESS,
        payload: tagged_photos,
      }),
    )
    .catch(err =>
      dispatch({
        type: PHOTOS_FAILURE,
        payload: err.message,
      }),
    );
};

///////////////////////////////////////////////////////////////////////////////
////////////////////                                   ////////////////////////
////////////////////          FETCH ALL PHOTOS         ////////////////////////
////////////////////                                   ////////////////////////
///////////////////////////////////////////////////////////////////////////////
export const fetchAllPhotos = username => dispatch => {
  dispatch({type: ALL_PHOTOS_LOADING});
  const tagged_lookupOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  const tagged_endpoint = api_root + 'api/photos/' + username + '/list';

  fetch(tagged_endpoint, tagged_lookupOptions)
    .then(res => {
      if (res.ok)
        res.json().then(all_photos =>
          dispatch({
            type: ALL_PHOTOS_SUCCESS,
            payload: all_photos,
          }),
        );
      else
        res.json().then(errors => {
          console.log('FETCH PHOTO ERRORS:', errors);
          dispatch({
            type: GET_ERRORS,
            payload: errors,
          });
          dispatch({
            type: ALL_PHOTOS_FAILURE,
          });
        });
    })
    .catch(errors => {
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
      dispatch({
        type: ALL_PHOTOS_FAILURE,
      });
    });
};

///////////////////////////////////////////////////////////////////////////////
////////////////////                                   ////////////////////////
////////////////////            POST PHOTO             ////////////////////////
////////////////////                                   ////////////////////////
///////////////////////////////////////////////////////////////////////////////
export const postPhoto = photoData => (dispatch, getState) => {
  const post_lookupOptions = {
    method: 'POST',
    body: photoData,
    headers: {},
  };

  const token = getState().auth.token;
  if (token) {
    post_lookupOptions.headers['Authorization'] = `Token ${token}`;
  }
  // TODO: else, dispatch an error

  const post_endpoint = api_root + 'api/photos/create';

  fetch(post_endpoint, post_lookupOptions)
    .then(res => {
      if (res.ok) {
        res.json().then(photo =>
          dispatch({
            type: NEW_PHOTO_SUCCESS,
            payload: photo,
          }),
        );
      } else {
        res.json().then(errors =>
          dispatch({
            type: GET_ERRORS,
            payload: errors,
          }),
        );
      }
    })
    .catch(err => console.log('Network Error', err));
};
