import { Button } from "@/common/Button";
import style from "../index.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import { InputSelect } from "../../common/inputSelect";

export const VariantForm = ({
  onSave,
  onClose,
  currentVariantsId,
  data,
  onUpdate,
  loading,
  button,
  productID
}) => {
  let size = [{ "id": 1, "name": "S" }, { "id": 2, "name": "M" }, { "id": 3, "name": "L" }, { "id": 4, "name": "XL" }, { "id": 5, "name": "XXL" }];


  const schema = Yup.object({
    product_quantity: Yup.number().required("Product Quantity is Required"),
    product_price: Yup.number().required("Product Price is Required"),
    product_size: Yup.string().required("Product Size is Required"),
  });
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          product_id: data?.product_id || productID,
          product_size: data?.product_size || "",
          product_quantity: data?.product_quantity || "",
          product_price: data?.product_price || "",
          offer_price: data?.offer_price || "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onUpdate
            ? onUpdate({
              id: currentVariantsId,
              product_id: values?.product_id || productID,
              product_size: values?.product_size,
              product_quantity: values?.product_quantity,
              offer_price: values?.offer_price,
              product_price: values?.product_price,
            })
            : onSave({
              product_id: values?.product_id || productID,
              product_size: values?.product_size,
              product_quantity: values?.product_quantity,
              offer_price: values?.offer_price,
              product_price: values?.product_price,
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
              label={"Product Size"}
              onBlur={handleBlur}
              onChange={handleChange}
              name={"product_size"}
              values={values?.product_size}
              isValue
              onData={size}
            />
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>
              {errors.product_size && touched.product_size && errors.product_size}
            </p>
            <label>Product Quantity</label>
            <input type="number" className="form-control" placeholder="Product Quantity" onChange={handleChange} onBlur={handleBlur} name={`product_quantity`} value={values?.product_quantity} />
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>{errors.product_quantity && touched.product_quantity && errors.product_quantity}</p>
            <label>Product Price</label>
            <input type="number" className="form-control" placeholder="Product Price" onChange={handleChange} onBlur={handleBlur} name={`product_price`} value={values?.product_price} />
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>{errors.product_price && touched.product_price && errors.product_price}</p>
            <label>Offer Price</label>
            <input type="number" className="form-control" placeholder="Offer Price" onChange={handleChange} onBlur={handleBlur} name={`offer_price`} value={values?.offer_price} />
            <p style={{ marginTop: "5px", marginBottom: "5px", color: "red" }}>{errors.offer_price && touched.offer_price && errors.offer_price}</p>

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
    </div >
  );
};
