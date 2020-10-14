import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import NavBar from './components/NavBar';
import Users from './components/Users';
import NotFound from './components/NotFound';
import Signup from './components/Signup';
import Login from './components/Login';
import Cookies from './components/Cookies';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/users' component={Users} />
          <Route path='/users/:id' component={User} />
          <Route path='/auth/signup' component={Signup} />
          <Route path='/auth/login' component={Login} />
          <Route path='/auth/cookies' component={Cookies} />
          <Route path='/404' component={NotFound} />
          <Route path='/' component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
