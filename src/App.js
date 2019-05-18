import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import { Session } from "./components/Session";
import { Home } from "./components/Home/Home";
import { UserInformationForm } from "./components/UserInformationForm";

import uuidv1 from'uuid/v1';

const setUserId = () => {
  if(!localStorage.userId){
    localStorage.userId = uuidv1();
  }
}

setUserId();

const App = () => {
  const showDialog = true;
  const setUserName = username => {
    localStorage.username = username;
  };

  const setUserNameDialog = !localStorage.username ? (
    <UserInformationForm showDialog={showDialog} onUsernameSet={setUserName} />
  ) : (
    undefined
  );
  return (
    <Router>
      {setUserNameDialog}
      <div className="app">
        <header>
          <div>
            <h3 className="masthead-brand">
              Remote Moderator ({localStorage.username})
            </h3>
          </div>
          <nav>
            <NavLink to="/" className="nav-link" activeClassName="active">
              Home
            </NavLink>
            <NavLink
              to="/12321"
              exact={true}
              className="nav-link"
              activeClassName="active"
            >
              Foo
            </NavLink>
          </nav>
        </header>

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/:id" component={Session} />
        </main>

        <footer>
          <p>
            By <a href="http://luisbravoa.com/"> Luisbravoa</a>.
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
