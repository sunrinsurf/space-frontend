import React from "react";
import Page from "../Page";
import Button from "../Form/Button";
import { Link } from "react-router-dom";

function IndexPage() {
  return (
    <Page>
      <h1>
        <span role="img" aria-label="rocket">
          🚀
        </span>{" "}
        Space
      </h1>
      <p>
        <strong>Hello World!</strong> Welcome to Space.
      </p>
      <p>Space is currently under development.</p>
      <Link to="/learn-more">
        <Button>Learn more</Button>
      </Link>
    </Page>
  );
}

export default IndexPage;
