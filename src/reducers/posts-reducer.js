import { ActionTypes } from '../actions';

const PostsReducer = (state = { all: [], post: null }, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      console.log('in action creator FETCH_POSTS');
      console.log(action.payload.posts);
      return { ...state, all: action.payload.posts };
    case ActionTypes.FETCH_POST:
      console.log('in action creator FETCH_POST');
      console.log(action.payload.post);
      return { ...state, post: action.payload.post };

    case ActionTypes.UPDATE_POST:
      return Object.assign({}, state, { post: action.payload });

    case ActionTypes.DELETE_POST: {
        // update local state so delete shows up right away
      const id = action.payload;
      const newPosts = [];
      let j = 0;
      for (let i = 0; i < state.all.length; i++) {
        if (state.all[i].id !== id) {
          newPosts[j] = state.all[i];
          j ++;
        }
      }
      return Object.assign({}, state, { all: newPosts });
    }
    default:
      return state;
  }
};

export default PostsReducer;
