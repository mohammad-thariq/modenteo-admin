/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { localStorageConst } from "@/constant/localStorage";
import { LocalStorageHelper } from "@/utils/localStorage";
import { router } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useEffect, useState } from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { SideBarNav } from "../SideBar";
import { Reload } from "@/helper/base";
import InventoryIcon from '@mui/icons-material/Inventory';

export const Breadcrumb = ({ currentPage, serachEnable }) => {
  const [userData, setUserData] = useState();
  const [openSideNavBar, setOpenSideNavBar] = useState(false);

  useEffect(() => {
    if (LocalStorageHelper?.getItem(localStorageConst.USER)) {
      setUserData(LocalStorageHelper?.getItem(localStorageConst.USER));
    }
  }, []);

  function logOut() {
    LocalStorageHelper?.removeItem(localStorageConst.JWTADMIN);
    LocalStorageHelper?.removeItem(localStorageConst.USER);
    LocalStorageHelper?.removeItem(localStorageConst.EXPIREIN);
    LocalStorageHelper?.removeItem(localStorageConst.REMEMBER);
    Reload();
  }

  const handleOpenSideNavBar = () => {
    setOpenSideNavBar(!openSideNavBar);
  };

  return (
    <>
      <nav
        className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
        id="navbarBlur"
        navbar-scroll="true"
      >
        <div className="container-fluid py-1 px-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
              <li className="breadcrumb-item text-sm">
                <a className="opacity-5 text-dark" href="/">
                  Pages
                </a>
              </li>
              <li
                className="breadcrumb-item text-sm text-dark active"
                aria-current="page"
              >
                {currentPage}
              </li>
            </ol>
            <h6 className="font-weight-bolder mb-0">{currentPage}</h6>
          </nav>
          <div
            className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
            id="navbar"
          >
            <div className="ms-md-auto pe-md-3 d-flex align-items-center">
              {serachEnable && (
                <div className="input-group">
                  <span className="input-group-text text-body">
                    <i className="fas fa-search" aria-hidden="true"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type here..."
                  />
                </div>
              )}
            </div>

            <ul className="navbar-nav flex-direction-row justify-content-end">
              <div className="dropdown">
                <button className="dropbtn">
                  <a
                    style={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                    }}
                    className="nav-link text-body font-weight-bold px-0"
                  >
                    {userData && userData?.avatar ? (
                      <img
                        src={"../assets/img/team-2.jpg"}
                        alt=""
                        style={{ borderRadius: 50 }}
                        width={30}
                        height={30}
                      />
                    ) : (
                      <i className="fa fa-user me-sm-1"></i>
                    )}
                    <span className="d-sm-inline d-none">{userData?.name}</span>
                  </a>
                </button>
                <div className="dropdown-content">
                  <a onClick={() => router.push("/admin/profile")}>
                    <i className="fa fa-user me-sm-1"></i> Profile
                  </a>
                  <a onClick={() => router.push("/admin/admin")}>
                    <AdminPanelSettingsIcon sx={{ fontSize: "20px" }} /> Admin
                    List
                  </a>
                  <a>
                    <button className="logout-btn" onClick={logOut}>
                      <LogoutIcon sx={{ color: "red", fontSize: "18px" }} /> Log
                      Out
                    </button>
                  </a>
                </div>
              </div>
              <li className="nav-item d-flex align-items-center"></li>
              {/* burger meny */}
              <li className="nav-item d-xl-none ps-3 d-flex align-items-center cursor-pointer">
                <a
                  onClick={() => handleOpenSideNavBar()}
                  className="nav-link text-body p-0"
                  id="iconNavbarSidenav"
                >
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line"></i>
                    <i className="sidenav-toggler-line"></i>
                    <i className="sidenav-toggler-line"></i>
                  </div>
                </a>
              </li>
              <li className="nav-item px-3 d-flex align-items-center">
                <a className="nav-link text-body p-0">
                  <i 
                  title="Settings"
                    className="fa fa-cog fixed-plugin-button-nav cursor-pointer"
                    onClick={() => router.push("/admin/setting")}
                  ></i>
                </a>
              </li>
              <li className="nav-item dropdown pe-2 d-flex align-items-center">
                <a
                  className="nav-link text-body p-0 cursor-pointer"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <InventoryIcon titleAccess="Inventory" sx={{ fontSize: "18px" }} onClick={()=> router.push("/admin/inventory")}/>
                </a>
                <ul
                  className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li className="mb-2">
                    <a className="dropdown-item border-radius-md">
                      <div className="d-flex py-1">
                        <div className="my-auto">
                          <img
                            src="../assets/img/team-2.jpg"
                            className="avatar avatar-sm  me-3 "
                            alt=""
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="text-sm font-weight-normal mb-1">
                            <span className="font-weight-bold">
                              New message
                            </span>{" "}
                            from Laur
                          </h6>
                          <p className="text-xs text-secondary mb-0">
                            <i className="fa fa-clock me-1"></i>
                            13 minutes ago
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="mb-2">
                    <a className="dropdown-item border-radius-md">
                      <div className="d-flex py-1">
                        <div className="my-auto">
                          <img
                            src="../assets/img/small-logos/logo-spotify.svg"
                            className="avatar avatar-sm bg-gradient-dark  me-3 "
                            alt=""
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="text-sm font-weight-normal mb-1">
                            <span className="font-weight-bold">New album</span>{" "}
                            by Travis Scott
                          </h6>
                          <p className="text-xs text-secondary mb-0">
                            <i className="fa fa-clock me-1"></i>1 day
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item border-radius-md">
                      <div className="d-flex py-1">
                        <div className="avatar avatar-sm bg-gradient-secondary  me-3  my-auto"></div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="text-sm font-weight-normal mb-1">
                            Payment successfully completed
                          </h6>
                          <p className="text-xs text-secondary mb-0">
                            <i className="fa fa-clock me-1"></i>2 days
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {openSideNavBar && (
        <SideBarNav
          openSideNavBar={openSideNavBar}
          handleOpenSideNavBar={handleOpenSideNavBar}
        />
      )}
    </>
  );
};
