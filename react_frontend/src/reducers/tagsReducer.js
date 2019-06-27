import {
  // ASYNC  
  TAGS_LOADING,
  TAGS_SUCCESS,
  TAGS_FAILURE,
  
  NEW_TAG_LOADING,
  NEW_TAG_SUCCESS,
  NEW_TAG_FAILURE,
  
  RELATIONS_LOADING,
  RELATIONS_SUCCESS,
  RELATIONS_FAILURE,
  
  NEW_RELATION_LOADING,
  NEW_RELATION_SUCCESS,
  NEW_RELATION_FAILURE,

  RUD_RELATION_LOADING,
  RUD_RELATION_SUCCESS,
  RUD_RELATION_FAILURE,
  
  RUD_PHOTO_SUCCESS,

  RUD_TAG_LOADING,
  RUD_TAG_SUCCESS,
  RUD_TAG_FAILURE,

  ALL_TAGS_SUCCESS,

  // SYNCHRONOUS
  SET_TAGS,
} from '../actions/types';

const initialState = {
  // tags that come from get request
  tags: [],
  all_tags: [],
  relations: [],
  relation: null,

  tags_loaded: false,
  tags_loading: false,
  new_tag_loaded: false,
  new_tag_loading: false,

  all_tags_loaded: false,
  all_tags_loading: false,

  relations_loaded: false,
  relations_loading: false,
  //  new_relation_loaded: false,
  //  new_relation_loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    // SUCCESS
    case ALL_TAGS_SUCCESS:
      return {
        ...state,
        all_tags: action.payload,
        all_tags_loaded: true,
        all_tags_loading: false,
      };

    case TAGS_LOADING:
      return {
        ...state,
        tags_loaded: false,
        tags_loading: true,
        all_tags_loading: true,
      };
    case TAGS_SUCCESS:
      return {
        ...state,
        tags_loaded: true,
        tags_loading: false,
        all_tags_loading: false,
        all_tags_loaded: true,
      };
    case TAGS_FAILURE:
      return {
        ...state,
        tags_loaded: false,
        tags_loading: false,
        all_tags_loading: false,
      };
    
    case NEW_TAG_LOADING:
    case RUD_TAG_LOADING:
      return {
        ...state,
        new_tag_loaded: false,
        new_tag_loading: true,
      };
    case NEW_TAG_SUCCESS:
    case RUD_TAG_SUCCESS:
      console.log('RUD TAG SUCCESS');
      return {
        ...state,
        tags_loaded: false,
        tags_loading: false,
        relations_loaded: false,
        all_tags_loaded: false,
        new_tag_loaded: true,
        new_tag_loading: false,
      };
    case NEW_TAG_FAILURE:
    case RUD_TAG_FAILURE:
      return {
        ...state,
        new_tag_loaded: false,
        new_tag_loading: false,
      };

    case RELATIONS_LOADING:
      
      return {
        ...state,
        relations_loaded: false,
        relations_loading: true,
      };
    case RELATIONS_SUCCESS:
      return {
        ...state,
        relations: action.payload,
        relations_loaded: true,
        relations_loading: false,
      };
    case RELATIONS_FAILURE:
      return {
        ...state,
        relations_loaded: false,
        relations_loading: false,
      };
    case NEW_RELATION_LOADING:
    case RUD_RELATION_LOADING:
      return {
        ...state,
        relations_loaded: false,
        relations_loading: false,
        //new_relation_loaded: false,
        //new_relation_loading: true,
      };
    case NEW_RELATION_SUCCESS:
    case RUD_RELATION_SUCCESS:
    // when a photo is deleted, it's relation is broken too
    case RUD_PHOTO_SUCCESS:
      return {
        ...state,
        relation: action.payload,
        relations_loaded: false,
        relations_loading: false,
        //new_relation_loaded: true,
        //new_relation_loading: false,
      };
    case NEW_RELATION_FAILURE:
    case RUD_RELATION_FAILURE:
      return {
        ...state,
        relations_loaded: true,
        relations_loading: false,
        //new_relation_loaded: false,
        //new_relation_loading: false,
      };
      
    // SYNCHRONOUS
    case SET_TAGS:
      return {
        ...state,
        tags: action.payload,
      };
    // DEFAULT
    default:
      return state;
  }
}
