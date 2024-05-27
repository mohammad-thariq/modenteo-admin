import { localStorageConst } from "@/constant/localStorage";
import { _axios } from "@/helper/axios";
import { LocalStorageHelper } from "@/utils/localStorage";

const getToken = () => {
  let token = LocalStorageHelper.getItem(localStorageConst.JWTADMIN);
  return token;
};

export class EcommerceAPI {
    flashSale = async ()=>{
        const res = await _axios("get" , `/flash-sale?token=${getToken()}`)
        return res
    }

    updateFlashSale = async (data) => {
        const res = await _axios("post" , `/update-flash-sale?token=${getToken()}`, data)
        return res
    }

    flashSaleProduct = async () => {
        const res = await _axios("get" , `/flash-sale-product?token=${getToken()}`)
        return res
    }

    createFlashSaleProduct = async (data) => {
        const res = await _axios("post" , `/store-flash-sale-product?token=${getToken()}`, data)
        return res
    }

    updateFlashSaleProduct = async (data) => {
        const res = await _axios("post" , `/flash-sale-product-status?token=${getToken()}`, data)
        return res
    }

    deleteFlashSaleProduct = async (data) => {
        const res = await _axios("post" , `/delete-flash-sale-product?token=${getToken()}`, data)
        return res
    }

    coupon = async () => {
        const res = await _axios("get" , `/coupon?token=${getToken()}`)
        return res
    }

    createCoupon = async (data) => {
        const res = await _axios("post" , `/coupon/create?token=${getToken()}`, data)
        return res
    }

    updateCoupon = async (data) => {
        const res = await _axios("post" , `/coupon/update?token=${getToken()}`, data)
        return res
    }

    deleteCoupon = async (data) => {
        const res = await _axios("delete" , `/coupon/delete?token=${getToken()}`, data)
        return res
    }

    shipping = async () => {
        const res = await _axios("get" , `/shipping?token=${getToken()}`)
        return res
    }

    createShipping = async (data) => {
        const res = await _axios("post" , `/shipping/store?token=${getToken()}`, data)
        return res
    }

    updateShipping = async (data) => {
        const res = await _axios("post" , `/shipping/update?token=${getToken()}`, data)
        return res
    }

    deleteShipping = async (data) => {
        const res = await _axios("delete" , `/shipping/delete?token=${getToken()}`, data)
        return res
    }

    paymentMethod = async () => {
        const res = await _axios("get" , `/payment-method?token=${getToken()}`)
        return res
    }

    updateStipe = async (data) => {
        const res = await _axios("post" , `/update-stripe?token=${getToken()}`, data)
        return res
    }
    updateRazorpay = async (data) => {
        const res = await _axios("post" , `/update-razorpay?token=${getToken()}`, data)
        return res
    }
    updateBank = async (data) => {
        const res = await _axios("post" , `/update-bank?token=${getToken()}`, data)
        return res
    }
    updateCod = async (data) => {
        const res = await _axios("post" , `/update-cash-on-delivery?token=${getToken()}`, data)
        return res
    }
}