import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';  
import axios from 'axios';
import styles from '../styles/FormStyles.css'
axios.defaults.withCredentials = true;

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onChangePassword2 = (e) => {
        setPassword2(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        const newUser = {
            username: username,
            password: password,
            password2: password2
        }
        axios.post('http://localhost:3000/users/register', newUser)
            .then(res => {
                if (res.data.passwordsNotMatching) {
                    setErrorMessage('Passwords do not match');
                } else if (res.data.userAlreadyExists) {
                    setErrorMessage('User already exists, please choose a different username');
                } else {
                    console.log(res.data);
                    history.push('/posts')
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className={styles.formstyle}>
            <div className="center-align">
                <h5><b>Register</b></h5>
            </div>
            <form  onSubmit={onSubmit}>
                <div className="input-field">
                    <input required id="username" type="text" value={username} onChange={onChangeUsername}/>
                    <label htmlFor="username">Username</label>
                </div>
                <div className="input-field">
                    <input required id="password" type="password" value={password} onChange={onChangePassword}/>
                    <label htmlFor="password">Password</label>
                </div>
                <div className="input-field">
                    <input required id="password2" type="password" value={password2} onChange={onChangePassword2}/>
                    <label htmlFor="password2">Confirm Password</label>
                </div>
                <div className="row center-align">
                    <p className="red-text">{errorMessage}</p>
                    <button type="submit" className="col s6 offset-s3 btn waves-effect waves-light">Register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;