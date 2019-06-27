import {
  NEW_PHOTO_LOADING,
  NEW_PHOTO_FAILURE,
  NEW_PHOTO_SUCCESS,
  PHOTOS_LOADING,
  PHOTOS_FAILURE,
  PHOTOS_SUCCESS,
  RUD_PHOTO_LOADING,
  RUD_PHOTO_FAILURE,
  RUD_PHOTO_SUCCESS,
  ALL_PHOTOS_LOADING,
  ALL_PHOTOS_FAILURE,
  ALL_PHOTOS_SUCCESS,
} from '../actions/types';

const initialState = {
  photo_detail: null,
  photos: [],
  photos_loading: false,
  photos_loaded: false,
  new_photo_loading: false,
  new_photo_loaded: false,
  all_photos: [],
  all_photos_loading: false,
  all_photos_loaded: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    // AFTER POSTING NEW PHOTO, STORE INFO ON THAT PHOTO
      // FORCE RELOAD OF ALL PHOTOS, AND ACTIVE PHOTOS
    case RUD_PHOTO_LOADING:
    case NEW_PHOTO_LOADING:
      return {
        ...state,
        photo_detail: action.payload,
        // all_photos_loaded: false,
        // photos_loaded: false,
        new_photo_loading: true,
        new_photo_loaded: false,
      };
    case RUD_PHOTO_SUCCESS:
    case NEW_PHOTO_SUCCESS:
      return {
        ...state,
        photo_detail: action.payload,
        all_photos_loaded: false,
        photos_loaded: false,
        new_photo_loading: false,
        new_photo_loaded: true,
      };
    case RUD_PHOTO_FAILURE:
    case NEW_PHOTO_FAILURE:
      return {
        ...state,
        photo_detail: action.payload,
        all_photos_loaded: false,
        photos_loaded: false,
        new_photo_loading: false,
        new_photo_loaded: false,
      };
    case PHOTOS_LOADING:
      return {
        ...state,
        photos_loaded: false,
        photos_loading: true,
      };
    case PHOTOS_SUCCESS:
      return {
        ...state,
        photos_loaded: true,
        photos_loading: false,
        photos: action.payload,
      };
    case PHOTOS_FAILURE:
      return {
        ...state,
        photos_loaded: false,
        photos_loading: false,
      };
    case ALL_PHOTOS_LOADING:
      return {
        ...state,
        all_photos_loaded: false,
        all_photos_loading: true,
        photos_loaded: false,
      };
    case ALL_PHOTOS_SUCCESS:
      return {
        ...state,
        all_photos_loaded: true,
        all_photos_loading: false,
        all_photos: action.payload,
      };
    case ALL_PHOTOS_FAILURE:
      return {
        ...state,
        all_photos_loaded: false,
        all_photos_loading: false,
      };
    default:
      return state;
  }
}
