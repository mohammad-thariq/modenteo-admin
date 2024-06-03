import { Button } from "@/common/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import style from "../index.module.css";
import { InputSelect } from "../../common/inputSelect";
import { statusConstantOption } from "@/constant/statusConst";
import { InputFileUpload } from "../../common/inputFileUpload";
import { FilePreviewChange } from "@/utils/filePreviewChange";
import { useState } from "react";

export const ChildCategoriesForm = ({
  onClose,
  button,
  data,
  onSave,
  onUpdate,
  currentChildCategoryId,
  loading,
  getCategory,
  getSubCategory,
}) => {

  const [imagePreview, setImagePreview] = useState();

  const schema = Yup.object({
    sub_category_id: Yup.string().required("Sub Category is Required"),
    name: Yup.string().required("Child Category is Required"),
    category_id: Yup.string().required("Category is Required"),
    status: Yup.string().required("Status is Required"),
  });

  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          category_id: data?.category_id || "",
          sub_category_id: data?.sub_category_id || "",
          name: data?.name || "",
          image: imagePreview,
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
                id: currentChildCategoryId,
                name: values?.name,
                image: imagePreview,
                sub_category_id: values?.sub_category_id,
                category_id: values?.category_id,
                status: values?.status - 1,
              })
            : onSave({
                name: values?.name,
                image: imagePreview,
                sub_category_id: values?.sub_category_id,
                category_id: values?.category_id,
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
            <InputSelect
              label="Category"
              name="category_id"
              onBlur={handleBlur}
              onChange={handleChange}
              values={values.category_id}
              onData={getCategory?.categories}
            />
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.category_id && touched.category_id && errors.category_id}
            </p>

            <InputSelect
              label="Sub Category"
              name="sub_category_id"
              onBlur={handleBlur}
              onChange={handleChange}
              values={values.sub_category_id}
              onData={getSubCategory?.sub_categories}
            />
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.sub_category_id &&
                touched.sub_category_id &&
                errors.sub_category_id}
            </p>
            <label>Child Category</label>
            <div className="mb-2">
              <input
                type="text"
                name="name"
                className="form-control"
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
