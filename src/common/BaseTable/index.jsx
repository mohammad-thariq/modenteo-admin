import { CategoriesTable } from "@/common/BaseTable/TableBody/Categories/CategoriesTable";
import { OrderTable } from "@/common/BaseTable/TableBody/OrderTable";
import { SubCategoriesTable } from "@/common/BaseTable/TableBody/Categories/SubCategoriesTable";
import { ChildCategoriesTable } from "@/common/BaseTable/TableBody/Categories/ChildCategoriesTable";
import { TableHeader } from "./TableHeader";
import { OrderShowTable } from "./TableBody/OrderTable/OrderShow";
import { BrandsTable } from "./TableBody/Products/BrandsTable";
import { SpecKeyTable } from "./TableBody/Products/SpecKeyTable";
import { Product } from "./TableBody/Products/Product";
import { Inventory } from "./TableBody/Inventory";
import ReactPaginate from "react-paginate";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { InputSelect } from "../Form/common/inputSelect";
import { PaginationLimit } from "@/constant/paginationConst";

export const BaseTable = ({
  ref,
  tableHeadings,
  tableTitle,

  // tableDatas starts
  onTableData,
  onCategoriesData,
  onBrandsData,
  onSpecKeyData,
  onInventoryData,
  onProductData,
  onSubCategoriesData,
  onChildCategoriesData,
  onShowOrder,
  // tableDatas ends

  //  Table Depend Data starts
  //  Table Depend Data ends

  //  tableActions starts
  onUpdate,
  onDelete,
  onNavigate,
  isShown = false,
  //  tableActions ends

  // pagintaion starts
  totalPage,
  pageLimit,
  onPaginationLimitClick,
  onPaginationClick,
}) => {
  let tableHeadingList = [];
  let limit = pageLimit;

  tableHeadings?.forEach((item, index) => {
    tableHeadingList.push(<TableHeader index={index} item={item} />);
  });

  console.log(totalPage, "total");
  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header pb-0 flex justify-content-sb">
              <h5>{tableTitle}</h5>
              {/* <InputSelect
                noLabel
                label="total Items"
                onData={PaginationLimit}
                isValue
                name={limit}
                values={limit}
                onChange={onPaginationLimitClick}
              /> */}
            </div>
            <br />
            <div className="card-body px-0 pt-0 pb-2" ref={ref}>
              <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                  <thead className="text-sm">
                    <tr className="font-weight-bold">{tableHeadingList}</tr>
                  </thead>
                  <tbody>
                    {isShown && (
                      <OrderTable
                        ref={ref}
                        onTableData={onTableData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        onNavigate={onNavigate}
                      />
                    )}
                    {onCategoriesData && (
                      <CategoriesTable
                        onCategories={onCategoriesData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onSubCategoriesData && (
                      <SubCategoriesTable
                        onSubCategories={onSubCategoriesData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onChildCategoriesData && (
                      <ChildCategoriesTable
                        onChildCategories={onChildCategoriesData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}

                    {onShowOrder && (
                      <OrderShowTable onShowOrder={onShowOrder} />
                    )}
                    {onBrandsData && (
                      <BrandsTable
                        onBrandsData={onBrandsData}
                        onUpdate={onUpdate}
                      />
                    )}
                    {onSpecKeyData && (
                      <SpecKeyTable
                        onSpecKeyData={onSpecKeyData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}

                    {onProductData && (
                      <Product
                        onProductData={onProductData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}

                    {onInventoryData && (
                      <Inventory onInventoryData={onInventoryData} />
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {totalPage > 1 && (
              <ReactPaginate
                breakLabel="..."
                nextLabel={<ArrowForwardIosRoundedIcon sx={{ fontSize: 18 }} />}
                pageRangeDisplayed={2}
                pageCount={totalPage}
                onPageChange={({ selected }) => onPaginationClick(selected)}
                previousLabel={
                  <ArrowBackIosRoundedIcon sx={{ fontSize: 18 }} />
                }
                renderOnZeroPageCount={null}
                containerClassName={"react-pagination"}
                pageClassName={"page-item"}
                activeClassName={"page-active"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
