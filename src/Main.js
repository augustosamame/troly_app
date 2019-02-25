import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Header from './common/Header';
import App from './App';
import About from './About';
import Drawer from './Drawer';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/about/" component={About} />
      <Route path="/drawer" component={Drawer} />
    </Switch>
  </div>
);

export default Main;
