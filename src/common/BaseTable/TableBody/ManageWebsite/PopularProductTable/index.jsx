import EditNoteIcon from "@mui/icons-material/EditNote";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import { BaseUrls } from "../../../../../../env";
import { ProductStatus } from "@/common/BaseTable/TableColumn/ProductStatus";

export const PopularProductTable = (props) => {
  return (
    <>
      {props?.onPopularProductsData &&
        props?.onPopularProductsData?.map((item, index) => (
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
              <span className="text-secondary text-sm font-weight-bold">
                {item.cat_type.toUpperCase()}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.description}
              </span>
            </td>
            <td className="align-middle text-center">
              <Image
                width={70}
                height={70}
                alt=""
                src={item.image || "/assets/img/placeholder.jpg"}
                className="text-secondary text-sm font-weight-bold product-image"
              />
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
