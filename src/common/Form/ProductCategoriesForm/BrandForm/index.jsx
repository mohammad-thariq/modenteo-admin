import { Button } from "@/common/Button";
import style from "../index.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import Image from "next/image";
import { BaseUrls } from "../../../../../env";

export const BrandForm = ({
  onSave,
  onClose,
  currentBrandsId,
  data,
  onUpdate,
  loading,
  button,
}) => {
  const [imageFile, setImageFile] = useState(null);

  const schema = Yup.object({
    name: Yup.string().required("Name is Required"),
    // logo: Yup.string().required("Logo is Required"),
    slug: Yup.string().required("Slug is Required"),
    status: Yup.string().required("Status is Required"),
  });
  return (
    <div className={style.wrapper}>
      {data && (
        <Image
          width={70}
          height={70}
          alt=""
          src={
            `${BaseUrls?.IMAGE_URL}/${data?.logo}` ||
            "/assets/img/placeholder.jpg"
          }
          className="text-secondary text-sm font-weight-bold product-image"
        />
      )}
      <Formik
        initialValues={{
          logo: null,
          slug: data?.slug || "",
          name: data?.name || "",
          status: data?.status || "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate
            ? onUpdate({
                id: currentBrandsId,
                logo: imageFile || data?.image,
                slug: values?.slug,
                name: values?.name,
                status: values?.status,
              })
            : onSave({
                logo: imageFile,
                slug: values?.slug,
                name: values?.name,
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
          <form role="form">
            <div className="mb-3">
              <label>Logo</label>
              <input
                type="file"
                className="form-control"
                name="logo"
                onChange={(e) => {
                  const file = e?.currentTarget?.files[0];
                  setImageFile(file?.name);
                }}
                onBlur={handleBlur}
                value={values.logo}
              />
              {/* <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.logo && touched.logo && errors.logo}
              </p> */}
            </div>
            <label>Name</label>
            <div className="mb-3">
              <input
                type="name"
                name="name"
                className="form-control"
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.name && touched.name && errors.name}
              </p>
            </div>
            <label>Slug</label>
            <div className="mb-3">
              <input
                type="name"
                name="slug"
                className="form-control"
                placeholder="Slug"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.slug}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.slug && touched.slug && errors.slug}
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
        )}
      </Formik>
    </div>
  );
};
