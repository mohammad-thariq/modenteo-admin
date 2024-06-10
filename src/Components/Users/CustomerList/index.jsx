import { Breadcrumb } from "@/common/Breadcrumb";
import { validateUserTypeEnum } from "@/constant/enum/users.enum";
import { UserApi } from "@/service/user/userAPI";
import { useQuery } from "react-query";

export const CustomerList = () => {
  const {getUserByType} = new UserApi()
  const {data} = useQuery(["get-user-type", validateUserTypeEnum.USER], getUserByType)
  console.log(data, 'data');
  return (
    <>
      <Breadcrumb currentPage={"Customer List"} serachEnable />
    </>
  );
};
