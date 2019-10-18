import React from "react";
import loadable from "@loadable/component";
import { Route, Switch } from "react-router-dom";

const pages = [
  {
    path: "/",
    exact: true,
    component: loadable(() => import("./IndexPage"))
  }
];

function Pages() {
  return (
    <Switch>
      {pages.map(data => (
        <Route {...data} />
      ))}
    </Switch>
  );
}

export default Pages;
