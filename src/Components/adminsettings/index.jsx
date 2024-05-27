import { Breadcrumb } from "@/common/Breadcrumb";
import ProfileCard from "@/common/ProfileCard";

export const AdminSetting = () => {
  return (
    <>
      <Breadcrumb currentPage={"Setting"} serachEnable />
      <ProfileCard Name="Setting"></ProfileCard>
    </>
  );
};
