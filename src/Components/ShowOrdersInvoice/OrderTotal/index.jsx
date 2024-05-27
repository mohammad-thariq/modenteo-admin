export const OrderTotal = ({orderDetails}) => {
    return(
        <div className="mt-4 me-lg-6 ms-lg-4 flex flex-direction-column align-item-end py-3 mx-4">
        <p className="mb-1">Subtotal : ₹ {orderDetails?.total_amount}</p>
        <p className="mb-1">Discount(-) : ₹ {orderDetails?.coupon_coast}</p>
        <p className="mb-1">Shipping : ₹ {orderDetails?.shipping_cost}</p>
        <p className="mb-1 text-lg fw-bolder color-6c757d">
          Total : ₹ {orderDetails?.total_amount}
        </p>
      </div>
    )
}