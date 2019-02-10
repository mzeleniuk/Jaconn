import { combineReducers } from 'redux';
import Dictionary from './dictionary';
import Loader from './loader';
import Workload from './workload';

const rootReducer = combineReducers({
    dictionary: Dictionary,
    loader: Loader,
    workload: Workload
});

export default rootReducer;
