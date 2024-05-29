import { LocalStorageHelper } from "@/utils/localStorage";
import { BaseUrls } from "../../env";
import { localStorageConst } from "@/constant/localStorage";

const axios = require("axios").default;
const BASE_URL = process.env.NEXT_SHOPOADMIN_BASE_URL;


const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

// _axios(http method, api endpoint, data)
export const _axios = async (method, url, body, contentType) => {
  const res = await axios({
    headers: {
      "Content-Type": contentType || "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    method: method,
    url: BASE_URL ? BASE_URL : BaseUrls?.BASE_URL + url,
    data: body,
  })
    .then((res) => res?.data)
    .catch((err) => err);
  return res;
};
