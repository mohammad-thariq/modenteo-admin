import { Button } from "@/common/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import style from "../index.module.css";
import { InputSelect } from "../../common/inputSelect";
import { statusConstantOption } from "@/constant/statusConst";

export const ChildCategoriesForm = ({
  onClose,
  button,
  data,
  onSave,
  onUpdate,
  currentCategoryId,
  loading,
  getCategory,
  getSubCategory,
}) => {
  const schema = Yup.object({
    sub_category: Yup.string().required("Sub Category is Required"),
    name: Yup.string().required("Child Category is Required"),
    slug: Yup.string().required("Slug is Required"),
    category: Yup.string().required("Category is Required"),
    status: Yup.string().required("Status is Required"),
  });

  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          category: data?.category_id || "",
          sub_category: data?.sub_category_id || "",
          name: data?.name || "",
          slug: data?.slug || "",
          status: data?.status + 1 || "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate
            ? onUpdate({
                id: currentCategoryId,
                name: values?.name,
                slug: values?.slug,
                sub_category: values?.sub_category,
                category: values?.category,
                status: values?.status - 1,
              })
            : onSave({
                name: values?.name,
                slug: values?.slug,
                sub_category: values?.sub_category,
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
          <form className="formInner overflow-column height-500">
            <InputSelect
              label="Category"
              name="category"
              onBlur={handleBlur}
              onChange={handleChange}
              values={values.category}
              onData={getCategory?.categories}
            />
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.category && touched.category && errors.category}
            </p>

            <InputSelect
              label="Sub Category"
              name="sub_category"
              onBlur={handleBlur}
              onChange={handleChange}
              values={values.sub_category}
              onData={getSubCategory?.subCategories}
            />
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.sub_category &&
                touched.sub_category &&
                errors.sub_category}
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
            <label>Slug</label>
            <div className="mb-2">
              <input
                type="text"
                name="slug"
                className="form-control"
                placeholder="Slug"
                aria-label="NaSlugme"
                aria-describedby="Slug"
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
