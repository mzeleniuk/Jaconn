import React from 'react';

import InfoModal from './infoModal';
import Language from './language';
import logo from '../images/logo.svg';
import trees from '../images/trees.svg';

export const Header = () => (
    <header>
        <div className="logo-container">
            <img className="logo" src={logo} alt="Logo" />
        </div>

        {isWinterHolidaysPeriod() && (
            <img className="winter-holidays" src={trees} alt="Holidays" />
        )}

        <InfoModal />
        <Language />
    </header>
);

function isWinterHolidaysPeriod() {
    const currentDate = new Date();
    const dayNumber = currentDate.getDate();
    const monthNumber = currentDate.getMonth() + 1;

    return (dayNumber > 20 && monthNumber === 12) || (dayNumber < 14 && monthNumber === 1);
}
