import { _axios } from "@/helper/axios";

export class SettingsAPI {
  //  General Settings
  getSettings = async (data) => {
    const res = await _axios('get', `/settings`)
    return res
  }
  createSettings = async (data) => {
    const res = await _axios(
      "post",
      `/settings/create`,
      data,
    );
    return res;
  };
  //  Men Settings
  getMenSettings = async (data) => {
    const res = await _axios('get', `/settings/men`)
    return res
  }
  createMenSettings = async (data) => {
    const res = await _axios(
      "post",
      `/settings/men/create`,
      data,
    );
    return res;
  };
  //  Women Settings
  getWomenSettings = async (data) => {
    const res = await _axios('get', `/settings/women`)
    return res
  }
  createWomenSettings = async (data) => {
    const res = await _axios(
      "post",
      `/settings/women/create`,
      data,
    );
    return res;
  };
  //  kids Settings
  getKidsSettings = async (data) => {
    const res = await _axios('get', `/settings/kids`)
    return res
  }
  createKidsSettings = async (data) => {
    const res = await _axios(
      "post",
      `/settings/kids/create`,
      data,
    );
    return res;
  };
}
