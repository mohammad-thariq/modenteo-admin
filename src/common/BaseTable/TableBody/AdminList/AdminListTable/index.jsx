import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

export const AdminListTable = ({ onAdminListData, onUpdate, onDelete }) => {
  return (
    <>
      {onAdminListData?.map((item, index) => (
        <tr key={index}>
          <td className="align-middle text-center">
            <span className="text-secondary text-sm font-weight-bold">
              {index + 1}
            </span>
          </td>
          <td className="align-middle text-center">
            <span className="text-secondary text-sm font-weight-bold">
              {item.id}
            </span>
          </td>
          <td className="align-middle text-center">
            <span className="text-secondary text-sm font-weight-bold">
              {item.first_name}&nbsp;
              {item.last_name}
            </span>
          </td>
          <td className="align-middle text-center">
            <span className="text-secondary text-sm font-weight-bold">
              {item.email}
            </span>
          </td>
          <td className="align-middle text-center">
            <span className="text-secondary text-sm font-weight-bold">
              {item.type}
            </span>
          </td>

          <td className="align-middle text-center">
            <span className="text-secondary text-sm font-weight-bold cursor-pointer">
              <span>
                <EditNoteIcon
                  sx={{ fontSize: 25 }}
                  onClick={() => onUpdate(item.id)}
                />
              </span>
              {"  "}
              <span>
                <DeleteIcon
                  sx={{ fontSize: 20 }}
                  onClick={() => onDelete(item.id)}
                />
              </span>
            </span>{" "}
          </td>
        </tr>
      ))}
    </>
  );
};
