import { CategoriesTable } from "@/common/BaseTable/TableBody/Categories/CategoriesTable";
import { OrderTable } from "@/common/BaseTable/TableBody/OrderTable";
import { SubCategoriesTable } from "@/common/BaseTable/TableBody/Categories/SubCategoriesTable";
import { TableHeader } from "./TableHeader";
import { OrderShowTable } from "./TableBody/OrderTable/OrderShow";
import { BrandsTable } from "./TableBody/Products/BrandsTable";
import { CollectionsTable } from "./TableBody/Products/CollectionsTable";
import { CustomerServiceTable } from "./TableBody/ManageWebsite/CustomerServiceTable";
import { FashionProductTable } from "./TableBody/ManageWebsite/FashionProductTable";
import { SpecKeyTable } from "./TableBody/Products/SpecKeyTable";
import { Product } from "./TableBody/Products/Product";
import { Inventory } from "./TableBody/Inventory";
import ReactPaginate from "react-paginate";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { PopularProductTable } from "./TableBody/ManageWebsite/PopularProductTable";
import { DiscountBannerTable } from "./TableBody/ManageWebsite/DiscountBannerTable";
import { SpotlightTable } from "./TableBody/ManageWebsite/SpotlightTable";
import { HeroBannerTable } from "./TableBody/ManageWebsite/HeroBannerTable";
import { PageTable } from "./PageTable";
import { UserTable } from "./TableBody/UserTable";
import { AdminListTable } from "./TableBody/AdminList/AdminListTable";
import { VariantsTable } from "./TableBody/Products/VariantsTable";
import { VariantSizeTable } from "./TableBody/VariantSizeTable";
export const BaseTable = ({
  ref,
  tableHeadings,
  tableTitle,

  // tableDatas starts
  onTableData,
  onCategoriesData,
  onBrandsData,
  onVariantsData,
  onCollectionsData,
  onCustomerServiceData,
  onFashionProductData,
  onPopularProductsData,
  onDiscountBannerData,
  onSpotlightData,
  onSpecKeyData,
  onInventoryData,
  onProductData,
  onHeroBannerData,
  onSubCategoriesData,
  onShowOrder,
  onPageData,
  onUserData,
  onVariantSizesData,
  onAdminListData,
  // tableDatas ends

  //  Table Depend Data starts
  //  Table Depend Data ends

  //  tableActions starts
  onUpdate,
  onDelete,
  openVariant,
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
    tableHeadingList.push(
      <TableHeader key={index} index={index} item={item} />
    );
  });

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

                    {onShowOrder && (
                      <OrderShowTable onShowOrder={onShowOrder} />
                    )}
                    {onBrandsData && (
                      <BrandsTable
                        onBrandsData={onBrandsData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onVariantSizesData && (
                      <VariantSizeTable
                        onVariantSizesData={onVariantSizesData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}

                    {onVariantsData && (
                      <VariantsTable
                        onVariantsData={onVariantsData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}

                    {onCollectionsData && (
                      <CollectionsTable
                        onCollectionsData={onCollectionsData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onCustomerServiceData && (
                      <CustomerServiceTable
                        onCustomerServiceData={onCustomerServiceData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onFashionProductData && (
                      <FashionProductTable
                        onFashionProductData={onFashionProductData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onPopularProductsData && (
                      <PopularProductTable
                        onPopularProductsData={onPopularProductsData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onDiscountBannerData && (
                      <DiscountBannerTable
                        onDiscountBannerData={onDiscountBannerData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onSpotlightData && (
                      <SpotlightTable
                        onSpotlightData={onSpotlightData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onPageData && (
                      <PageTable
                        onPageData={onPageData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}
                    {onHeroBannerData && (
                      <HeroBannerTable
                        onHeroBannerData={onHeroBannerData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
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
                        openVariant={openVariant}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
                    )}

                    {onInventoryData && (
                      <Inventory onInventoryData={onInventoryData} />
                    )}

                    {onUserData && (
                      <UserTable
                        onUserData={onUserData}
                        onNavigate={onNavigate}
                        onDelete={onDelete}
                      />
                    )}

                    {onAdminListData && (
                      <AdminListTable
                        onAdminListData={onAdminListData}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                      />
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
