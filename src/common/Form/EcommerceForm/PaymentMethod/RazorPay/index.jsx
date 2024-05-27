import { Button } from "@/common/Button";
import style from "../../index.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import { InputSelect } from "@/common/Form/common/inputSelect";
import { useEffect, useState } from "react";
import { InputFileUpload } from "@/common/Form/common/inputFileUpload";
import { FilePreviewChange } from "@/utils/filePreviewChange";

export const RazorPayForm = ({
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
    name: Yup.string().required("Name is Required"),
    country_name: Yup.string().required("Country Name is Required"),
    currency_name: Yup.string().required("Currency Name is Required"),
    currency_rate: Yup.string().required("Currency Rate is Required"),
    razorpay_key: Yup.string().required("razorpay Key is Required"),
    razorpay_secret: Yup.string().required("razorpay Secret is Required"),
    status: Yup.string().required("Status is Required"),
  });
  const [updateStatus, setUpdateStatus] = useState(false);
  const [imagePreview, setImagePreview] = useState();

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
          image: imagePreview,
          razorpay_key: data?.key || "",
          razorpay_secret: data?.secret_key || "",
          country_name: data?.country_code || "",
          currency_name: data?.currency_code || "", // 1 is %, 2 is Rs
          currency_rate: data?.currency_rate || "",
          name: data?.name || "",
          description: data?.description || "",
          theme_color: data?.color || "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          if (!imagePreview) {
            actions.setFieldError("image", "Image is required");
            return;
          }
          onUpdate({
            status: updateStatus === false ? 0 : 1,
            image: imagePreview,
            razorpay_key: values.razorpay_key,
            theme_color: values?.theme_color,
            razorpay_secret: values.razorpay_secret,
            country_name: values.country_name,
            name: values.name,
            description: values.description,
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
              <InputFileUpload
                label="Image"
                onChange={(e) => FilePreviewChange(e, setImagePreview)}
                onBlur={handleBlur}
                name="image"
                value={values?.image}
                accept="image/*"
                onData={data?.image}
                previewImage={imagePreview}
                setPreviewImage={setImagePreview}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.image && touched.image && errors.image}
              </p>
              <label>Name</label>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <p
                  style={{
                    marginTop: "5px",
                    marginBottom: "5px",
                    color: "red",
                  }}
                >
                  {errors.name && touched.name && errors.name}
                </p>
              </div>
              <label>Description</label>
              <div className="mb-3">
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
              </div>
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
              <label>RazorPay Key</label>
              <div className="mb-3">
                <input
                  type="text"
                  name="razorpay_key"
                  className="form-control"
                  placeholder="Razor Key"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.razorpay_key}
                />
                <p
                  style={{
                    marginTop: "5px",
                    marginBottom: "5px",
                    color: "red",
                  }}
                >
                  {errors.razorpay_key &&
                    touched.razorpay_key &&
                    errors.razorpay_key}
                </p>
              </div>
              <label>RazorPay Secret</label>
              <div className="mb-3">
                <input
                  type="text"
                  name="razorpay_secret"
                  className="form-control"
                  placeholder="Razor Secret"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.razorpay_secret}
                />
                <p
                  style={{
                    marginTop: "5px",
                    marginBottom: "5px",
                    color: "red",
                  }}
                >
                  {errors.razorpay_secret &&
                    touched.razorpay_secret &&
                    errors.razorpay_secret}
                </p>
              </div>
              <label>Theme (User Site)</label>
              <div className="mb-3">
                <input
                  type="color"
                  name="theme_color"
                  accept=""
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.theme_color}
                />
                <p
                  style={{
                    marginTop: "5px",
                    marginBottom: "5px",
                    color: "red",
                  }}
                >
                  {errors.razorpay_key &&
                    touched.razorpay_key &&
                    errors.razorpay_key}
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
