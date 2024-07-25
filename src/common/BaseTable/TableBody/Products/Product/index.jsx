import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import ColorLens from "@mui/icons-material/ColorLens"
import Image from "next/image";
import { BaseUrls } from "../../../../../../env";
import { ProductType } from "@/common/BaseTable/TableColumn/ProductType";
import { ProductStatus } from "@/common/BaseTable/TableColumn/ProductStatus";
import { Category, Settings } from "@mui/icons-material";

export const Product = ({ onProductData, onUpdate, onDelete }) => {
  const onVariant = (id) => {
    location.href = `/admin/products/variants/${id}`;
  }
  const productVariants = (id) => {
    location.href = `/admin/products-variants/${id}`;
  }
  return (
    <>
      {onProductData &&
        onProductData?.products?.map((item, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.id}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.short_name}
              </span>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-sm font-weight-bold">
                {item.color}
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
              <span className="text-secondary text-sm font-weight-bold">
                <ProductType
                  top={item?.top_product}
                  best={item?.best_product}
                  featured={item?.featured_product}
                  newProduct={item?.new_arrival}
                />
              </span>
            </td>
            <td className="align-middle text-center">
              <ProductStatus status={item?.status} />
            </td>

            <td className="align-middle text-center cursor-pointer">
              <span>
                <Category
                  sx={{ fontSize: 25 }}
                  onClick={() => productVariants(item.id)}
                />
              </span>{" "}
              <span>
                <Settings
                  sx={{ fontSize: 25 }}
                  onClick={() => onVariant(item.id)}
                />
              </span>{" "}
              <span>
                <EditNoteIcon
                  sx={{ fontSize: 25 }}
                  onClick={() => onUpdate(item.id)}
                />
              </span>{" "}
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
