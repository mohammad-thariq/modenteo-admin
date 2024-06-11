/* eslint-disable @next/next/no-img-element */
import { Breadcrumb } from "../../common/Breadcrumb";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { TrackingCard } from "./TrackingCard";
import { DashboardConst } from "@/constant/DashBoardConst";
import { ChartBar } from "./ChartBar";
import { ChartLine } from "./ChartLine";
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
  const chartBarsRef = useRef(null);
  const chartLineRef = useRef(null);
  const router = useRouter();
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openDeliveryStatusForm, setOpenDeliveryStatusForm] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(false);
  const [currentOrderData, setCurrentOrderData] = useState(null);
  const { getDashBoard } = new DashBoardApi();
  const { deleteOrderById, updateOrderById } = new OrdersApi();
  const { data, refetch } = useQuery("dashboard", getDashBoard);

  const { mutate, isLoading } = useMutation(deleteOrderById, {
    onSuccess: (data, variables, context) => {
      setOpenDeletePopup(false);
      ToastifySuccess(data?.notification);
      refetch();
    },
    onError: (data, variables, context) => {
      setOpenDeletePopup(true);
      ToastifyFailed(data?.notification);
    },
  });

  const { mutate: updateOrderStatus, isLoading: updateOrderStatusLoading } =
    useMutation(updateOrderById, {
      onSuccess: (data, variables, context) => {
        setOpenDeliveryStatusForm(false);
        refetch();
      },
      onError: (data, variables, context) => {
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

  useEffect(() => {
    const ctxBars = chartBarsRef.current;
    const ctxLine = chartLineRef.current;

    if (ctxBars) {
      if (ctxBars.chart) {
        ctxBars.chart.destroy();
      }
      ctxBars.chart = new Chart(ctxBars, {
        type: "bar",
        data: {
          labels: [
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Sales",
              tension: 0.4,
              borderWidth: 0,
              borderRadius: 4,
              borderSkipped: false,
              backgroundColor: "#fff",
              data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
              maxBarThickness: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
          scales: {
            y: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
              },
              ticks: {
                suggestedMin: 0,
                suggestedMax: 500,
                beginAtZero: true,
                padding: 15,
                font: {
                  size: 14,
                  family: "Open Sans",
                  style: "normal",
                  lineHeight: 2,
                },
                color: "#fff",
              },
            },
            x: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
              },
              ticks: {
                display: false,
              },
            },
          },
        },
      });
    }

    if (ctxLine) {
      if (ctxLine.chart) {
        ctxLine.chart.destroy();
      }
      ctxLine.chart = new Chart(ctxLine, {
        type: "line",
        data: {
          labels: [
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Mobile apps",
              tension: 0.4,
              borderWidth: 0,
              pointRadius: 0,
              // borderColor: "#cb0c9f",
              borderColor: "#dc395f",
              borderWidth: 3,
              // backgroundColor: gradientStroke1,
              fill: true,
              data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
              maxBarThickness: 6,
            },
            {
              label: "Websites",
              tension: 0.4,
              borderWidth: 0,
              pointRadius: 0,
              borderColor: "#3A416F",
              borderWidth: 3,
              // backgroundColor: gradientStroke2,
              fill: true,
              data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
              maxBarThickness: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
          scales: {
            y: {
              grid: {
                drawBorder: false,
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5],
              },
              ticks: {
                display: true,
                padding: 10,
                color: "#b2b9bf",
                font: {
                  size: 11,
                  family: "Open Sans",
                  style: "normal",
                  lineHeight: 2,
                },
              },
            },
            x: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
                borderDash: [5, 5],
              },
              ticks: {
                display: true,
                color: "#b2b9bf",
                padding: 20,
                font: {
                  size: 11,
                  family: "Open Sans",
                  style: "normal",
                  lineHeight: 2,
                },
              },
            },
          },
        },
      });
    }

    return () => {
      if (ctxBars && ctxBars.chart) {
        ctxBars.chart.destroy();
      }
      if (ctxLine && ctxLine.chart) {
        ctxLine.chart.destroy();
      }
    };
  }, []);

  return (
    <>
      <Breadcrumb currentPage={"Dashboard"} serachEnable />
      <div className="container-fluid py-4">
        <div className="row">
          {DashboardConst?.trackingCardData?.slice(0, 4).map((i) => (
            <TrackingCard key={i?.id} {...i} />
          ))}
        </div>
        {/* <div className="row mt-4">
          <ChartBar chartBarsRef={chartBarsRef} />
          <ChartLine chartLineRef={chartLineRef} />
        </div> */}
        <div className="row mt-4">
          {DashboardConst?.trackingCardData?.slice(4, 8).map((i) => (
            <TrackingCard key={i?.id} {...i} />
          ))}
        </div>
        <div className="row mt-4">
          {!data?.todayOrders?.length >= 1 ? (
            <BaseTable
              tableTitle="Today's Order"
              tableHeadings={AllOrderTableHeadings}
              onTableData={data?.todayOrders}
              handleDeleteOrder={handleDeleteOrder}
              handleNavigateOrder={handleNavigateOrder}
              handleDeliveryForm={handleDeliveryForm}
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
