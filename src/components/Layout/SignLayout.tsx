import React from "react";
import "./SignLayout.css";
import Page from "./index"
interface SignLayoutProps {
  children: React.ReactNode;
}
function SignLayout({ children }: SignLayoutProps) {
  return (
    <Page navFixed colorfulLogo noFooter noPadding hideMenu noScrolling whiteColor>
      <div className="SignLayout__wrap">
        <main className="SignLayout__main">{children}</main>
      </div>
    </Page>
  );
}

export default SignLayout;
