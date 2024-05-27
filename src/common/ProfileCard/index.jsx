/* eslint-disable @next/next/no-img-element */
export default function ProfileCard({ Name, Title, children, image }) {
  return (
    <div className="container-fluid">
      <div
        className="page-header min-height-300 border-radius-xl mt-4"
        style={{
          backgroundImage:
            "url('../assets/img/curved-images/curved0.jpg'); background-position-y: 50%",
        }}
      >
        <span className="mask bg-gradient-primary opacity-6"></span>
      </div>
      <div className="card card-body blur shadow-blur mx-4 mt-n6 overflow-hidden profile-card">
        <div className="row gx-4">
          <div className="col-auto">
           {image && <div className="avatar avatar-xl position-relative">
              <img
                src={image}
                alt="profile_image"
                className="w-100 border-radius-lg shadow-sm"
              />
            </div>
}
          </div>
          <div className="col-auto my-auto">
            <div className="h-100">
              <h5 className="mb-1">{Name}</h5>
              <p className="mb-0 font-weight-bold text-sm">{Title}</p>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
