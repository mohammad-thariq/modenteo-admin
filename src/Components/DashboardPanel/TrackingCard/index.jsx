export const TrackingCard = (props) => {
    const {name, count, icon} = props
    return(
        
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-capitalize font-weight-bold">
                      {name}
                    </p>
                    <h5 className="font-weight-bolder mb-0">
                      {count}
                      <span className="text-success text-sm font-weight-bolder">
                        
                      </span>
                    </h5>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                    <i
                      className={icon}
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    
    )
}