import axios from 'axios';
const initState = [];

const rootReducer = (state = initState, action) => {
    console.log(action);
    if(action.type === 'FETCH_POSTS'){
        axios.get('/api/v1/posts')
            .then((res) => {
                state = [...state,...res.data ];
            })
            .catch((err) => {
                console.log(err);
            });
    }
    console.log('state', state);
    return state;
};

export default rootReducer;