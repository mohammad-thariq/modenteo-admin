import { Button } from "@/common/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import style from "../index.module.css";
import { InputSelect } from "../../common/inputSelect";
import { statusConstantOption } from "@/constant/statusConst";

export const SubCategoriesForm = ({
  onClose,
  button,
  data,
  onSave,
  onUpdate,
  getCategory,
  currentCategoryId,
  loading,
}) => {
  const schema = Yup.object({
    category: Yup.string().required("Category is Required"),
    name: Yup.string().required("Sub Category is Required"),
    slug: Yup.string().required("Slug is Required"),
    status: Yup.string().required("Status is Required"),
  });

  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          name: data?.name || "",
          slug: data?.slug || "",
          category: data?.category_id || "",
          status: data?.status + 1 || "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate
            ? onUpdate({
                id: currentCategoryId,
                name: values?.name,
                slug: values?.slug,
                category: values?.category,
                status: values?.status - 1,
              })
            : onSave({
                name: values?.name,
                slug: values?.slug,
                category: values?.category,
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
          <form eenctype="multipart/form-data">
            <InputSelect
              label="Category"
              name="category"
              onBlur={handleBlur}
              onChange={handleChange}
              values={values.category}
              onData={getCategory?.categories}
            />
            <label>Sub Category</label>
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
