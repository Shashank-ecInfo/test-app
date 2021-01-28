import axios from "axios";
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
} from "./types";
import { url } from "../common/http";

export const getPosts = () => async (dispatch) => {
  dispatch({ type: GET_POSTS_REQUEST });
  try {
    const res = await axios.get(url + "posts");
    // console.log("action>>>>>", res);
    if (res && res.status === 200) {
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({ type: GET_POSTS_FAILURE });
    }
  } catch (error) {
    dispatch({ type: GET_POSTS_FAILURE, payload: error });
  }
};

export const getComments = (id) => async (dispatch) => {
  dispatch({ type: GET_COMMENTS_REQUEST });
  try {
    const res = await axios.get(url + `posts/${id}/comments`);
    // console.log("action>>>>>", res);
    if (res && res.status === 200) {
      dispatch({
        type: GET_COMMENTS_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({ type: GET_COMMENTS_FAILURE });
    }
  } catch (error) {
    dispatch({ type: GET_COMMENTS_FAILURE, payload: error });
  }
};

export const addComment = (id, data) => async (dispatch) => {
  dispatch({ type: ADD_COMMENTS_REQUEST });
  try {
    const res = await axios.get({
      method: 'POST',
      url: url + `posts/${id}/comments`,
      data: JSON.stringify(data)
    });
    // console.log("action>>>>>", res);
    if (res && res.status === 200) {
      dispatch({
        type: ADD_COMMENTS_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({ type: ADD_COMMENTS_FAILURE });
    }
  } catch (error) {
    dispatch({ type: ADD_COMMENTS_FAILURE, payload: error });
  }
};
