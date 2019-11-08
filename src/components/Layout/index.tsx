import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./index.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-white.svg";
import logoColorful from "../../assets/logo.svg";
import useLogin from "../../lib/useLogin";
import Favicon from "./Favicon";
import getClassHandler from "../../lib/getClassHandler";
import LogoutMenu from "./LogoutMenu";

const cls = getClassHandler("Layout");
export type LayoutProps = {
  children?: React.ReactNode;
  noPadding?: boolean;
  navFixed?: boolean;
  colorfulLogo?: boolean;
  noFooter?: boolean;
  hideMenu?: boolean;
  noScrolling?: boolean;
  whiteColor?: boolean;
  bgctransparent?: boolean; // 배경을 투명하게 만들어줌
};

function Layout({
  children,
  noPadding,
  navFixed,
  colorfulLogo,
  noFooter,
  hideMenu,
  noScrolling,
  whiteColor,
  bgctransparent
}: LayoutProps) {
  const history = useHistory();
  const logined = useLogin();
  const [transparent, setTransparent] = useState(navFixed || false);

  function goToMain() {
    history.push("/");
  }
  useEffect(() => {
    if (noScrolling) {
      return;
    }
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
  }, [navFixed, noScrolling]);
  return (
    <div className={cls("wrap")}>
      <header
        className={[
          cls("header"),
          navFixed && "navFixed",
          transparent && "transparent",
          colorfulLogo && "colorful",
          whiteColor && "whiteColor",
          bgctransparent && "bgctransparent"
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <nav className={cls("nav")}>
          <div className={cls("brand")} role="button" onClick={goToMain}>
            <Favicon white={!colorfulLogo} className="favicon" />
            <img
              src={colorfulLogo ? logoColorful : logo}
              alt="logo"
              className="logo"
            />
          </div>
          {!hideMenu && (
            <div className={cls("navContents")}>
              {!logined ? (
                <>
                  <Link to="/signin">Sign In</Link>
                  <span> | </span>
                  <Link to="/signup">Sign Up</Link>
                </>
              ) : (
                  <>
                    <Link to="/info">My Page</Link>
                    <span> | </span>
                    <LogoutMenu />
                  </>
                )}
            </div>
          )}
        </nav>
      </header>
      <main
        className={[cls("contents"), noPadding && "noPadding"]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </main>
      {!noFooter && (
        <footer className={cls("footer")}>
          Team Surf @ 2019 | <Link to="/policy">이용약관</Link> |{" "}
          <Link to="/privacy">개인정보취급방침</Link>
        </footer>
      )}
    </div>
  );
}

export default Layout;
