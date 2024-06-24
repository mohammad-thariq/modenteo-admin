import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const UserTable = ({ onUserData, onDelete, onNavigate }) => {
  return (
    <>
      {onUserData &&
        onUserData?.map((item, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <span className="text-secondary text-xs font-weight-bold">
                {index + 1}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-xs font-weight-bold">
                {item.id}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-xs font-weight-bold ">
                {item.first_name}&nbsp;
                {item.last_name}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-xs font-weight-bold ">
                {item.email}
              </span>
            </td>
            {/* <td className="align-middle text-center">
              <span className="text-secondary text-xs font-weight-bold ">
                {item.ordered_date.slice(0, 10)}
              </span>
            </td> */}
            {/* <td className="align-middle text-center">
              <span className="text-secondary text-xs font-weight-bold ">
                {item.total_amount}
              </span>
            </td> */}
            {/* <td className="align-middle text-center">
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
              </span>
            </td> */}
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold cursor-pointer">
                <span
                  // className="material-symbols-outlined"
                  onClick={() => onNavigate(item.id)}
                >
                  <VisibilityIcon sx={{ fontSize: 20 }} />
                </span>
                <span
                  className="text-secondary text-sm font-weight-bold cursor-pointer"
                  onClick={() => onDelete(item.id)}
                >
                  <DeleteIcon sx={{ fontSize: 20 }} />
                </span>{" "}
              </span>{" "}
            </td>
          </tr>
        ))}
    </>
  );
};
