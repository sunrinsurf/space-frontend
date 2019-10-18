import React from "react";
import "./index.css";
type LayoutProps = {
  children?: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className="Layout__wrap">
      <main className="Layout__contents">{children}</main>
    </div>
  );
}

export default Layout;
