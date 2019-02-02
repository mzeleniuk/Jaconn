import React from 'react';

export const Loader = ({showLoader}) => {
    if (showLoader) {
        return (
            <div className="preloader">
                <div className="loader"/>
            </div>
        );
    } else {
        return null;
    }
};
