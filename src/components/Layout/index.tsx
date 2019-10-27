import React from "react";
import { useHistory } from 'react-router-dom';
import "./index.css";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.svg'
type LayoutProps = {
  children?: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  const history = useHistory();

  function goToMain() {
    history.push('/');
  }
  return (
    <div className="Layout__wrap">
      <header className="Layout__header">
        <div className="Layout__brand" role="button" onClick={goToMain}>
          <img src={logo} alt="logo" height="30" />
        </div>
        <div className="Layout__navContents">
          <Link to="signin">로그인</Link><span> | </span><Link to="signup">회원가입</Link>
        </div>
      </header>
      <main className="Layout__contents">{children}</main>
      <footer className="Layout__footer">
        Team Surf @ 2019
      </footer>
    </div>
  );
}

export default Layout;
