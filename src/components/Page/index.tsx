import React from "react";
import Helmet from "react-helmet";
import Layout from "../Layout";

type PageProps = {
  title?: string;
  noLayout?: boolean;
  children: React.ReactNode;
};

function Page({ title, children, noLayout }: PageProps) {
  const LayoutOrFragment = noLayout ? React.Fragment : Layout;
  return (
    <LayoutOrFragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title ? title + " - Space" : "Space"}</title>
      </Helmet>
      {children}
    </LayoutOrFragment>
  );
}

export default Page;
