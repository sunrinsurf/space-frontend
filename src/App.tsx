import React from "react";
import Pages from "./components/pages";
import { hot } from 'react-hot-loader';

const App: React.FC = () => {
  return (
    <>
      <Pages />
    </>
  );
};

export default hot(module)(App);
