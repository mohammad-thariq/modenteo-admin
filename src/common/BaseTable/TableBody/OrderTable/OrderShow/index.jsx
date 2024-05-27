export const OrderShowTable = (props) => {
  return (
    <>
      {props.onShowOrder &&
        props.onShowOrder?.order_products?.map((item, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <span className="text-secondary text-xs font-weight-bold">
                {item.id}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-xs font-weight-bold ">
                {item.product_name}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-xs font-weight-bold ">
                {item.order_product_variants}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-xs font-weight-bold ">
                {item?.shop_name}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-xs font-weight-bold ">
                {item.unit_price}
              </span>
            </td>
            <td className="align-middle text-center">
            <span className="text-secondary text-xs font-weight-bold ">
                {item.qty}
              </span>
            </td>
            <td className="align-middle text-center">
            <span className="text-secondary text-xs font-weight-bold ">
                {props?.onShowOrder?.total_amount}
              </span>
            </td>
          </tr>
        ))}
    </>
  );
};
