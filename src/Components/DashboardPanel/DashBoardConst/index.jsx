import React from "react";
import { TrackingCard } from "@/Components/DashboardPanel/TrackingCard";
const DashboardConst = ({ data }) => {
    const trackingCardData = [
        {
            id: 1,
            name: "Total Order",
            count: data?.totalOrder,
            icon: "ni ni-money-coins text-lg opacity-10"
        },
        {
            id: 2,
            name: "Pending Orders",
            count: data?.pendingOrder,
            icon: "ni ni-world text-lg opacity-10"
        },
        {
            id: 3,
            name: "Declined Order",
            count: data?.declinedOrder,
            icon: "ni ni-paper-diploma text-lg opacity-10"
        },
        {
            id: 4,
            name: "Total User",
            count: data?.totalUser,
            icon: "ni ni-cart text-lg opacity-10"
        },
        {
            id: 5,
            name: "Total Product",
            count: data?.totalProduct,
            icon: "ni ni-money-coins text-lg opacity-10"
        },
        {
            id: 6,
            name: "Total Sales",
            count: data?.totalSales != null ? data?.totalSales : 0,
            icon: "ni ni-world text-lg opacity-10"
        },
        {
            id: 7,
            name: "Complete Order",
            count: data?.completeOrder,
            icon: "ni ni-cart text-lg opacity-10"
        }
    ];

    return (

        <div>
            <div className="row">
                {trackingCardData?.slice(0, 4).map((i) => (
                    <TrackingCard key={i?.id} {...i} />
                ))}
            </div>
            <div className="row mt-4">
                {trackingCardData?.slice(4, 8).map((i) => (
                    <TrackingCard key={i?.id} {...i} />
                ))}
            </div>
        </div>
    );
};

export default DashboardConst;
