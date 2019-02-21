import { SET_DICTIONARY } from '../actionTypes';
import { Dictionaries } from '../../services/dictionaries';

const initialState = {
    data: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_DICTIONARY: {
            return {
                ...state,
                data: action.payload === 'UA' ? Dictionaries.UA : Dictionaries.EN
            };
        }
        default:
            return state;
    }
};
