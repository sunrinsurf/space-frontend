import React from "react";
import "./index.css";
type LayoutProps = {
  children?: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className="Layout__wrap">
      <header style={{ padding: '1em' }}>
        <h1>
          <span role="img" aria-label="rocket">🚀</span>
          Space
        </h1>
      </header>
      <main className="Layout__contents">{children}</main>
    </div>
  );
}

export default Layout;
