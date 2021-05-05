import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Navbar = () => {

    return (
        <nav>
            <div className="nav-wrapper">
                <Link to="/posts" className="logo">Req'd</Link>
                    <ul>
                    <li><Link to="/add">Create Post</Link></li>
                    </ul>
            </div>
        </nav>
    );
}

export default Navbar;