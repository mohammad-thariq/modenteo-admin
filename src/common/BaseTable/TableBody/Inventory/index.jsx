import { TruncateString } from "@/utils/truncateString";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { router } from "next/router";

export const Inventory = ({onInventoryData, handleDeleteCity}) => {
    return (
      <>
        {onInventoryData &&
          onInventoryData?.products
          ?.map((item, index) => (
            <tr key={index}>
              <td className="align-middle text-center">
                <span className="text-secondary text-sm font-weight-bold">
                  {item.id}
                </span>
              </td>
              <td className="align-middle text-center">
                <span className="text-secondary text-sm font-weight-bold" title={item.name}>
                  {/* {item.name}  */}
                {TruncateString(item.name)}
                </span>
              </td>
              <td className="align-middle text-center">
                <span className="text-secondary text-sm font-weight-bold">
                  {item?.sku}
                </span>
              </td>
              <td className="align-middle text-center">
                <span className="text-secondary text-sm font-weight-bold">
                  {item?.sku}
                </span>
              </td>
              <td className="align-middle text-center">
                <span className="text-secondary text-sm font-weight-bold">
                  {item?.sold_qty}
                </span>
              </td>
              <td className="align-middle text-center">
                <span>
                  <VisibilityIcon sx={{ fontSize: 20 }} 
                  onClick={()=> router.push(`/admin/stock-history/${item.id}`)}
                  />
                </span>
              </td>
            </tr>
          ))}
      </>
    );
  };
  