import { ProductStatus } from "@/common/BaseTable/TableColumn/ProductStatus";
import { TruncateString } from "@/utils/truncateString";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Image from "next/image";
import { BaseUrls } from "../../../../../../env";

export const ChildCategoriesTable = (props) => {

  return (
    <>
      {props.onChildCategories &&
        props.onChildCategories?.map((item, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.id}
              </span>
            </td>
            <td className="align-middle text-center">
            <Image
              width={70}
              height={70}
              alt=""
              src={`${BaseUrls?.IMAGE_URL}${item.image}`}
              className="text-secondary text-sm font-weight-bold product-image"
            />
          </td>
          <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.category?.name}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.sub_category?.name}
              </span>
            </td>
            <td className="align-middle text-center">
              <span
                className="text-secondary text-sm font-weight-bold"
                title={item?.name}
              >
                {TruncateString(item?.name)}
              </span>
            </td>
         
            <td className="align-middle text-center">
              <ProductStatus status={item?.status} />
            </td>
            <td className="align-middle text-center">
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
            </td>
          </tr>
        ))}
    </>
  );
};
