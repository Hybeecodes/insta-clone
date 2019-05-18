import axios from 'axios';
import {FETCH_POSTS, FETCH_USER} from "./types";

export const fetchUser = () => {
    return async (dispatch) => {
        const res = await axios.get('/api/auth/current_user');
           dispatch({type: FETCH_USER, payload: res.data});
    };
};

export const fetchPosts = () => {
  return async (dispatch) => {
      const res = await axios.get('/api/v1/posts');
      console.log('res', res);
        dispatch({type: FETCH_POSTS, payload: res.data});
  }
};
