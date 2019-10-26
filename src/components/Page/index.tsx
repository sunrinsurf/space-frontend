import React from "react";
import Helmet from "react-helmet";
import Layout from "../Layout";

type PageProps = {
  title?: string;
  noLayout?: boolean;
  central?: boolean;
  children: React.ReactNode;
};

function Page({ title, children, central, noLayout }: PageProps) {
  const LayoutOrFragment = noLayout ? React.Fragment : Layout;
  return (
    <LayoutOrFragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title ? title + " - Space" : "Space"}</title>
      </Helmet>
      {central
        ? (
          <div style={{ display: 'flex', minHeight: '70vh', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              {children}
            </div>
          </div>
        )
        : (
          <div style={{ minHeight: '70vh' }}>
            {children}
          </div>
        )}
    </LayoutOrFragment>
  );
}

export default Page;
