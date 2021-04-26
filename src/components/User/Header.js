import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Icon } from "rsuite";
import useOutsideClick from "../../utilities/custom-hooks/outSideClick";
import {
  userLogout,
  getListRestaurant,
  getAllRestaurant,
} from "../../middlerware/userMiddlerware";
import { useMediaQuery } from "../../utilities/custom-hooks/useMediaQuery";

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
  let history = useHistory();

  const userSearch = (e) => {
    if(e.keyCode === 13) {
      history.push(`/search/foody/?q=${inputValue}`)


    }
  }

  return (
    <div>
      {!isMoblie && (
        <nav className={`${isOut ? `getFixed` : ``}`}>
          <div className={`nav-container `}>
            <div className="nav-right">
              <span>myFood</span>
              <ul>
                <li>
                  <Link to="/user">Home</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="/user/listRestaurant">List restaurant</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="/user/page">Voucher</Link>{" "}
                </li>
                {auth.uId !== "" && (
                  <li>
                    {" "}
                    <Link to="/user/nearme">Near me</Link>{" "}
                  </li>
                )}
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
                  onKeyDown={userSearch}
                />
              </div>
              {auth.loading && <div>Loading</div>}
              {auth.auth && !auth.loading && (
                <div className="user-container">
                  <Link to="/user/setting">
                  <img  src={user.uAvatar} alt="user avatar" />

                  </Link>
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
                      <li>
                        <Link to="/user/setting">Setting</Link>
                      </li>
                      <li
                        onClick={() => {
                          localStorage.removeItem("auth_token");
                          localStorage.removeItem("UserInfo");
                          userLogout();

                          window.location.href = "/user";
                        }}
                      >
                        Log out
                      </li>
                      <li
                        onClick={() => {
                          localStorage.removeItem("auth_token");
                          localStorage.removeItem("UserInfo");
                          userLogout();

                          window.location.href = "/user";
                        }}
                      ></li>
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
                {auth.uId !== "" && (
                  <li >
                    {" "}
                    <Link to="/user/oder" style={{color:"white"}}>                  <Icon icon="shopping-cart" />
</Link>{" "}
                  </li>
                )}
                <li>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
      {isMoblie && (
        <nav className={`m-nav-header ${isOut ? `getFixed` : ``}`} ref={navRef}>
          <div className="m-nav-header-top">
            <span className="m-logo">myFood</span>
            <span>
              <Icon icon="search" />
              {auth.auth && <Link to="/user/setting"><img src={user.uAvatar} alt="" /></Link>}
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
              <Link to="/user/setting">
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
