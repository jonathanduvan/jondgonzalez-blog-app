import axios from 'axios';
import { browserHistory } from 'react-router';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  CREATE_POST: 'CREATE_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
};

const ROOT_URL = 'http://jondgonzalez-blog-server.herokuapp.com/api';
const API_KEY = '?key=J_Gonzalez';

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`)
    .then(response => {
      dispatch({ type: 'FETCH_POSTS', payload: { posts: response.data } });
    })
    .catch(error => {

    });
  };
}

export function createPost(post) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts`, {
      title: post.title,
      tags: post.tags,
      content: post.content,
    })
    .then((response) => {
      browserHistory.push('/');
      dispatch({
        type: ActionTypes.CREATE_POST,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  };
}

export function updatePost(post) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${post.id}`, post)
    .then((response) => {
      console.log(response);
      browserHistory.push('/');
      dispatch({
        type: ActionTypes.UPDATE_POST,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}`).then((response) => {
      dispatch({
        type: ActionTypes.FETCH_POST,
        payload: response.data,
      });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function deletePost(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`).then((response) => {
      browserHistory.push('/');
      dispatch({
        type: ActionTypes.DELETE_POST,
        payload: id,
      });
    }).catch((error) => {
      console.log(error);
    });
  };
}
