import { ThreeDots } from "react-loader-spinner";
import "../../styles/button.css";
export const Button = ({
  name,
  bg,
  type,
  color,
  onClick,
  isSubmitting,
  border,
  w,
  icon,
}) => {
  return (
    <div className="text-center">
      <button
        onClick={onClick}
        type={type}
        style={{ background: bg, color: color, border: border }}
        className={`btn w-${w || "100"} mt-4 mb-0`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ThreeDots
            color="#fff"
            wrapperStyle={{ justifyContent: "center" }}
            height={20}
            width={40}
          />
        ) : (
          name
        )}
      </button>
    </div>
  );
};
