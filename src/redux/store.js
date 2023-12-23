// store.js
import { createStore, applyMiddleware } from "redux";
import {thunk} from 'redux-thunk';
import reducer from "./reducer";

const store = createStore(reducer, applyMiddleware(thunk.default || thunk));

export default store;
