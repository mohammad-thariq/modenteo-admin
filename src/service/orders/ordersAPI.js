import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class OrdersApi {
  allOrders = async () => {
    const res = await _axios("get", `/all-order?token=${getToken()}`);
    return res;
  };
  pendingOrders = async () => {
    const res = await _axios("get", `/pending-order?token=${getToken()}`);
    return res;
  };
  progressOrders = async () => {
    const res = await _axios("get", `/pregress-order?token=${getToken()}`);
    return res;
  };
  completedOrders = async () => {
    const res = await _axios("get", `/completed-order?token=${getToken()}`);
    return res;
  };
  deliveryOrder = async () => {
    const res = await _axios("get", `/delivered-order?token=${getToken()}`);
    return res;
  };
  cashOnDelivery = async () => {
    const res = await _axios("get", `/cash-on-delivery?token=${getToken()}`);
    return res;
  };

  declinedOrders = async () => {
    const res = await _axios("get", `/declined-order?token=${getToken()}`);
    return res;
  };
  getOrderShowById = async ({ queryKey }) => {
    const data = { id: queryKey[1] };
    const res = await _axios("get", `/order-show?token=${getToken()}`, data);
    return res;
  };

  deleteOrderById = async (data) => {
    const res = await _axios("post", `/delete-order?token=${getToken()}`, {
      ...data,
    });
    return res;
  };

  updateOrderById = async (data) => {
    const res = await _axios(
      "post",
      `/update-order-status?token=${getToken()}`,
      { ...data }
    );
    return res;
  };
}
