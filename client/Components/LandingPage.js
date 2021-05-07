import React, { useState } from 'react';
import Login from './Login';
import Register from './Registtration';
import styles from '../styles/navbar.css'
const LandingPage = () => {
    const [isRegistering, setRegisteringState] = useState(false);

    return (
        <div >
            <div className={styles.navBar} >
                <div className={styles.title}>Welcome to Req'd</div>
            </div>
            <br/>
            <br/>
            <div >
                {!isRegistering
                  ? <Login setRegisteringState={setRegisteringState}/>
                  : <Register/>
                }
            </div>
        </div>
    );
}

export default LandingPage;