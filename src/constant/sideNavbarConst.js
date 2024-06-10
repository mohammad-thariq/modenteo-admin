import DashboardIcon from "@mui/icons-material/Dashboard";
import GradingIcon from "@mui/icons-material/Grading";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";

export const SideNavConst = {
  routes: [
    {
      heading: "Dashboard",
      url: "/",
      icon: <DashboardIcon sx={{ fontSize: 18 }} />,
    },
    {
      heading: "Order",
      icon: <GradingIcon sx={{ fontSize: 18 }} />,
      subRoutes: [
        {
          name: "All Orders",
          url: "/admin/all-orders",
        },
        {
          name: "Pending Orders",
          url: "/admin/pending-orders",
        },
        {
          name: "Progress Orders",
          url: "/admin/progress-orders",
        },
        {
          name: "Dispatched Orders",
          url: "/admin/dispatched-orders",
        },
        {
          name: "Delivered Orders",
          url: "/admin/delivered-orders",
        },
        {
          name: "Declined Orders",
          url: "/admin/declined-orders",
        },
      ],
    },
    {
      heading: "Manage categories",
      icon: <CategoryIcon sx={{ fontSize: 18 }} />,
      subRoutes: [
        {
          name: "Categories",
          url: "/admin/categories",
        },
        {
          name: "Sub Categories",
          url: "/admin/sub-categories",
        },
      ],
    },
    {
      heading: "Product categories",
      icon: <ProductionQuantityLimitsIcon sx={{ fontSize: 18 }} />,
      subRoutes: [
        {
          name: "Brands",
          url: "/admin/brands",
        },
        {
          name: "Collections",
          url: "/admin/collections",
        },
        {
          name: "Products",
          url: "/admin/products",
        },
        // {
        //   name: "Specification Key",
        //   url: "/admin/specification",
        // },
      ],
    },
    {
      heading: "Ecommerce",
      icon: <ShoppingCartIcon sx={{ fontSize: 18 }} />,
      subRoutes: [
        {
          name: "Payment Method",
          url: "/admin/payment-method",
        },
      ],
    },
    {
      heading: "Users",
      icon: <GroupIcon sx={{ fontSize: 18 }} />,
      subRoutes: [
        {
          name: "Customer List",
          url: "/admin/customer-list",
        },
        {
          name: "Pending Customer",
          url: "/admin/pending-customer",
        },
      ],
    },
  ],
};
