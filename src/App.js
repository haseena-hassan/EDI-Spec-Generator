import React from 'react';
import { BrowserRouter as Router, Route , Switch } from "react-router-dom"

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
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/create-spec" component={CreateSpec} />
          <Route exact path="/create-edi" component={CreateEDI} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/reports" component={Reports} />
        </div>
      </Router>
    );
  }
}

export default App;



