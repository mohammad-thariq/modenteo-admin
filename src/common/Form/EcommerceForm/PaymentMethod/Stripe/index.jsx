import { Button } from "@/common/Button";
import style from "../../index.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import { statusConstantOption } from "@/constant/statusConst";
import { InputSelect } from "@/common/Form/common/inputSelect";
import { useEffect, useState } from "react";

export const StripeForm = ({
  onClose,
  data,
  onUpdate,
  getCountries,
  getCurrency,
  loading,
  button,
  formName,
}) => {
  const schema = Yup.object({
    country_name: Yup.string().required("Country Name is Required"),
    currency_name: Yup.string().required("Currency Name is Required"),
    currency_rate: Yup.string().required("Currency Rate is Required"),
    stripe_key: Yup.string().required("Stripe Key is Required"),
    stripe_secret: Yup.string().required("Stripe Secret is Required"),
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

  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          status: updateStatus,
          stripe_key: data?.stripe_key || "",
          stripe_secret: data?.stripe_secret || "",
          country_name: data?.country_code || "",
          currency_name: data?.currency_code || "", // 1 is %, 2 is Rs
          currency_rate: data?.currency_rate || "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate({
            status: updateStatus === false ? 0 : 1,
            stripe_key: values.stripe_key,
            stripe_secret: values.stripe_secret,
            country_name: values.country_name,
            currency_name: values.currency_name, // 1 is %, 2 is Rs
            currency_rate: values.currency_rate,
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
            <form
              role="form"
              className="formInner overflow-column height-400 w-350"
            >
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
              <InputSelect
                label="Country Name"
                onBlur={handleBlur}
                onChange={handleChange}
                name="country_name"
                values={values?.country_name}
                isCode
                onData={getCountries}
              />

              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.country_name &&
                  touched.country_name &&
                  errors.country_name}
              </p>
              <InputSelect
                label="Currency Name"
                onBlur={handleBlur}
                onChange={handleChange}
                name="currency_name"
                values={values?.currency_name}
                isCode
                onData={getCurrency}
              />

              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.currency_name &&
                  touched.currency_name &&
                  errors.currency_name}
              </p>
              <label>Currency rate ( per INR)</label>
              <div className="mb-3">
                <input
                  type="text"
                  name="currency_rate"
                  className="form-control"
                  placeholder="Currency rate ( per INR)"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.currency_rate}
                />
                <p
                  style={{
                    marginTop: "5px",
                    marginBottom: "5px",
                    color: "red",
                  }}
                >
                  {errors.currency_rate &&
                    touched.currency_rate &&
                    errors.currency_rate}
                </p>
              </div>
              <label>Stripe Key</label>
              <div className="mb-3">
                <input
                  type="text"
                  name="stripe_key"
                  className="form-control"
                  placeholder="Stripe Key"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.stripe_key}
                />
                <p
                  style={{
                    marginTop: "5px",
                    marginBottom: "5px",
                    color: "red",
                  }}
                >
                  {errors.stripe_key && touched.stripe_key && errors.stripe_key}
                </p>
              </div>
              <label>Stripe Secret</label>
              <div className="mb-3">
                <input
                  type="text"
                  name="stripe_secret"
                  className="form-control"
                  placeholder="Stripe Secret"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.stripe_secret}
                />
                <p
                  style={{
                    marginTop: "5px",
                    marginBottom: "5px",
                    color: "red",
                  }}
                >
                  {errors.stripe_secret &&
                    touched.stripe_secret &&
                    errors.stripe_secret}
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
