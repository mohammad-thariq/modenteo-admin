export const UserDetails = ({ orderDetails, name }) => {
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
    </div>
  );
};
