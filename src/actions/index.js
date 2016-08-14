import axios from 'axios';
import { browserHistory } from 'react-router';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  CREATE_POST: 'CREATE_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

// const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
const ROOT_URL = 'https://hw5-part2-blog-server.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api';
const API_KEY = '?key=J_Gonzalez';

export function fetchPosts() {
  return (
    (dispatch) => {
      axios.get(`${ROOT_URL}/posts${API_KEY}`).then(response => {
      // do something with response.data  (some json)
        dispatch({ type: 'FETCH_POSTS', payload: response.data });
      }).catch(error => {
      // hit an error do something else!
      });
    }
  );
}

export function fetchPost(id) {
  return (
    (dispatch) => {
      axios.get(`${ROOT_URL}/posts/${id}/${API_KEY}`).then(response => {
      // do something with response.data  (some json)
        dispatch({ type: 'FETCH_POST', payload: response.data });
        console.log(response.data);
      }).catch(error => {
      // hit an error do something else!
      });
    }
  );
}

export function deletePost(id) {
  return (
    (dispatch) => {
      axios.delete(`${ROOT_URL}/posts/${id}/${API_KEY}`, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      // do something with response.data  (some json)
        dispatch({ type: 'DELETE_POST', payload: response.data });
        browserHistory.push('/');
      }).catch(error => {
      // hit an error do something else!
      });
    }
  );
}

export function createPost(title, tags, content) {
  return (
    (dispatch) => {
      const fields = { title, content, tags };
      axios.post(`${ROOT_URL}/posts${API_KEY}`, fields, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      // do something with response.data  (some json)
        dispatch({ type: 'CREATE_POST', payload: response.data });
        browserHistory.push('/');
      }).catch(error => {
      // hit an error do something else!
      });
    }
  );
}

export function updatePost(id, title, tags, content) {
  return (
    (dispatch) => {
      const fields = { title, content, tags };
      axios.put(`${ROOT_URL}/posts/${id}/${API_KEY}`, fields, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      // do something with response.data  (some json)
        dispatch({ type: 'UPDATE_POST', payload: response.data });
        console.log(response.data);
        // browserHistory.push('/');
      }).catch(error => {
      // hit an error do something else!
      });
    }
  );
}
// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signinUser({ email, password }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin/${API_KEY}`, { email, password }).then(response => {
      dispatch({ type: ActionTypes.AUTH_USER });
      console.log('user was signed in');
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/');
    }).catch(error => {
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}

export function signupUser({ email, password, username }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup/${API_KEY}`, { email, password, username }).then(response => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/');
      console.log('user was signed up');
    }).catch(error => {
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    browserHistory.push('/');
  };
}
