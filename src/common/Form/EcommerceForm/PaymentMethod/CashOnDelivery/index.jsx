import { Button } from "@/common/Button";
import style from "../../index.module.css";
import { Formik } from "formik";
import { useEffect, useState } from "react";

export const CashOnDeliveryForm = ({
  onClose,
  data,
  onUpdate,
  loading,
  button,
  formName,
}) => {
  const [updateStatus, setUpdateStatus] = useState(false);

  const handleUpdateStatus = () => {
    setUpdateStatus(!updateStatus);
  };

  useEffect(() => {
    if (data) {
      setUpdateStatus(data?.cash_on_delivery_status === 0 ? false : true);
    }
  }, [data, data?.cash_on_delivery_status]);
  return (
    <div className={style.wrapper}>
      <Formik
        initialValues={{
          cash_on_delivery_status: updateStatus,
        }}
        onSubmit={(values, actions) => {
          onUpdate({
            cash_on_delivery_status: updateStatus === false ? 0 : 1,
            account_info: data?.account_info,
          });
          actions.setSubmitting(true);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <label className="font-20">{formName}</label>
            <form role="form" className="w-350">
              <div className="flex flex-column">
                <label>Status</label>
                <div className="mb-2 switchToggle" onClick={handleUpdateStatus}>
                  <input
                    className="toggleInput"
                    type="checkbox"
                    checked={updateStatus}
                  />
                  <span className="sliderToggle roundToggle"></span>
                </div>
              </div>
              <label>Enable Cash On Delivery Method</label>
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
          </>
        )}
      </Formik>
    </div>
  );
};
