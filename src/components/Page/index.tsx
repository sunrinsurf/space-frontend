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
        <link rel="icon" href="/favicon2x.png" />
        <meta name="description" content="소유의 경계를 허물다, 스페이스" />
        <link rel="apple-touch-icon" href="/favicon2x.png" />
        <title>{title ? title + " - 스페이스" : "스페이스"}</title>
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
