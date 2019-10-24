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
    path: "/signin",
    exact: true,
    component: loadable(() => import("./SignInPage"))
  },
  {
    path: "/signup",
    exact: true,
    component: loadable(() => import("./SignUpPage"))
  }
];

function Pages() {
  return (
    <Switch>
      {pages.map((data, i) => (
        <Route key={i} {...data} />
      ))}
    </Switch>
  );
}

export default Pages;
