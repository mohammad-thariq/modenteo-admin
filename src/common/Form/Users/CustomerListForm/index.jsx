import { Button } from "@/common/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import style from "./index.module.css";
import { InputSelect } from "../../common/inputSelect";
import { statusConstantOption } from "@/constant/statusConst";

export const CustomerListForm = ({
  onClose,
  button,
  data,
  onSave,
  onUpdate,
  loading,
  currentCustomerId,
}) => {
  const schema = Yup.object({
    status: Yup.string().required("Status is Required"),
  });
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          status: data?.status + 1 || "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate
            ? onUpdate({
                id: currentCustomerId,
                status: values?.status - 1,
              })
            : onSave({
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
          <form>
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
