import React, { useState } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import { Session } from "./components/Session";
import { Home } from "./components/Home";
import { UserInformationForm } from "./components/UserInformationForm";
import Network from './common/Network';
import UserInfo from './common/UserInfo';

UserInfo.setUserId();

const App = () => {

  const [username, setUserName] = useState(UserInfo.getUserName());

  const createSession = async () => {
    const newSession = await Network.createSession(UserInfo.getUserId());
    window.location = `/${newSession.data.id}`;
  }

  const handleSetUserName = (name) => {
    UserInfo.setUserName(name);
    setUserName(UserInfo.getUserName());
  };

  return (
    <Router>
      <UserInformationForm showDialog={!username} onUsernameSet={handleSetUserName} />
      <div className="app">
        <header>
          <div>
            <h3 className="masthead-brand">
              Remote Moderator ({username})
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
          <Route exact path="/" component={() => <Home createSession={createSession}/>} />
          <Route exact path="/:id" component={({match}) =>
            <Session match={match} username={username} userId={UserInfo.getUserId()}/>
          } />
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
