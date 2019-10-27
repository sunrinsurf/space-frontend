import React from "react";
import "./SignLayout.css";
import logo from '../../assets/logo.svg'

interface SignLayoutProps {
  children: React.ReactNode;
}
function SignLayout({ children }: SignLayoutProps) {
  return (
    <div className="SignLayout__wrap">
      <header className="SignLayout__header">
        <img src={logo} alt="logo" height="30" />
      </header>
      <main className="SignLayout__main">{children}</main>
    </div>
  );
}

export default SignLayout;
