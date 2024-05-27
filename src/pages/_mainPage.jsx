import { useState, useEffect } from "react";
import { SideBarNav } from "@/common/SideBar";
import { LocalStorageHelper } from "@/utils/localStorage";
import { localStorageConst } from "@/constant/localStorage";
import { Authorization } from "@/Components/Authorization";
import { Base } from "@/common/Base";
import { PageHeader } from "@/common/PageHeader";
import { useRouter } from "next/router";

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

  useEffect(() => {
    const adminAuthToken = LocalStorageHelper.getItem(
      localStorageConst.JWTADMIN
    );
    if (adminAuthToken) setUserPresented(true);
    else setWait(false);
  }, []);

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
