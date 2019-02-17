import React from 'react';

import InfoModal from './infoModal';
import Language from './language';
import logo from '../images/logo.svg';

export const Header = () => (
    <header>
        <div className="logo-container">
            <img className="logo" src={logo} alt="Logo" />
        </div>

        <InfoModal />
        <Language />
    </header>
);
