import { SET_DICTIONARY } from '../actionTypes';
import { Dictionaries } from '../../services/dictionaries';

const browserLanguage = navigator.language.slice(0, 2);

const initialState = {
    data: browserLanguage === 'uk' ? Dictionaries.UA : Dictionaries.EN
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
