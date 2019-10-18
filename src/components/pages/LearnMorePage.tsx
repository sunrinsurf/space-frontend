import React from "react";
import Page from "../Page";
import Input from "../Form/Input";
import Button from "../Form/Button";

function LearnMorePage() {
  return (
    <Page title="Learn More">
      <h1>
        <span role="img" aria-label="Email">
          ✉️
        </span>{" "}
        Get the news quickly.
      </h1>
      <p>When the service starts, get a reminder.</p>
      <div style={{ display: "flex" }}>
        <Input
          type="email"
          placeholder="example@example.com"
          style={{ flex: 2 }}
        />
        <Button fullWidth style={{ flex: 1 }}>
          Get News
        </Button>
      </div>
    </Page>
  );
}

export default LearnMorePage;
