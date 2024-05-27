import { Formik } from "formik";
import style from "../index.module.css";
import { Button } from "@/common/Button";
import * as Yup from "yup";

export const SpecKeyForm = ({
  onClose,
  button,
  data,
  onSave,
  onUpdate,
  loading,
  currentSpecificationKeyId,
}) => {
  const schema = Yup.object({
    key: Yup.string().required("Key is Required"),
    status: Yup.string().required("Status is Required"),
  });
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          key: data?.key || "",
          status: data?.status || "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate
            ? onUpdate({
                id: currentSpecificationKeyId,
                key: values?.key,
                status: values?.status,
              })
            : onSave({
                key: values?.key,
                status: values?.status,
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
          <form eenctype="multipart/form-data">
            <label>Key</label>
            <div className="mb-2">
              <input
                type="text"
                name="key"
                className="form-control"
                placeholder="key"
                aria-label="key"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.key}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.key && touched.key && errors.key}
              </p>
            </div>

            <label>Status</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="status"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.status}
            >
              <option hidden>Select Status</option>
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.status && touched.status && errors.status}
            </p>
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
