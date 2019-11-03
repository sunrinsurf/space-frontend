import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./index.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-white.svg";
import logoColorful from "../../assets/logo.svg";
import useLogin from "../../lib/useLogin";
import Favicon from "./Favicon";
export type LayoutProps = {
  children?: React.ReactNode;
  noPadding?: boolean;
  navFixed?: boolean;
  colorfulLogo?: boolean;
  noFooter?: boolean;
  hideMenu?: boolean;
};

function Layout({
  children,
  noPadding,
  navFixed,
  colorfulLogo,
  noFooter,
  hideMenu
}: LayoutProps) {
  const history = useHistory();
  const logined = useLogin();
  const [transparent, setTransparent] = useState(navFixed || false);

  function goToMain() {
    history.push("/");
  }
  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      if (y <= 0 && navFixed) {
        setTransparent(true);
      } else {
        setTransparent(false);
      }
    };
    window && window.addEventListener("scroll", handler);

    return () => {
      window && window.removeEventListener("scroll", handler);
    };
  }, [navFixed]);
  return (
    <div className="Layout__wrap">
      <header
        className={[
          "Layout__header",
          navFixed && "navFixed",
          transparent && "transparent",
          colorfulLogo && "colorful"
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <nav className="Layout__nav">
          <div className="Layout__brand" role="button" onClick={goToMain}>
            <Favicon white={!colorfulLogo} height="40" />
            <img
              src={colorfulLogo ? logoColorful : logo}
              alt="logo"
              height="30"
            />
          </div>
          {!hideMenu && (
            <div className="Layout__navContents">
              {!logined ? (
                <>
                  <Link to="/signin">Sign In</Link>
                  <span> | </span>
                  <Link to="/signup">Sign Up</Link>
                </>
              ) : (
                <Link to="/info">My Page</Link>
              )}
            </div>
          )}
        </nav>
      </header>
      <main
        className={["Layout__contents", noPadding && "noPadding"]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </main>
      {!noFooter && (
        <footer className="Layout__footer">
          Team Surf @ 2019 | <Link to="/policy">이용약관</Link> |{" "}
          <Link to="/privacy">개인정보취급방침</Link>
        </footer>
      )}
    </div>
  );
}

export default Layout;
