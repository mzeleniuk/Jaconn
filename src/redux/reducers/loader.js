import { HIDE_LOADER, SHOW_LOADER } from '../actionTypes';

const initialState = {
    show: true
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_LOADER: {
            return {
                ...state,
                show: true
            };
        }
        case HIDE_LOADER: {
            return {
                ...state,
                show: false
            };
        }
        default:
            return state;
    }
};
