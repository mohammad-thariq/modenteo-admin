import { Button } from "@/common/Button";

export const Actions = ({ handleOpenUserStatus, handleDeleteOrder }) => {
  return (
    <div className="card mt-4">
      <div className="card-body p-3">
        <div className="flex justify-content-sb flex-wrap align-item-center gap-sm-2">
          <Button
            name="User Status"
            bg="#000"
            color="#fff"
            onClick={handleOpenUserStatus}
          />
          <div className="flex  align-item-center gap-2">
            <Button
              name="Delete User"
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
