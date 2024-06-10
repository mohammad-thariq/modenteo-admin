import { useState, useEffect } from "react";
import { SideBarNav } from "@/common/SideBar";
import { LocalStorageHelper } from "@/utils/localStorage";
import { localStorageConst } from "@/constant/localStorage";
import { Authorization } from "@/Components/Authorization";
import { Base } from "@/common/Base";
import { PageHeader } from "@/common/PageHeader";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { AuthorizationApi } from "@/service/auth/auth";
import { SetExpireToken } from "@/hooks/expire";

const authorized = (Component, pageProps) => (
  <>
    <SideBarNav />
    <Base>
      <Component {...pageProps} />
    </Base>
  </>
);

const MainPage = ({ Component, pageProps }) => {
  const router = useRouter()
  const [userPresented, setUserPresented] = useState(false);
  const [wait, setWait] = useState(true);
  const {validateToken} = new AuthorizationApi()
  const { data } = useQuery(["validate-token"], validateToken)

  console.log(data, 'validate');

  useEffect(() => {
    const adminAuthToken = LocalStorageHelper.getItem(
      localStorageConst.JWTADMIN
    );
    if (adminAuthToken) {
      setUserPresented(true)
    }
    else setWait(false);
  }, []);

  useEffect(() => {
    const adminAuthToken = LocalStorageHelper.getItem(
      localStorageConst.JWTADMIN
    );
    if (adminAuthToken && data) {
      SetExpireToken(data)
    }else null
  }, [data])

  return (
    <div>
      <PageHeader title={router?.asPath}/>
      {userPresented
        ? authorized(Component, pageProps)
        : !wait && <Authorization />}
    </div>
  );
};

export default MainPage;
