export const ShippingAddress = ({ orderDetails, name }) => {
  return (
    <div className="mt-4 mx-lg-4">
      <h6>{name} : </h6>
      <p className="mb-1">
        <span style={{ fontSize: "16px", color: "#000", fontWeight: "600" }}>
          Name :
        </span>{" "}
        {orderDetails?.order_address?.shipping_name}
      </p>
      <p className="mb-1">
        {" "}
        <span style={{ fontSize: "16px", color: "#000", fontWeight: "600" }}>
          Email :
        </span>{" "}
        {orderDetails?.order_address?.shipping_email}
      </p>
      <p className="mb-1">
        {" "}
        <span style={{ fontSize: "16px", color: "#000", fontWeight: "600" }}>
          Phone Number :
        </span>{" "}
        {orderDetails?.order_address?.shipping_phone}
      </p>
      <p className="mb-0">
        <span style={{ fontSize: "16px", color: "#000", fontWeight: "600" }}>
          Address :
        </span>{" "}
        {orderDetails?.order_address?.shipping_address},{" "}
        {orderDetails?.order_address?.shipping_city},
      </p>
      <p className="mb-0">
        {orderDetails?.order_address?.shipping_state},{" "}
        {orderDetails?.order_address?.shipping_country}
      </p>
    </div>
  );
};
