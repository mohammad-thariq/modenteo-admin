import { ShowOrdersInvoice } from "@/Components/ShowOrdersInvoice";
import { showOrderConst } from "@/constant/AllorderData";

export default function ShowOrder({ showOrderConst }) {
  return <ShowOrdersInvoice orderDetails={showOrderConst?.order} />;
}

export const getServerSideProps = () => {
  return {
    props: {
      showOrderConst: showOrderConst,
    },
  };
};
