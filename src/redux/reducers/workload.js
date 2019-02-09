import { SAVE_WORKLOAD } from '../actionTypes';

const initialState = {
    data: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_WORKLOAD: {
            return {
                ...state,
                data: action.payload
            };
        }
        default:
            return state;
    }
};
