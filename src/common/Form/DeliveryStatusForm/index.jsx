import { Button } from "@/common/Button";
import style from "./index.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { orderStatusOptions } from "@/constant/statusConst";
import { InputSelect } from "../common/inputSelect";

export const DeliveryStatusForm = ({
  onClose,
  data,
  deliveryMan,
  currentOrderId,
  updateOrderStatus,
  updateOrderStatusLoading,
}) => {
  const schema = Yup.object({
    order_status: Yup.string().required("Order status is Required"),
    payment_status: Yup.string().required("Payment status is Required"),
  });
  console.log(data, "data");
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          order_status: data?.order?.order_status + 1,
          payment_status: data?.order?.payment_status + 1,
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          updateOrderStatus({
            id: currentOrderId,
            order_status: values.order_status - 1,
            payment_status: values.payment_status - 1,
          });
          actions.setSubmitting(true);
        }}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <>
            {data && (
              <>
                <form>
                  <InputSelect
                    label="Order Status"
                    name="order_status"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.order_status}
                    onData={orderStatusOptions?.orderStatus}
                    isValue
                  />
                  <p style={{ marginTop: "5px", color: "red" }}>
                    {errors.order_status &&
                      touched.order_status &&
                      errors.order_status}
                  </p>
                  <InputSelect
                    label="Payment Status"
                    name="payment_status"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.payment_status}
                    onData={orderStatusOptions?.paymentStatus}
                    isValue
                  />
                  <p style={{ marginTop: "5px", color: "red" }}>
                    {errors.payment_status &&
                      touched.payment_status &&
                      errors.payment_status}
                  </p>

                  {/* {deliveryMan && (
      <>
        <label className={style.label}>Assign Delivery Man</label>
        <select
          className="form-select"
          aria-label="Default select example"
          name="order_status"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.order_status}
          placeholder="Order Status"
        >
          <option hidden>Assign Delivery Man</option>
          {orderStatusOptions?.deliveryMan?.map((i) => (
            <option key={i?.id} value={i?.id}>
              {i?.name}
            </option>
          ))}
        </select>
        <p style={{ marginTop: "5px", color: "red" }}>
          {errors.order_status &&
            touched.order_status &&
            errors.order_status}
        </p>
      </>
    )} */}
                </form>
                <div className={style.btnWrapper}>
                  <Button
                    name="Close"
                    border="1px solid #23D24F"
                    color="#000"
                    onClick={onClose}
                  />
                  <Button
                    isSubmitting={updateOrderStatusLoading}
                    name="Update"
                    bg="#dc395f"
                    type="submit"
                    color="#fff"
                    onClick={handleSubmit}
                  />
                </div>
              </>
            )}
          </>
        )}
      </Formik>
    </div>
  );
};
