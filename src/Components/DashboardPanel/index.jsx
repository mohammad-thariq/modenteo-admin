/* eslint-disable @next/next/no-img-element */
import { Breadcrumb } from "../../common/Breadcrumb";
import React, { useCallback, useState } from "react";
import DashboardConst from "./DashBoardConst";
import { BaseTable } from "@/common/BaseTable";
import { useRouter } from "next/router";
import { Popup } from "@/common/Popup";
import { DeleteItem } from "@/common/Popup/DeleteItem";
import { DeliveryStatusForm } from "@/common/Form/DeliveryStatusForm";
import { DashBoardApi } from "@/service/dashboard/dashboardAPI";
import { useMutation, useQuery } from "react-query";
import { OrdersApi } from "@/service/orders/ordersAPI";
import { _axios } from "@/helper/axios";
import { ToastifyFailed, ToastifySuccess } from "@/common/Toastify";
import { NoDataFound } from "@/common/NoDataFound";
import { AllOrderTableHeadings } from "@/constant/tableHeading";

export const DashboardPanel = () => {
  const router = useRouter();
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openDeliveryStatusForm, setOpenDeliveryStatusForm] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(false);
  const [currentOrderData, setCurrentOrderData] = useState(null);
  const { deleteOrderById, updateOrderById } = new OrdersApi();
  const { dashboard } = new DashBoardApi();
  const { data } = useQuery(["dashboard"], dashboard);
  console.log(data?.todayOrders, 'todayOrderstodayOrders')
  const { mutate, isLoading } = useMutation(deleteOrderById, {
    onSuccess: (data) => {
      setOpenDeletePopup(false);
      ToastifySuccess(data?.notification);
      refetch();
    },
    onError: (data) => {
      setOpenDeletePopup(true);
      ToastifyFailed(data?.notification);
    },
  });

  const { mutate: updateOrderStatus, isLoading: updateOrderStatusLoading } =
    useMutation(updateOrderById, {
      onSuccess: () => {
        setOpenDeliveryStatusForm(false);
        refetch();
      },
      onError: () => {
        setOpenDeliveryStatusForm(true);
      },
    });

  const handleDeleteOrder = (id) => {
    setCurrentOrderId(id);
    setOpenDeletePopup(!openDeletePopup);
  };

  const handleDelete = () => {
    mutate({ id: currentOrderId });
  };

  const handleNavigateOrder = (id) => {
    router?.push(`/admin/show-order/${id}`);
  };

  const handleDeliveryForm = useCallback(
    (id) => {
      setCurrentOrderId(id);
      const orderData = data?.todayOrders?.find((i) => i?.id === id);
      setCurrentOrderData(orderData);
      if (currentOrderData) setOpenDeliveryStatusForm(!openDeliveryStatusForm);
    },
    [currentOrderData, data?.todayOrders, openDeliveryStatusForm]
  );
  const onPaginationClick = (page) => {
    setPage(Number(page) + 1);
  };

  return (
    <>
      <Breadcrumb currentPage={"Dashboard"} serachEnable />
      <div className="container-fluid py-4">
        <DashboardConst data={data} />
        <div className="row mt-4">
          {data?.todayOrders && data?.todayOrders?.length > 0 ? (
            <BaseTable
              tableTitle="Today's Order"
              onTableData={data?.todayOrders}
              onDelete={handleDeleteOrder}
              onUpdate={handleDeliveryForm}
              tableHeadings={AllOrderTableHeadings}
              isShown
              onPaginationClick={onPaginationClick}
              totalPage={data?.pagination?.totalPage}
            />
          ) : (
            <>
              {" "}
              <div className="card-header pb-0">
                <h5 style={{ margin: "20px" }}> Today Orders</h5>
                <NoDataFound noHeader />
              </div>
            </>
          )}
        </div>
      </div>
      {openDeletePopup && (
        <Popup open={openDeletePopup} onClose={handleDeleteOrder}>
          <DeleteItem
            onClose={handleDeleteOrder}
            onClick={handleDelete}
            loading={isLoading}
          />
        </Popup>
      )}
      {openDeliveryStatusForm && (
        <Popup open={openDeliveryStatusForm} onClose={handleDeliveryForm}>
          <DeliveryStatusForm
            onClose={() => setOpenDeliveryStatusForm(false)}
            data={currentOrderData}
            currentOrderId={currentOrderId}
            updateOrderStatus={updateOrderStatus}
            updateOrderStatusLoading={updateOrderStatusLoading}
          />
        </Popup>
      )}
    </>
  );
};
