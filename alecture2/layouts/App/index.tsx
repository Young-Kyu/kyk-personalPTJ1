import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import loadable from '@loadable/component';

const LogIn = loadable(()=>import('@pages/LogIn/LogIn'));
const SignUp = loadable(()=>import('@pages/SignUp/SignUp'));
const Workspace = loadable(()=>import('@layouts/workspace/Workspace'));
const App = () =>{

    return (
        <Switch>
            <Redirect exact path="/" to="/login" />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp}/>
            <Route path="/workspace" component={Workspace}/>
        </Switch> 
    )

}

export default App;