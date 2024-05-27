export const ChartLine = ({chartLineRef}) =>  {
    return(
        <div className="col-lg-7">
        <div className="card">
          <div className="card-header pb-0">
            <h6>Sales overview</h6>
            <p className="text-sm">
              <i className="fa fa-arrow-up text-success"></i>
              <span className="font-weight-bold">4% more</span> in 2021
            </p>
          </div>
          <div className="card-body p-3">
            <div className="chart">
              <canvas
                ref={chartLineRef}
                id="chart-line"
                className="chart-canvas"
                height="300"
              ></canvas>
            </div>
          </div>
        </div>
      </div>
    )
}