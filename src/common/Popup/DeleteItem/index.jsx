import Image from "next/image";
import style from "./index.module.css";
import { Button } from "@/common/Button";

export const DeleteItem = ({ onClose, onClick, loading }) => {
  return (
    <div className={style.wrapper}>
      <Image
        src={"/assets/img/illustrations/delete.png"}
        width={180}
        height={220}
        objectFit="cover"
        alt=""
      />
      <h4 className="text-lg">Delete Item Confirmation</h4>
      <p className="mb-0">Are you sure delete this item?</p>
      <div className={style.btnWrapper}>
        <Button
          name="Close"
          border="1px solid #dc395f"
          color="#000"
          onClick={onClose}
        />
        <Button
          name="Delete"
          bg="red"
          type="submit"
          color="#fff"
          onClick={onClick}
          isSubmitting={loading}
        />
      </div>
    </div>
  );
};
