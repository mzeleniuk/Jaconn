import { combineReducers } from 'redux';
import Loader from './loader';

const rootReducer = combineReducers({
    loader: Loader
});

export default rootReducer;
