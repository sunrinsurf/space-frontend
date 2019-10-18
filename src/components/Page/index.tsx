import React from "react";
import Helmet from "react-helmet";

type PageProps = {
  title?: string;
  children: React.ReactNode;
};

function Page({ title, children }: PageProps) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title ? title + " - Space" : "Space"}</title>
      </Helmet>
      {children}
    </>
  );
}

export default Page;
