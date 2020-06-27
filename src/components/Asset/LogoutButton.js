import React from 'react';
import { Link } from 'react-router-dom';

import './LogoutButton.css';
import * as AuthAPI from 'lib/api/auth';

const LOGOUT = 'auth/LOGOUT'; // 로그아웃



const LogoutButton = () => (
    <Link to ="/">
    <button className="BorderedButton">
        로그아웃
    </button>
    </Link>


);

export default LogoutButton;