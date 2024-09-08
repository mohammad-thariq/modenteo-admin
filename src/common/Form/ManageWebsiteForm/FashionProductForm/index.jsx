import { Button } from "@/common/Button";
import style from "../index.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { InputFileUpload } from "../../common/inputFileUpload";
import { FilePreviewChange } from "@/utils/filePreviewChange";
import { InputSelect } from "../../common/inputSelect";
import { statusConstantOption, cat_typeConstantOption } from "@/constant/statusConst";

export const FashionProductForm = ({
  onSave,
  onClose,
  currentFashionProductsId,
  data,
  onUpdate,
  loading,
  button,
}) => {
  const [imagePreview, setImagePreview] = useState();
  const schema = Yup.object({
    page_url: Yup.string().required("Page Link is Required"),
    status: Yup.string().required("Status is Required"),
    cat_type: Yup.string().required("Category Type is Required"),
  });
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          image: imagePreview,
          page_url: data?.page_url,
          status: data?.status + 1 || "",
          cat_type: data?.cat_type,
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          if (!imagePreview) {
            actions.setFieldError("image", "Image is required");
            return;
          }
          onUpdate
            ? onUpdate({
              id: currentFashionProductsId,
              image: imagePreview,
              page_url: values?.page_url,
              status: values?.status - 1,
              cat_type: values?.cat_type,
            })
            : onSave({
              image: imagePreview,
              page_url: values?.page_url,
              status: values?.status - 1,
              cat_type: values?.cat_type,
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
                label="Icon"
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
            </div>
            <label>Page Link</label>
            <div className="mb-3">
              <input
                type="name"
                name="page_url"
                className="form-control"
                placeholder="Page Link"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.page_url}
              />
              <p
                style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}
              >
                {errors.page_url && touched.page_url && errors.page_url}
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
            <InputSelect
              label={"Category Type"}
              onBlur={handleBlur}
              onChange={handleChange}
              name={"cat_type"}
              values={values?.cat_type}
              isValue
              onData={cat_typeConstantOption}
            />
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.cat_type && touched.cat_type && errors.cat_type}
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
