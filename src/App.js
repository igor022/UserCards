import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import NavBar from './components/NavBar';
import Users from './components/Users';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/users' component={Users} />
          <Route path='/users/:id' component={User} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
