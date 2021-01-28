import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  ADD_COMMENTS_REQUEST,
  ADD_COMMENTS_SUCCESS,
  ADD_COMMENTS_FAILURE,
} from "../actions/types";

const initState = {
  posts: [],
  comments: [],
  loading: false,
};

const GetPosts = (state = initState, action) => {
  //   console.log("Reducer>>>>>>>>>>", action.payload);
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case GET_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case GET_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case GET_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case ADD_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case ADD_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default GetPosts;
