import { BaseTable } from "@/common/BaseTable";
import { Breadcrumb } from "@/common/Breadcrumb";
import { Loader } from "@/common/Loader";
import { NoDataFound } from "@/common/NoDataFound";
import { InventoryTableHeading } from "@/constant/tableHeading";
import { InventoryAPI } from "@/service/inventory/InventoryAPI";
import { useQuery } from "react-query";

export const Inventory = () => {
  const { inventory } = new InventoryAPI();
  const { data, isLoading, refetch } = useQuery(["inventory"], inventory);

  if (data && !data) {
    return <NoDataFound />
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Breadcrumb currentPage={"Inventory"} serachEnable />
      <BaseTable tableHeadings={InventoryTableHeading} onInventoryData={data} />
    </>
  );
};
