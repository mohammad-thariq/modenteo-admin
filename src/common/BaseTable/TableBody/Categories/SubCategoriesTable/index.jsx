import { ProductStatus } from "@/common/BaseTable/TableColumn/ProductStatus";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

export const SubCategoriesTable = (props) => {
  return (
    <>
      {props.onSubCategories &&
        props?.onSubCategories?.map((item, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.id}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.name}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.slug}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.category?.name}
              </span>
            </td>
            <td className="align-middle text-center">
              <ProductStatus status={item?.status} />
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold cursor-pointer">
                <span>
                  <EditNoteIcon
                    sx={{ fontSize: 25 }}
                    onClick={() => props?.onUpdate(item.id)}
                  />
                </span>
                <span className="text-secondary text-sm font-weight-bold cursor-pointer">
                  <DeleteIcon
                    sx={{ fontSize: 20 }}
                    onClick={() => props?.onDelete(item.id)}
                  />
                </span>{" "}
              </span>{" "}
            </td>
          </tr>
        ))}
    </>
  );
};
