import "../styles/globals.css";
import "../../public/assets/css/nucleo-icons.css";
import "../../public/assets/css/nucleo-svg.css";
import "../../public/assets/css/nucleo-svg.css";
import "../../public/assets/css/soft-ui-dashboard.css?v=1.0.3";
import "material-icons/iconfont/material-icons.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import MainPage from "./_mainPage";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MainPage Component={Component} pageProps={pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={10000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </QueryClientProvider>
    </>
  );
}
