import React from "react";
import loadable from "@loadable/component";
import { Route, Switch, RouteProps } from "react-router-dom";
import NotFoundPage from "./SpecialPages/NotFoundPage";

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
  },
  {
    path: "/policy",
    exact: true,
    component: loadable(() => import("./PolicyPage"))
  },
  {
    path: "/privacy",
    exact: true,
    component: loadable(() => import("./PrivacyPage"))
  },
  {
    path: "/info",
    exact: true,
    component: loadable(() => import("./UserPages/InfoPage"))
  }
];

function Pages() {
  return (
    <Switch>
      {pages.map((data, i) => (
        <Route key={i} {...data} />
      ))}
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
}

export default Pages;
