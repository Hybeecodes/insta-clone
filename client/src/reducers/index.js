import axios from 'axios';
export const reducer = (state = {}, action) => {
    switch (action.type) {
      case 'FETCH_POSTS':
        axios.get('/api/v1/posts')
        .then((res) => {
            console.log(res)
            return {
                ...state, posts: res.data
            }
        })
        .catch((err) => {
            console.log(err);
        });
        return state;
      default:
        return state
    }
  }