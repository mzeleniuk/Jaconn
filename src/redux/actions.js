import { HIDE_LOADER, SAVE_WORKLOAD, SHOW_LOADER } from './actionTypes';

export const hideLoader = () => ({
    type: HIDE_LOADER
});

export const saveWorkload = payload => ({
    type: SAVE_WORKLOAD,
    payload: payload
});

export const showLoader = () => ({
    type: SHOW_LOADER
});
