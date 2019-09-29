import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setToken from "./utils/setToken";

import Navbar from "./components/home/Navbar";
import Home from "./components/home/Home";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Account from "./components/user-account/account";
import EditProfile from "./components/profile-forms/EditProfile";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Reviews from "./components/reviews/Reviews";
import Review from "./components/review/Review";
import PrivateRoute from "./components/route/PrivateRoute";
import Alert from "./components/home/Alert";
import NotFound from "./components/home/NotFound";

if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/profiles" component={Profiles} />
            <Route path="/profile/:id" component={Profile} />

            <PrivateRoute path="/account" component={Account} />
            <PrivateRoute path="/edit-profile" component={EditProfile} />
            <PrivateRoute path="/reviews" component={Reviews} />
            <PrivateRoute path="/review/:id" component={Review} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
