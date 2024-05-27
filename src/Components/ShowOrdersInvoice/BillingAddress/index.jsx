export const BillingAddress = ({orderDetails, name}) =>{
    return(
        <div className="mx-lg-4 mt-2">
        <h6>{name} : </h6>
        <p className="mb-1">
          {orderDetails?.order_address?.billing_name}
        </p>
        <p className="mb-1">
          {orderDetails?.order_address?.billing_email}
        </p>
        <p className="mb-1">
          {orderDetails?.order_address?.billing_phone}
        </p>
        <p className="mb-0">
          {orderDetails?.order_address?.billing_address},{" "}
          {orderDetails?.order_address?.billing_city},
        </p>
        <p className="mb-0">
          {orderDetails?.order_address?.billing_state},{" "}
          {orderDetails?.order_address?.billing_country}
        </p>
      </div>
    )
}