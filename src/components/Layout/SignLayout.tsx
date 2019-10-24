import React from "react";
import "./SignLayout.css";

interface SignLayoutProps {
  children: React.ReactNode;
}
function SignLayout({ children }: SignLayoutProps) {
  return (
    <div className="SignLayout__wrap">
      <header className="SignLayout__header">
        <h1>
          <span role="img" aria-label="rocket">
            🚀
          </span>{" "}
          Space
        </h1>
      </header>
      <main className="SignLayout__main">{children}</main>
    </div>
  );
}

export default SignLayout;
