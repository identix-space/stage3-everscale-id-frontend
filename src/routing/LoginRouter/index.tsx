import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ConnectWallet, CreateDID, LoginPage, WhyEverscalePage} from '../../pages';
import {didStorage} from '../didStorage';


export const LoginRouter = () => {

    return (
        <Switch>
            <Route exact path="/" component={ConnectWallet}>
                {didStorage.inpageProviderConnected && <Redirect to={'/login'}/>}
            </Route>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/why-everscale-info" component={WhyEverscalePage}/>
            <Route exact path="/create-did" component={CreateDID}/>
            <Redirect to={didStorage.inpageProviderConnected ? '/login' : '/'}/>
        </Switch>
    );
};

