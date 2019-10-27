import React from "react";
import Pages from "./components/pages";
import { hot } from "react-hot-loader";
import CheckCookie from "./components/Router/CheckCookie";

const App: React.FC = () => {
  return (
    <>
      <Pages />
      <CheckCookie />
    </>
  );
};

export default hot(module)(App);
