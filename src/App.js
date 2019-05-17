import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import { Session } from "./components/Session";
import { Home } from "./components/Home/Home";
import { UserInformationForm } from "./components/Home/UserInformationForm";

function App() {

  const showDialog = true;
  const setUserName = (username) => {
    alert(username)
  };
  return (
    <Router>
      <UserInformationForm showDialog={showDialog} onUsernameSet={setUserName}/>
      <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
        <header className="masthead mb-auto">
          <div className="inner">
            <h3 className="masthead-brand">Remote Moderator</h3>
            <nav className="nav nav-masthead justify-content-center">
              <NavLink to="/" className="nav-link" activeClassName="active">
                Home
              </NavLink>
              <NavLink to="/12321" exact={true} className="nav-link" activeClassName="active">
                Foo
              </NavLink>
            </nav>
          </div>
        </header>

        <main role="main" className="inner cover">
          <Route exact path="/" component={Home} />
          <Route exact path="/:id" component={Session} />
        </main>

        <footer className="mastfoot mt-auto">
          <div className="inner">
            <p>
              By <a href="http://luisbravoa.com/"> Luisbravoa</a>.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
