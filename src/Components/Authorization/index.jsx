/* eslint-disable @next/next/no-img-element */
import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { handleLogin } from "./hooks/login";
import { Button } from "@/common/Button";

export const Authorization = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const schema = Yup.object({
    email: Yup.string()
      .email("Please Enter valid email")
      .required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <main className="main-content  mt-0">
      <section>
        <div className="page-header min-vh-75">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                <div className="card card-plain mt-8">
                  <div className="card-header pb-0 text-left bg-transparent">
                    <h3 className="font-weight-bolder text-info text-gradient">
                      Welcome back
                      <br />
                      <img
                        className="authLogo"
                        src="../../../assets/img/logos/modenteologo.png"
                        alt=""
                      />
                    </h3>
                    <p className="mb-0">
                      Enter your email and password to sign in
                    </p>
                  </div>
                  <div className="card-body">
                    <Formik
                      initialValues={{ email: "", password: "" }}
                      validationSchema={schema}
                      onSubmit={(values, actions) => {
                        handleLogin({
                          email: values.email,
                          password: values.password,
                          // rememberMe: rememberMe,
                        });
                        actions.setSubmitting(true);
                      }}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                      }) => (
                        <form onSubmit={handleSubmit}>
                          <label>Email</label>
                          <div className="mb-3">
                            <input
                              type="email"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              className="form-control"
                              placeholder="Email"
                            />
                            <p style={{ marginTop: "5px", color: "red" }}>
                              {errors.email && touched.email && errors.email}
                            </p>
                          </div>
                          <label>Password</label>
                          <div className="mb-3">
                            <input
                              type="password"
                              name="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                              className="form-control"
                              placeholder="Password"
                            />
                            <p style={{ marginTop: "5px", color: "red" }}>
                              {" "}
                              {errors.password &&
                                touched.password &&
                                errors.password}
                            </p>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              onChange={handleRememberMe}
                              className="form-check-input"
                              type="checkbox"
                              checked={rememberMe}
                            />
                            <label className="form-check-label">
                              Remember me
                            </label>
                          </div>
                          <Button
                            isSubmitting={isSubmitting}
                            name="Sign In"
                            bg="#dc395f"
                            color="#fff"
                            type="submit"
                          />
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                  <div
                    className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                    style={{
                      width: "85%",
                      backgroundImage:
                        "url('../assets/img/curved-images/singin.png')",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
