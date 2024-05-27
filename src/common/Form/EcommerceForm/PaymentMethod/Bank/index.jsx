import { Button } from "@/common/Button";
import style from "../../index.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import { useEffect, useState } from "react";

export const BankForm = ({
  onClose,
  data,
  onUpdate,
  loading,
  button,
  formName,
}) => {
  const schema = Yup.object({
    account_info: Yup.string().required("Account Info is Required"),
    status: Yup.string().required("Status is Required"),
  });
  const [updateStatus, setUpdateStatus] = useState(false);

  const handleUpdateStatus = () => {
    setUpdateStatus(!updateStatus);
  };

  useEffect(() => {
    if (data) {
      setUpdateStatus(data?.status === 0 ? false : true);
    }
  }, [data, data?.status]);

  console.log(data, "data");
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          status: updateStatus,
          account_info: data?.account_info || "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate({
            status: updateStatus === false ? 0 : 1,
            account_info: values?.account_info,
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
          <>
            <label className="font-20">{formName}</label>
            <form role="form" className="w-350">
              <div className="flex flex-column">
                <label>Status</label>
                <div className="mb-2 switchToggle" onClick={handleUpdateStatus}>
                  <input
                    className="toggleInput"
                    type="checkbox"
                    checked={updateStatus}
                  />
                  <span className="sliderToggle roundToggle"></span>
                </div>
              </div>

              <label>Account Information</label>
              <div className="mb-3">
                <textarea
                  rows="4"
                  cols="50"
                  name="account_info"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.account_info}
                />
                <p
                  style={{
                    marginTop: "5px",
                    marginBottom: "5px",
                    color: "red",
                  }}
                >
                  {errors.account_info &&
                    touched.account_info &&
                    errors.account_info}
                </p>
              </div>
              <div className={style.btnWrapper}>
                <Button
                  name="Close"
                  border="1px solid #dc395f"
                  color="#000"
                  onClick={() => onClose()}
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
          </>
        )}
      </Formik>
    </div>
  );
};
