import {
  NEW_PHOTO_SUCCESS,
  PHOTOS_SUCCESS,
  PHOTOS_LOADING,
  PHOTOS_FAILURE,
  RUD_PHOTO_LOADING,
  RUD_PHOTO_FAILURE,
  RUD_PHOTO_SUCCESS,
  ALL_PHOTOS_SUCCESS,
  ALL_PHOTOS_LOADING,
  ALL_PHOTOS_FAILURE,
} from './types';

// Retrieve, Update, Destroy
export const rudPhoto = (id, method, data) => (dispatch, getState) => {
  dispatch({type: RUD_PHOTO_LOADING});

  console.log('RUD PHOTO CALLED');
  // TODO: deal with retrieve/update vs destroy headers and return values/statuses
  const rud_lookupOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const rud_endpoint = 'http://localhost:8000/api/photos/' + id;

  const token = getState().auth.token;
  if (token) {
    rud_lookupOptions.headers['Authorization'] = `Token ${token}`;
  }
  if (data) {
    rud_lookupOptions.body = JSON.stringify(data);
  }
  // TODO: else, dispatch an error
  // TODO: catch status code, return alert based on success or failure / type

  fetch(rud_endpoint, rud_lookupOptions)
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res;
    })
    .then(photo => {
      dispatch({type: RUD_PHOTO_SUCCESS, payload: photo});
    })
    .catch(error => {
      console.log('error', error);
      dispatch({type: RUD_PHOTO_FAILURE});
    });
};

// Set CURRENT PHOTOS based on tags
export const setPhotos = (username, tag_string) => dispatch => {
  console.log('SET PHOTOS CALLED');
  dispatch({type: PHOTOS_LOADING});
  const tagged_lookupOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  var tagged_endpoint;
  tag_string == ''
    ? (tagged_endpoint =
        'http://localhost:8000/api/photos/' + username + '/list')
    : (tagged_endpoint =
        'http://localhost:8000/api/photos/' +
        username +
        '/sort?tags=' +
        tag_string);

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

// GET ALL PHOTOS, DON'T CHANGE CURRENT PHOTOS SET
export const fetchAllPhotos = username => dispatch => {
  console.log('FETCH ALL PHOTOS CALLED');
  dispatch({type: ALL_PHOTOS_LOADING});
  const tagged_lookupOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  const tagged_endpoint =
    'http://localhost:8000/api/photos/' + username + '/list';

  fetch(tagged_endpoint, tagged_lookupOptions)
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .then(all_photos => {
      console.log('FETCH ALL PHOTOS --SUCCESS--');
      dispatch({
        type: ALL_PHOTOS_SUCCESS,
        payload: all_photos,
      });
    })
    .catch(err =>
      dispatch({
        type: ALL_PHOTOS_FAILURE,
        payload: err.message,
      }),
    );
};

// POST / CREATE PHOTO
export const postPhoto = photoData => (dispatch, getState) => {
  console.log('POST PHOTO CALLED');
  const post_lookupOptions = {
    method: 'POST',
    body: JSON.stringify(photoData),
    headers: {'Content-Type': 'application/json'},
  };

  const token = getState().auth.token;
  if (token) {
    post_lookupOptions.headers['Authorization'] = `Token ${token}`;
  }
  // TODO: else, dispatch an error

  const post_endpoint = 'http://localhost:8000/api/photos/create';

  fetch(post_endpoint, post_lookupOptions)
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .then(photo =>
      dispatch({
        type: NEW_PHOTO_SUCCESS,
        payload: photo,
      }),
    )
    .catch(err => {
      dispatch({
        type: NEW_PHOTO_FAILURE,
        payload: err,
      }),
        console.log('error', err);
    });
};
