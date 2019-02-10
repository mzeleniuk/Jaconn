import { HIDE_LOADER, SAVE_WORKLOAD, SET_DICTIONARY, SHOW_LOADER } from './actionTypes';

export const hideLoader = () => ({
    type: HIDE_LOADER
});

export const saveWorkload = payload => ({
    type: SAVE_WORKLOAD,
    payload: payload
});

export const setDictionary = payload => ({
    type: SET_DICTIONARY,
    payload: payload
});

export const showLoader = () => ({
    type: SHOW_LOADER
});
