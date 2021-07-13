import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/navbar.css'

axios.defaults.withCredentials = true;

const Navbar = () => {

    return (
   
            <div className={styles.navBar}>
                <div className={styles.title}><Link to="/posts" className={styles.title}>My Req's</Link></div>
                   <div className={styles.logo}>
                       <p><i>Req'd</i></p>
                   </div>
                    <div className={styles.li} ><Link to="/add" className={styles.li}>New Req</Link></div>
            </div>
      
    );
}

export default Navbar;