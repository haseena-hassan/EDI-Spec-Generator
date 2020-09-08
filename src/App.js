import React from 'react';
import { BrowserRouter as Router, Route , Switch } from "react-router-dom"
import PublicRoute from "./Route/Publicroute";

import Topnav from './Components/Layout/Topnav'
import Dashboard from './Components/Dashboard/Dashboard'
import CreateSpec from './Components/CreateSpec/Spec'
import CreateEDI from './Components/CreateEDI/CreateEDI'
import Search from './Components/Search/Search'
import Reports from './Components/Reports/Reports'


import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Topnav/>
          <PublicRoute exact path="/" component={Dashboard} />
          <PublicRoute path="/create-spec" component={CreateSpec} />
          <PublicRoute path="/create-edi" component={CreateEDI} />
          <PublicRoute path="/search" component={Search} />
          <PublicRoute path="/reports" component={Reports} />
        </div>
      </Router>
    );
  }
}

export default App;



