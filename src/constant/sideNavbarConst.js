import DashboardIcon from "@mui/icons-material/Dashboard";
import GradingIcon from "@mui/icons-material/Grading";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import SettingsIcon from "@mui/icons-material/Settings";
import { CheckOutlined, ChildCare, ChildFriendly, Man, Man2, Pages, PriceCheckOutlined, ProductionQuantityLimitsTwoTone, Woman } from "@mui/icons-material";
import Settings from "@mui/icons-material/Settings";
import ProductionQuantityLimits from "@mui/icons-material/ProductionQuantityLimits";
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
      heading: "Manage Website",
      icon: <SettingsApplicationsIcon sx={{ fontSize: 18 }} />,
      subRoutes: [
        {
          name: "Hero Banner",
          url: "/admin/hero-banner",
        },
        {
          name: "Discount Banner",
          url: "/admin/discount-banner",
        },

        {
          name: "Spot Light",
          url: "/admin/spotlight-products",
        },
        {
          name: "Popular Products",
          url: "/admin/popular-products",
        },
        {
          name: "Fashion Products",
          url: "/admin/fashion-products",
        },
        {
          name: "Customer Service",
          url: "/admin/customer-service",
        },
      ],
    },
    {
      heading: "Settings",
      url: "/admin/website-settings",
      icon: <SettingsIcon sx={{ fontSize: 18 }} />,
    },
    {
      heading: "Men Settings",
      url: "/admin/men-settings",
      icon: <Man sx={{ fontSize: 18 }} />,
    },
    {
      heading: "Women Settings",
      url: "/admin/women-settings",
      icon: <Woman sx={{ fontSize: 18 }} />,
    },
    {
      heading: "Kids Settings",
      url: "/admin/kids-settings",
      icon: <ChildCare sx={{ fontSize: 18 }} />,
    },
    {
      heading: "Pages",
      url: "/admin/pages",
      icon: <Pages sx={{ fontSize: 18 }} />,
    },
    {
      heading: "Variant Sizes",
      url: "/admin/variant-size",
      icon: <ProductionQuantityLimitsTwoTone sx={{ fontSize: 18 }} />,
    },

    {
      heading: "Users",
      icon: <GroupIcon sx={{ fontSize: 18 }} />,
      subRoutes: [
        {
          name: "Customer List",
          url: "/admin/customer-list",
        },
        // {
        //   name: "Pending Customer",
        //   url: "/admin/pending-customer",
        // },
      ],
    },
  ],
};
