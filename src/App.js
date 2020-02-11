import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Route, Redirect, Switch, NavLink } from "react-router-dom";
import Login from './component/login';
import Search from './component/search';
import './App.css';

function App() {
  return (
    
      <React.Fragment>
      <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                      <NavLink to="/login" className="nav-link">Login</NavLink>
                  </li>
                  <li className="nav-item">
                      <NavLink to="/search" className="nav-link">Search</NavLink>
                  </li>
                </ul>
            </div>
          </nav>
        </header>

        <section>
          <main className="container">
              <Switch>
                <Route path="/login" component={Login} />
                <Redirect from="/" exact to="/login" />
                <Route path="/search" component={Search} />
              </Switch>      
            </main>  
        </section>
      </React.Fragment>
  
    
  );
}

export default App;
