'use strict';

import React, {Component} from 'react';
import {render as renderComponent} from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import './styles/main.scss';
import {
    WrapperComponent
} from './containers';
import store from './redux/create';
import { HomeContainer, LogInContainer, SignUpContainer, CartContainer} from "./containers/index";
import { HeaderContainer } from './components/index'

renderComponent(
    <Provider store={store}>
        <Router >
            <WrapperComponent>
                <HeaderContainer/>
                <div className="main-wrapper">
                    <Route exact path='/' component={HomeContainer}/>
                    <Route exact path='/signIn' component={LogInContainer}/>
                    <Route exact path='/signUp' component={SignUpContainer}/>
                    <Route exact path='/cart' component={CartContainer}/>
                </div>
            </WrapperComponent>
        </Router>
    </Provider>
    ,
    document.getElementById('app')
);
