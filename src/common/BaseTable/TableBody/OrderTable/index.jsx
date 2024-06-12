import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export const OrderTable = ({ onTableData, onUpdate, onDelete, onNavigate }) => {
  return (
    <>
      {onTableData &&
        onTableData?.map((item, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <span className="text-secondary text-xs font-weight-bold">
                {item.id}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-xs font-weight-bold ">
                {item.user_id}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-xs font-weight-bold ">
                {item.order_id}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-xs font-weight-bold ">
                {item.ordered_date.slice(0, 10)}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-xs font-weight-bold ">
                {item.total_amount}
              </span>
            </td>
            <td className="align-middle text-center">
              <span
                className={
                  item?.order_status === 0
                    ? "text-warning border border-warning text-xxs font-weight-bold badge badge-xxs"
                    : item?.order_status === 1
                      ? "text-info border border-info text-xxs font-weight-bold badge badge-xxs"
                      : item?.order_status === 2
                        ? "text-success border border-success text-xxs font-weight-bold badge badge-xxs"
                        : item?.order_status === 3
                          ? "text-success border border-success text-xxs font-weight-bold badge badge-xxs"
                          : item?.order_status === 4
                            ? "text-danger border border-danger text-xxs font-weight-bold badge badge-xxs"
                            : ""
                }
              >
                {item?.order_status === 0
                  ? "Pending"
                  : item?.order_status === 1
                    ? "Progress"
                    : item?.order_status === 2
                      ? "Completed"
                      : item?.order_status === 3
                        ? "Delivered"
                        : item?.order_status === 4
                          ? "Declined"
                          : ""}
              </span>
            </td>
            <td className="align-middle text-center">
              <span
                className={
                  item?.payment_status === 1
                    ? "text-success border border-success  text-xxs font-weight-bold badge badge-xxs"
                    : item?.payment_status === 0
                      ? "text-warning border border-warning text-xxs font-weight-bold badge badge-xxs"
                      : ""
                }
              >
                {item?.payment_status === 1
                  ? "Success"
                  : item?.payment_status === 0
                    ? "Pending"
                    : ""}
                {/* {item?.payment_status} */}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold cursor-pointer">
                {/* <span
                  // className="material-symbols-outlined"
                  onClick={() => onNavigate(item.id)}
                >
                  <VisibilityIcon sx={{ fontSize: 20 }} />
                </span> */}
                <span
                  className="text-secondary text-sm font-weight-bold cursor-pointer"
                  onClick={() => onDelete(item.id)}
                >
                  <DeleteIcon sx={{ fontSize: 20 }} />
                </span>{" "}
                <span
                  className="text-secondary text-sm font-weight-bold cursor-pointer"
                  onClick={() => onUpdate(item.id)}
                >
                  <LocalShippingIcon sx={{ fontSize: 20 }} />
                </span>
              </span>{" "}
            </td>
          </tr>
        ))}
    </>
  );
};
