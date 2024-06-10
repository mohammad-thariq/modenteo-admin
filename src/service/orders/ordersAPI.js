import { _axios } from "@/helper/axios";

export class OrdersApi {
  allOrders = async ({queryKey}) => {
    const res = await _axios("get", `/orders?page=${queryKey[1]}&limit=${queryKey[2]}`);
    return res;
  };
  pendingOrders = async ({ queryKey }) => {
    const res = await _axios("get", `/pending-order?page=${queryKey[1]}&limit=${queryKey[2]}`);
    return res;
  };
  progressOrders = async ({ queryKey }) => {
    const res = await _axios("get", `/pregress-order?page=${queryKey[1]}&limit=${queryKey[2]}`);
    return res;
  };
  deliveredOrders = async ({ queryKey }) => {
    const res = await _axios("get", `/delivered-order?page=${queryKey[1]}&limit=${queryKey[2]}`);
    return res;
  };
  dispatchedOrder = async ({ queryKey }) => {
    const res = await _axios("get", `/dispatched-order?page=${queryKey[1]}&limit=${queryKey[2]}`);
    return res;
  };

  declinedOrders = async ({ queryKey }) => {
    const res = await _axios("get", `/declined-order?page=${queryKey[1]}&limit=${queryKey[2]}`);
    return res;
  };

  getOrderById = async ({ queryKey }) => {
    const res = await _axios("get", `/orders/${queryKey[1]}`);
    return res;
  };
  
  getOrderShowById = async ({ queryKey }) => {
    const data = { id: queryKey[1] };
    const res = await _axios("get", `/order-show`, data);
    return res;
  };

  deleteOrderById = async (data) => {
    console.log(data, 'data');
    const res = await _axios("delete", `/orders/delete/${data.id}`)
    return res;
  };

  updateOrderById = async (data) => {
    const res = await _axios(
      "patch",
      `/orders/update/${data.id}`,
      {data}
    );
    return res;
  };
}
