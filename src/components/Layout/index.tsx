import React from "react";
import { useHistory } from "react-router-dom";
import "./index.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import useLogin from "../../lib/useLogin";
import Favicon from "./Favicon";
type LayoutProps = {
  children?: React.ReactNode;
  noPadding?: boolean;
  navFixed?: boolean;
};

function Layout({ children, noPadding, navFixed }: LayoutProps) {
  const history = useHistory();
  const logined = useLogin();

  function goToMain() {
    history.push("/");
  }
  return (
    <div className="Layout__wrap">
      <header
        className={["Layout__header", navFixed && "navFixed"]
          .filter(Boolean)
          .join(" ")}
      >
        <nav className="Layout__nav">
          <div className="Layout__brand" role="button" onClick={goToMain}>
            <Favicon white height="40" />
            <img src={logo} alt="logo" height="30" />
          </div>
          <div className="Layout__navContents">
            {!logined ? (
              <>
                <Link to="signin">Sign In</Link>
                <span> | </span>
                <Link to="signup">Sign Up</Link>
              </>
            ) : (
              <Link to="/info">My Page</Link>
            )}
          </div>
        </nav>
      </header>
      <main
        className={["Layout__contents", noPadding && "noPadding"]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </main>
      <footer className="Layout__footer">
        Team Surf @ 2019 | <Link to="/policy">이용약관</Link> |{" "}
        <Link to="/privacy">개인정보취급방침</Link>
      </footer>
    </div>
  );
}

export default Layout;
