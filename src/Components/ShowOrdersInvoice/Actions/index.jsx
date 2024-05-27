import { Button } from "@/common/Button";

export const Actions = ({
  handleOpenOrderStatus,
  handleDeleteOrder,
  exportPDF,
}) => {
  return (
    <div className="card mt-4">
      <div className="card-body p-3">
        <div className="flex justify-content-sb flex-wrap align-item-center gap-sm-2">
          <Button
            name="Order Status"
            bg="#000"
            color="#fff"
            onClick={handleOpenOrderStatus}
          />
          <div className="flex  align-item-center gap-2">
            <Button
              name="Print"
              bg="#dc395f"
              color="#fff"
              onClick={exportPDF}
            />
            <Button
              name="Delete"
              bg="red"
              color="#fff"
              onClick={handleDeleteOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
