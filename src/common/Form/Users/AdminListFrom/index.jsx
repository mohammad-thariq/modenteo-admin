import { Button } from "@/common/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import style from "./index.module.css";
import { validateUserTypeEnum } from "@/constant/enum/users.enum";

export const AdminListForm = ({
  onClose,
  button,
  data,
  onSave,
  onUpdate,
  loading,
  currentCustomerId,
}) => {
  const schema = Yup.object({
    first_name: Yup.string().required("field is required"),
    last_name: Yup.string().required("field is required"),
    email: Yup.string().required("Eamil is required"),
    password: Yup.string().required("Password is required"),
    cnfrmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          first_name: data?.first_name || "",
          last_name: data?.last_name || "",
          email: data?.email || "",
          password: "",
          cnfrmpassword: "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate
            ? onUpdate({
                id: currentCustomerId,
                first_name: values?.first_name,
                last_name: values?.last_name,
                email: values?.email,
                password: values?.password,
                type: validateUserTypeEnum.ADMIN,
              })
            : onSave({
                first_name: values?.first_name,
                last_name: values?.last_name,
                email: values?.email,
                password: values?.password,
                type: validateUserTypeEnum.ADMIN,
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
        }) => (
          <form>
            <div className="flex gap-3">
              <div>
                <label>First Name</label>
                <div className="mb-2">
                  <input
                    type="text"
                    name="first_name"
                    className="form-control"
                    placeholder="First Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.first_name}
                  />
                  <p
                    style={{
                      marginTop: "5px",
                      marginBottom: "5px",
                      color: "red",
                    }}
                  >
                    {errors.first_name &&
                      touched.first_name &&
                      errors.first_name}
                  </p>
                </div>
              </div>
              <div>
                <label>Last Name</label>
                <div className="mb-2">
                  <input
                    type="text"
                    name="last_name"
                    className="form-control"
                    placeholder="Last Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.last_name}
                  />
                  <p
                    style={{
                      marginTop: "5px",
                      marginBottom: "5px",
                      color: "red",
                    }}
                  >
                    {errors.last_name && touched.last_name && errors.last_name}
                  </p>
                </div>
              </div>
            </div>
            <label>Email</label>
            <div className="mb-2">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.email && touched.email && errors.email}
              </p>
            </div>
            <label>Password</label>
            <div className="mb-2">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <p
                style={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  color: "red",
                }}
              >
                {errors.password && touched.password && errors.password}
              </p>
            </div>
            <label>Confirm Password</label>
            <div className="mb-2">
              <input
                type="password"
                name="cnfrmpassword"
                className="form-control"
                placeholder="Confirm Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cnfrmpassword}
              />
              <p
                style={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  color: "red",
                }}
              >
                {errors.cnfrmpassword &&
                  touched.cnfrmpassword &&
                  errors.cnfrmpassword}
              </p>
            </div>
            <div className={style.btnWrapper}>
              <Button
                name="Close"
                border="1px solid #dc395f"
                color="#000"
                onClick={onClose}
              />
              <Button
                name={button}
                bg="#dc395f"
                type="submit"
                color="#fff"
                onClick={handleSubmit}
                isSubmitting={loading}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
