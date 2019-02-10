import React from 'react';

import Language from './language';
import logo from '../images/logo.svg';

export const Header = () => (
    <header>
        <img className="logo" src={logo} alt="Logo" />
        <Language />
    </header>
);
