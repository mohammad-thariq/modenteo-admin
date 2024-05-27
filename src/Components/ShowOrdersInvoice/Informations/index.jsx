export const Informations = ({ orderDetails }) => {
  return (
    <div className="flex align-item-center justify-content-sb flex-wrap">
      <div className="mx-lg-4 mt-3">
        <h6>Payment Information : </h6>
        <p className="mb-1">Method: {orderDetails?.payment_method}</p>
        <p className="mb-1">
          Status :{" "}
          <span
            className={
              orderDetails?.payment_status === 1
                ? "text-success text-xxs font-weight-bold badge badge-xxs border border-success"
                : "text-warning text-xxs font-weight-bold badge badge-xxs border border-warning"
            }
          >
            Success
          </span>
        </p>
        <p className="mb-1">Transaction: {orderDetails?.payment_method}</p>
      </div>
      <div className="mt-4 mx-lg-4">
        <h6>Order Information : </h6>
        <p className="mb-1">Date: {orderDetails?.order_delivered_date}</p>
        <p className="mb-1">Shipping: {orderDetails?.shipping_method}</p>
        <p className="mb-1">
          Status:{" "}
          <span
            className={
              orderDetails?.order_status === 0
                ? "text-warning text-xxs font-weight-bold badge badge-xxs border border-warning"
                : orderDetails?.order_status === 1
                ? "text-warning text-xxs font-weight-bold badge badge-xxs border border-waring"
                : orderDetails?.order_status === 2
                ? "text-success text-xxs font-weight-bold badge badge-xxs border border-success"
                : orderDetails?.order_status === 3
                ? "text-success text-xxs font-weight-bold badge badge-xxs border  border-success"
                : "text-failed text-xxs font-weight-bold badge badge-xxs  border border-failed"
            }
          >
            {orderDetails?.order_status === 0
              ? "Pending"
              : orderDetails?.order_status === 1
              ? "Progress"
              : orderDetails?.order_status === 2
              ? "Delivered"
              : orderDetails?.order_status === 3
              ? "Completed"
              : "Declined"}
          </span>
        </p>
      </div>
    </div>
  );
};
