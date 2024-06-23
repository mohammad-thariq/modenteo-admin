import EditNoteIcon from "@mui/icons-material/EditNote";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import { BaseUrls } from "../../../../env";
import { ProductStatus } from "@/common/BaseTable/TableColumn/ProductStatus";

export const PageTable = (props) => {
  return (
    <>
      {props?.onPageData &&
        props?.onPageData?.map((item, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.id}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.title}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-capitalize text-secondary text-sm font-weight-bold">
                {item.page_type}
              </span>
            </td>
            <td className="align-middle text-center">
              <ProductStatus status={item?.status} />
            </td>
            <td className="align-middle text-center cursor-pointer">
              <span>
                <EditNoteIcon
                  sx={{ fontSize: 25 }}
                  onClick={() => props?.onUpdate(item.id)}
                />
              </span>
              <span>
                <DeleteIcon
                  sx={{ fontSize: 20 }}
                  onClick={() => props?.onDelete(item.id)}
                />
              </span>
            </td>
          </tr>
        ))}
    </>
  );
};
