import { ActionTypes } from '../actions';

const PostReducer = (state = {
  all: [],
  post: null,
}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return {
        all: action.newPosts,
        post: state.post,
      };
    case ActionTypes.FETCH_POST:
      return {
        all: state.all,
        post: action.newPost,
      };
    default:
      return state;
  }
};

export default PostReducer;
