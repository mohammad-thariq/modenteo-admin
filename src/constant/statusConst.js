export const statusConstantOption = [
  {
    name: "Active",
    value: 2,
  },
  {
    name: "Inactive",
    value: 1,
  },
];
export const pageTypeConstantOption = [
  {
    name: "Service",
    value: 'service',
  },
  {
    name: "Company",
    value: 'company',
  },
];
export const orderStatusOptions = {
  paymentStatus: [
    {
      name: "Pending",
      value: 1,
    },
    {
      name: "Success",
      value: 2,
    },
  ],
  orderStatus: [
    {
      name: "Pending",
      value: 1,
    },
    {
      name: "In Progress",
      value: 2,
    },
    {
      name: "Delivered",
      value: 3,
    },
    {
      name: "Completed",
      value: 4,
    },
    {
      name: "Declined",
      value: 5,
    },
  ],
  deliveryMan: [
    {
      name: "Sarah Jahan",
      id: 1,
    },
  ],
};

export const OfferTypeOptions = [
  {
    name: "Percentage(%)",
    value: 1
  },
  {
    name: "Amount(Rs)",
    value: 2
  }
]

export const ShippingRuleType = [
  {
    name: "Base on product price(Rs)",
    value: "base_on_price",
    displayValue: "Rs"
  },
  {
    name: "Base on product weight(g)",
    value: "base_on_weight",
    displayValue: "g"

  },
  {
    name: "Base on product quantity(qty)",
    value: "base_on_quantity",
    displayValue: "qty"

  },
]

export const paymentMethods = [
  {
    id: 1,
    name: "Strip Payment",
    description: "Discover Merchant Service Solutions to Accept Payments Online or Virtually Anywhere.",
    action: "Edit",
    bgImage: "https://kinsta.com/wp-content/uploads/2017/01/stripe-for-wordpress.png"
  },
  {
    id: 2,
    name: "RazorPay Payment",
    description: "Razorpay is the only payments solution in India that allows businesses to accept, process and disburse payments with its product suite",
    action: "Edit",
    bgImage: "https://razorpay.com/assets/payments-app/OG.jpg"
  },
  {
    id: 3,
    name: "Bank Account",
    description: "A bank account is a financial arrangement between an individual or a business and a banking institution.",
    action: "Edit",
    bgImage: "https://images.prismic.io/statrys/ZjCOFt3JpQ5PTQi6_best-savings-acc-usa-meta.png?ixlib=gatsbyFP&auto=format%2Ccompress&fit=max"
  },
  {
    id: 4,
    name: "Cash On Delivery",
    description: "Cash on delivery (COD) is a type of transaction where the recipient pays for a good at the time of delivery rather than using credit.",
    action: "Edit",
    bgImage: "https://png.pngtree.com/png-clipart/20210523/original/pngtree-cash-on-delivery-green-stamp-cod-png-image_6331297.jpg"
  },
]

export const paymentMethodsName = {
  STRIP: "Strip Payment",
  RAZOR: "RazorPay Payment",
  BANK: "Bank Account",
  COD: "Cash On Delivery"
}