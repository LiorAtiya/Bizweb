import React , { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './components/NavbarComp';

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register';
import Error from './pages/Error';
import Category from './pages/Category';
import SingleBusiness from './pages/SingleBusiness'

import { BrowserRouter as Router,Switch,Route} from "react-router-dom";

import Modal from 'react-modal'
Modal.setAppElement('#root')

class App extends Component {

    render() {
        return (
        <div>
            <Router>
                <NavbarComp/>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/category/:type" component={Category} />
                    <Route path="/business/:slug" component={SingleBusiness} />
                    <Route path="*" component={Error} />
                </Switch>
            </Router>
        </div>
        ) 
    }
}


export default App;