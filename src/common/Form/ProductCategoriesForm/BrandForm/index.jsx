import { Button } from "@/common/Button";
import style from "../index.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import Image from "next/image";
import { BaseUrls } from "../../../../../env";
import { InputFileUpload } from "../../common/inputFileUpload";
import { FilePreviewChange } from "@/utils/filePreviewChange";
import { InputSelect } from "../../common/inputSelect";
import { statusConstantOption } from "@/constant/statusConst";

export const BrandForm = ({
  onSave,
  onClose,
  currentBrandsId,
  data,
  onUpdate,
  loading,
  button,
}) => {
  const [imagePreview, setImagePreview] = useState();


  const schema = Yup.object({
    name: Yup.string().required("Name is Required"),
    status: Yup.string().required("Status is Required"),
  });
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          image: imagePreview,
          name: data?.name || "",
          status: data?.status + 1|| "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          if (!imagePreview) {
            actions.setFieldError("image", "Image is required");
            return;
          }
          onUpdate
            ? onUpdate({
                id: currentBrandsId,
                image: imagePreview,
                name: values?.name,
                status: values?.status - 1,
              })
            : onSave({
                image: imagePreview,
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
            <div className="mb-3">
            <InputFileUpload
              label="Logo"
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
