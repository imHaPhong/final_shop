import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "rsuite";
import useOutsideClick from "../utilities/custom-hooks/outSideClick";
import {
  userLogout,
  getListRestaurant,
  getAllRestaurant,
} from "../middlerware/userMiddlerware";
import { useMediaQuery } from "../utilities/custom-hooks/useMediaQuery";

const Header = ({
  user,
  auth,
  userLogout,
  getListRestaurant,
  getAllRestaurant,
  getFixed,
}) => {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isOut, setIsOut] = useState(false);

  const isMoblie = useMediaQuery("(max-width: 992px)");

  const ref = useRef();
  const navRef = useRef();

  // const navRefCb = useCallback((node) => {
  //   if (navRef.current) navRef.current.disconnect();
  //   navRef.current = new IntersectionObserver(async (entries) => {
  //     if (entries[0].isIntersecting) {
  //       console.log("alo");
  //     }
  //   });
  //   if (node) navRef.current.observe(node);
  // });

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > window.innerHeight / 2) {
      setIsOut(true);
    } else {
      setIsOut(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
  });

  useEffect(() => {
    getListRestaurant(inputValue);
    return () => {
      console.log(inputValue);
      // if (inputValue === "") {
      //   console.log(inputValue);
      //   console.log("vaod ay");
      // }
    };
  }, [getListRestaurant, inputValue]);

  useOutsideClick(ref, () => {
    if (show) setShow(false);
  });

  return (
    <div>
      {!isMoblie && (
        <nav className={`${isOut ? `getFixed` : ``}`}>
          <div className={`nav-container `}>
            <div className="nav-right">
              <span>Logo</span>
              <ul>
                <li>
                  <Link to="/user">my post</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="/user/listRestaurant">List restaurant</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="/user/oder">Oder now</Link>{" "}
                </li>
                <li>
                  <Link to="/user/mypost">my post</Link>{" "}
                </li>
              </ul>
            </div>
            <div className="nav-left">
              <div className="search-box">
                <Icon icon="search" />
                <input
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                  type="text"
                  placeholder="Search"
                />
              </div>
              {auth.loading && <div>Loading</div>}
              {auth.auth && !auth.loading && (
                <div className="user-container">
                  <img src={user.uAvatar} alt="user avatar" />
                  <span style={{ display: "inline-block" }}>
                    {user.username}
                  </span>
                  {show ? (
                    <Icon
                      icon="chevron-up"
                      onClick={() => {
                        console.log("oke");
                        setShow(true);
                      }}
                    />
                  ) : (
                    <Icon
                      icon="chevron-down"
                      onClick={() => {
                        console.log("oke");
                        setShow(true);
                      }}
                    />
                  )}

                  <span
                    className={`userMenu ${show ? "menuShow" : ""}`}
                    ref={ref}
                  >
                    <ul>
                      <li
                        onClick={() => {
                          localStorage.removeItem("auth_token");
                          userLogout();

                          window.location.href = "/user";
                        }}
                      >
                        Log out
                      </li>
                    </ul>
                  </span>
                </div>
              )}
              <ul>
                {user.username && (
                  <li>
                    <Icon icon="bell-o" />
                  </li>
                )}
                <li>
                  <Icon icon="shopping-cart" />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
      {isMoblie && (
        <nav className={`m-nav-header ${isOut ? `getFixed` : ``}`} ref={navRef}>
          <div className="m-nav-header-top">
            <span className="m-logo">Logo</span>
            <span>
              <Icon icon="search" />
              <img src={user.uAvatar} alt="" />
            </span>
          </div>
          <div className="m-nav-header-bottom">
            <div>
              {" "}
              <Link to="/user">
                <Icon icon="newspaper-o" />{" "}
              </Link>
            </div>
            <div>
              {" "}
              <Link to="/user/listRestaurant">
                <Icon icon="cutlery" />{" "}
              </Link>{" "}
            </div>
            <div>
              {" "}
              <Link to="/user/oder">
                <Icon icon="truck" />{" "}
              </Link>{" "}
            </div>
            <div>
              {" "}
              <Link to="/user">
                <Icon icon="bars" />{" "}
              </Link>{" "}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  userLogout,
  getListRestaurant,
  getAllRestaurant,
})(Header);
