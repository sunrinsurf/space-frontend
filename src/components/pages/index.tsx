import React from "react";
import loadable from "@loadable/component";
import { Route, Switch, RouteProps } from "react-router-dom";

const pages: RouteProps[] = [
  {
    path: "/",
    exact: true,
    component: loadable(() => import("./IndexPage"))
  },
  {
    path: "/learn-more",
    exact: true,
    component: loadable(() => import("./LearnMorePage"))
  },
  {
    path: '/signin',
    exact: true,
    component: loadable(() => import('./SignInPage'))
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
