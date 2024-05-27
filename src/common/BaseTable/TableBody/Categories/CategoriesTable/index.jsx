import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Image from "next/image";
import { BaseUrls } from "../../../../../../env";
import { ProductStatus } from "@/common/BaseTable/TableColumn/ProductStatus";

export const CategoriesTable = (props) => {
  return (
    <>
      {props?.onCategories?.map((item, index) => (
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
            <Image
              width={70}
              height={70}
              alt=""
              src={`${BaseUrls?.IMAGE_URL}/${item.image}`}
              className="text-secondary text-sm font-weight-bold product-image"
            />
          </td>
          <td className="align-middle text-center">
            <i
              className={`${item.icon} text-secondary text-sm font-weight-bold`}
            ></i>
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
              {"  "}
              <span>
                <DeleteIcon
                  sx={{ fontSize: 20 }}
                  onClick={() => props?.onDelete(item.id)}
                />
              </span>
            </span>{" "}
          </td>
        </tr>
      ))}
    </>
  );
};
