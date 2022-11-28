import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './components/NavbarComp';

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register';
import Error from './pages/Error';
import Category from './pages/Category';
import SingleBusiness from './pages/SingleBusiness'
import NewBusiness from './pages/NewBusiness';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { AuthContext } from './context/AuthContext';

//for calender
import Modal from 'react-modal'
Modal.setAppElement('#root')

export default function App() {
    // const { user } = useContext(AuthContext);

    return (
        <div>
            <Router>
                <NavbarComp />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/login">
                        {/* {user ? <Redirect to='/' /> : <Login />} */}
                        <Login />
                    </Route>
                    <Route exact path="/register">
                        <Register />
                    </Route>
                    <Route exact path="/newbusiness">
                        <NewBusiness />
                    </Route>
                    <Route exact path="/category/:type">
                        <Category />
                    </Route>
                    <Route path="/business/:name">
                        <SingleBusiness />
                    </Route>
                    <Route path="*">
                        <Error />
                    </Route>
                </Switch>
            </Router>
        </div >
    )
}