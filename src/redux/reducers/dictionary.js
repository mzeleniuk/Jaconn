import { SET_DICTIONARY } from '../actionTypes';
import { Dictionaries } from '../../services/dictionaries';

const initialState = {
    data: Dictionaries.EN
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_DICTIONARY: {
            return {
                ...state,
                data: action.payload === 'EN' ? Dictionaries.EN : Dictionaries.UA
            };
        }
        default:
            return state;
    }
};
