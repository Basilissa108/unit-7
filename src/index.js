import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import "./index.css";
import Home from "./Home";
import Error404 from "./Error404";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/search"/>} />
            <Route exact path="/search" component={Home} />
            <Route exact path="/search/:tag" component={Home} />
            <Route path="/*" component={Error404}/>
        </Switch>
    </Router>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
