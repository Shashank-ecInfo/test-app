import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import PostDetail from "./components/postDetail";

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/post" component={PostDetail} />
      </Switch>
    );
  }
}

export default withRouter(App);
