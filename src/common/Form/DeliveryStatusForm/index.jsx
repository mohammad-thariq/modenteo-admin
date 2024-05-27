import { Button } from "@/common/Button";
import style from "./index.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { orderStatusOptions } from "@/constant/statusConst";

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

  return (
    <div className={style.wrapper}>
      <h3>Order Status</h3>
      <Formik
        initialValues={{
          payment_status: data?.payment_status || "",
          order_status: data?.order_status || "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          updateOrderStatus({
            id: currentOrderId,
            order_status: values.order_status,
            payment_status: values.payment_status,
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
          isSubmitting,
        }) => (
          <>
            <form>
              <label className={style.label}>Payment</label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="payment_status"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.payment_status}
                placeholder="Payment Status"
              >
                <option hidden>Select Payment Status</option>
                {orderStatusOptions?.paymentStatus?.map((i) => (
                  <option key={i?.value} value={i?.value}>
                    {i?.name}
                  </option>
                ))}
              </select>
              <p style={{ marginTop: "5px", color: "red" }}>
                {errors.payment_status &&
                  touched.payment_status &&
                  errors.payment_status}
              </p>
              <label className={style.label}>Order</label>

              <select
                className="form-select"
                aria-label="Default select example"
                name="order_status"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.order_status}
                placeholder="Order Status"
              >
                <option hidden>Select Order Status</option>
                {orderStatusOptions?.orderStatus?.map((i) => (
                  <option key={i?.value} value={i?.value}>
                    {i?.name}
                  </option>
                ))}
              </select>
              <p style={{ marginTop: "5px", color: "red" }}>
                {errors.order_status &&
                  touched.order_status &&
                  errors.order_status}
              </p>
              {deliveryMan && (
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
              )}
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
                bg="#23d24f"
                type="submit"
                color="#fff"
                onClick={handleSubmit}
              />
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};
