/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { SideNavConst } from "@/constant/sideNavbarConst";
import { useRouter } from "next/router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { useState } from "react";
export const SideBarNav = ({ openSideNavBar, handleOpenSideNavBar }) => {
  const router = useRouter();
  const [sideBarToggle, setSideBarToggle] = useState([]);
  const [activeSubRoutes, setActiveSubRoutes] = useState([]);
  const [activeIndex, setActiveIndex] = useState("");

  const handleSideBarToggle = (index) => {
    const updatedToggleState = [...sideBarToggle];
    updatedToggleState[index] = !updatedToggleState[index];
    setSideBarToggle(updatedToggleState);
  };

  const handleNavigateSubRoutes = (index, url) => {
    setActiveSubRoutes(url);
    setActiveIndex(index);
    router.push(url);
  };

  return (
    <div
      className={
        openSideNavBar
          ? "g-sidenav-show g-sidenav-pinned d-xl-none"
          : "g-sidenav-show"
      }
    >
      <aside
        className={
          openSideNavBar
            ? "sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 ps--active-y bg-white"
            : "sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 z-index-0"
        }
        id="sidenav-main"
      >
        <div className="sidenav-header">
          {openSideNavBar && (
            <i
              className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-xl-none"
              onClick={() => handleOpenSideNavBar()}
            ></i>
          )}
          <a className="navbar-brand m-0" href="/">
            <img
              src="../../../assets/img/logos/modenteologo.png"
              className="navbar-brand-img h-100"
              alt="main_logo"
            />
          </a>
        </div>
        <hr className="horizontal dark mt-0" />
        <div
          className="collapse navbar-collapse  w-auto  max-height-vh-100 h-100"
          id="sidenav-collapse-main"
        >
          {SideNavConst?.routes?.map((i, index) => (
            <ul className="navbar-nav" key={index}>
              <>
                <li className="nav-item cursor-pointer">
                  <a
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 5,
                    }}
                    className={
                      i?.url === router?.asPath
                        ? "active  nav-link"
                        : activeIndex === index &&
                          activeSubRoutes === router?.asPath
                        ? "active  nav-link"
                        : "nav-link"
                    }
                    onClick={() =>
                      i?.subRoutes
                        ? handleSideBarToggle(index)
                        : router.push(i?.url)
                    }
                  >
                    <div
                      className="d-flex align-items-center"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div
                        className={
                          i?.url === router?.asPath
                            ? "icon icon-shape sideNav_active icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"
                            : "icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"
                        }
                      >
                        <span
                          style={{
                            color:
                              i?.url === router?.asPath
                                ? "#fff"
                                : activeIndex === index &&
                                  activeSubRoutes === router?.asPath
                                ? "#fff"
                                : "#344767",
                          }}
                        >
                          {i?.icon}
                        </span>
                      </div>
                      <span className="nav-link-text font-weight-bolder">
                        {i?.heading}
                      </span>
                    </div>
                    {i?.subRoutes && (
                      <div className="sideNav_subIcon">
                        {sideBarToggle[index] ? (
                          <ExpandMoreIcon sx={{ fontSize: 18 }} />
                        ) : (
                          <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
                        )}
                      </div>
                    )}
                  </a>
                </li>
                {sideBarToggle[index] &&
                  i?.subRoutes &&
                  i?.subRoutes?.map((subRoute, subIndex) => (
                    <li className="nav-item mt-3" key={subIndex}>
                      <h6
                        className={
                          i?.subRoutes && subRoute?.url === router.asPath
                            ? "ps-4 ms-2 sideNav_subactive text-xs font-weight-bolder opacity-6 cursor-pointer"
                            : "ps-4 ms-2  text-xs font-weight-bolder opacity-6 cursor-pointer"
                        }
                        onClick={() =>
                          i?.subRoutes &&
                          handleNavigateSubRoutes(index, subRoute.url)
                        }
                      >
                        {subRoute?.name}
                      </h6>
                    </li>
                  ))}
              </>
            </ul>
          ))}
        </div>
        {/* <div className="sidenav-footer mx-3 ">
          <div
            className="card card-background shadow-none card-background-mask-secondary"
            id="sidenavCard"
          >
            <div
              className="full-background"
              style={{
                backgroundImage:
                  "url('../assets/img/curved-images/white-curved.jpeg')",
              }}
            ></div>
            <div className="card-body text-start p-3 w-100">
              <div className="icon icon-shape icon-sm bg-white shadow text-center mb-3 d-flex align-items-center justify-content-center border-radius-md">
                <i
                  className="ni ni-diamond text-dark text-gradient text-lg top-0"
                  aria-hidden="true"
                  id="sidenavCardIcon"
                ></i>
              </div>
              <div className="docs-info">
                <h6 className="text-white up mb-0">Need help?</h6>
                <p className="text-xs font-weight-bold">
                  Please check our docs
                </p>
                <a
                  href="https://www.creative-tim.com/learning-lab/bootstrap/license/soft-ui-dashboard"
                  target="_blank"
                  className="btn btn-white btn-sm w-100 mb-0"
                >
                  Documentation
                </a>
              </div>
            </div>
          </div>
          <a
            className="btn bg-gradient-primary mt-4 w-100"
            href="https://www.creative-tim.com/product/soft-ui-dashboard-pro?ref=sidebarfree"
            type="button"
          >
            Upgrade to pro
          </a>
        </div> */}
      </aside>
    </div>
  );
};
