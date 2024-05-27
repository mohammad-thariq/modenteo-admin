/* eslint-disable @next/next/no-img-element */
import { Button } from "@/common/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import style from "./index.module.css";
import { useState } from "react";
import { InputSelect } from "../../common/inputSelect";
import { statusConstantOption } from "@/constant/statusConst";
import { InputFileUpload } from "../../common/inputFileUpload";
import { FilePreviewChange } from "@/utils/filePreviewChange";

export const CategoriesForm = ({
  onClose,
  button,
  data,
  onSave,
  onUpdate,
  currentCategoryId,
  loading,
}) => {
  const [imagePreview, setImagePreview] = useState();
  const schema = Yup.object({
    name: Yup.string().required("Name is Required"),
    icon: Yup.string().required("Icon is Required"),
    slug: Yup.string().required("Slug is Required"),
    status: Yup.string().required("Status is Required"),
  });

  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          image: imagePreview,
          icon: data?.icon || "",
          slug: data?.slug || "",
          name: data?.name || "",
          status: data?.status + 1 || "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          if (!imagePreview) {
            actions.setFieldError("image", "Image is required");
            return;
          }
          onUpdate
            ? onUpdate({
                id: currentCategoryId,
                image: imagePreview,
                icon: values?.icon,
                slug: values?.slug,
                name: values?.name,
                status: values?.status - 1,
              })
            : onSave({
                image: imagePreview,
                icon: values?.icon,
                slug: values?.slug,
                name: values?.name,
                status: values?.status - 1,
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
          <form className="formInner overflow-column height-500">
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
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.image && touched.image && errors.image}
            </p>

            <label>Icon</label>
            <div className="mb-2">
              <input
                type="text"
                name="icon"
                className="form-control"
                placeholder="Icon"
                aria-label="Icon"
                aria-describedby="Icon-addon"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.icon}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.icon && touched.icon && errors.icon}
              </p>
            </div>
            <label>Name</label>
            <div className="mb-2">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                aria-label="Name"
                aria-describedby="Name-addon"
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
            <div className="mb-2">
              <input
                type="text"
                name="slug"
                className="form-control"
                placeholder="Slug"
                aria-label="Slug"
                aria-describedby="SLug"
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
            <InputSelect
              label={"Status"}
              onBlur={handleBlur}
              onChange={handleChange}
              name={"status"}
              values={values?.status}
              isValue
              onData={statusConstantOption}
            />
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
