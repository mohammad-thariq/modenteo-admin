export const BillingAddress = ({ userAddress, name }) => {
  return (
    <div className="mt-4 mx-lg-4">
      <h6>{name} : </h6>
      <p className="mb-1">
        <span style={{ fontSize: "16px", color: "#000", fontWeight: "600" }}>
          Name :
        </span>{" "}
        {userAddress?.user_address?.fullName}
      </p>
      <p className="mb-1">
        {" "}
        <span style={{ fontSize: "16px", color: "#000", fontWeight: "600" }}>
          Phone Number :
        </span>{" "}
        {userAddress?.user_address?.phoneNumber}
      </p>
      <p className="mb-0">
        <span style={{ fontSize: "16px", color: "#000", fontWeight: "600" }}>
          Address :
        </span>{" "}
        {userAddress?.user_address?.streetAddress},{" "}
        {userAddress?.user_address?.city},
      </p>
      <p className="mb-0">
        {userAddress?.user_address?.state}, {userAddress?.user_address?.country}{" "}
        - {userAddress?.user_address?.zipCode}
      </p>
    </div>
  );
};
