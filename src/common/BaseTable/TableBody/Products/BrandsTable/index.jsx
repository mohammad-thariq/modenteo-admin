import EditNoteIcon from "@mui/icons-material/EditNote";
import Image from "next/image";
import { BaseUrls } from "../../../../../../env";
import { ProductStatus } from "@/common/BaseTable/TableColumn/ProductStatus";

export const BrandsTable = ({ onBrandsData, onUpdate }) => {
  return (
    <>
      {onBrandsData &&
        onBrandsData?.brands?.map((item, index) => (
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
              <Image
                width={70}
                height={70}
                alt=""
                src={
                  `${BaseUrls?.IMAGE_URL}/${item.logo}` ||
                  "/assets/img/placeholder.jpg"
                }
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
                  onClick={() => onUpdate(item.id)}
                />
              </span>
            </td>
          </tr>
        ))}
    </>
  );
};
