import React , { useState } from 'react';

//const Route = require("react-router-dom").Route;
import CreatePost from './Components/FormSubmission.js';
import axios from 'axios';
import Feed from './Components/Feed.js';
import Navbar from './Components/Navbar.js';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
axios.defaults.withCredentials = true;

const App = () => {


    return (

            <Router>
                <Switch>
                    <Route exact path="/posts">
                        <Navbar/>
                        <Feed/>
                    </Route>
                    <Route exact path="/add">
                         <Navbar/>
                        <CreatePost/>
                        <Feed/>
                    </Route>
                    <Route exact path ="/">hello world
                         <Navbar/>
                        
                    </Route>
                </Switch>
            </Router>
    );
}

ReactDOM.render(<App/>,  document.getElementById('root'));
