import { createStore } from 'redux';
import { reducer } from '../reducers';
const initialState = { posts: []};


export const store = createStore(reducer, initialState);
