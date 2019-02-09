import { combineReducers } from 'redux';
import Loader from './loader';
import Workload from './workload';

const rootReducer = combineReducers({
    loader: Loader,
    workload: Workload
});

export default rootReducer;
