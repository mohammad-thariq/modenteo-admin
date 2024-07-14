import EditNoteIcon from "@mui/icons-material/EditNote";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import { BaseUrls } from "../../../../../../env";
import { ProductStatus } from "@/common/BaseTable/TableColumn/ProductStatus";

export const VariantsTable = ({ onVariantsData, onUpdate, onDelete }) => {
  return (
    <>
      {onVariantsData &&
        onVariantsData?.map((item, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.id}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.product_price}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.offer_price}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.product_quantity}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.product_size}
              </span>
            </td>

            <td className="align-middle text-center cursor-pointer">
              <span>
                <EditNoteIcon
                  sx={{ fontSize: 25 }}
                  onClick={() => onUpdate(item.id)}
                />
              </span>
              <span>
                <DeleteIcon
                  sx={{ fontSize: 20 }}
                  onClick={() => onDelete(item.id)}
                />
              </span>
            </td>
          </tr>
        ))}
    </>
  );
};
