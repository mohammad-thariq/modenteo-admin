import { Breadcrumb } from "@/common/Breadcrumb";
import ProfileCard from "@/common/ProfileCard";

export const Admin = () => {
  return (
    <>
      <Breadcrumb currentPage={"Admin"} serachEnable />
      <ProfileCard Name="Admin" Title="">
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0"></div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className=" text-center text-uppercase text-secondary text-sm font-weight-bolder">
                            S No
                          </th>
                          <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder ">
                            Name
                          </th>
                          <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder ">
                            Email
                          </th>
                          <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder ">
                            Image
                          </th>
                          <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder ">
                            Status
                          </th>
                          <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProfileCard>
    </>
  );
};
