import React, { useEffect } from "react";

const CustomScript = () => {
  useEffect(() => {
    const win = navigator.platform.indexOf("Win") > -1;
    if (win && document.querySelector("#sidenav-scrollbar")) {
      const options = {
        damping: "0.5",
      };
      // Assuming you have imported Scrollbar from wherever it's defined.
      Scrollbar.init(document.querySelector("#sidenav-scrollbar"), options);
    }
  }, []);

  return null; // Since this is just a script, we don't render anything
};

export default CustomScript;
