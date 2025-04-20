import React, { useEffect } from "react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  modalText?: string;
  btnAction: (value: "Cancel" | "Action") => void;
  showFooter?: boolean;
  children?: React.ReactNode;
  size?: "small" | "medium" | "large"; // New prop for modal size
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  modalText,
  // common btnAction, what is there is 3rd CTA of preview?
  btnAction,
  // footer can be extended to array of json so users can add their own footer
  showFooter = true,
  children,
  size = "medium",
}) => {
  //
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalSizeClasses = {
    small: "h-40",
    medium: "h-52",
    large: "h-72",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(0,0,0,0.5)] bg-opacity-50 backdrop-blur-sm"
      aria-hidden={!isOpen}
      onClick={(e) => {
        // why we are accepting cancel event on modal itself instead of cancel CTA?
        // why need of stop propagation here
        e.preventDefault();
        btnAction("Cancel");
      }}
    >
      <div
        className={`flex flex-col bg-white ${modalSizeClasses[size]} rounded-lg px-6 relative max-w-lg w-full shadow-xl`}
      >
        <div className="flex mt-2 justify-end">
          <button
            // create a function above
            onClick={() => btnAction("Cancel")}
            className="text-gray-500 hover:text-gray-700 text-3xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        {children || <div className="flex-1">{modalText}</div>}
        {showFooter && (
          <div className="flex mt-2 justify-end">
            <Button
              // hard coding text
              btnText="Cancel"
              primary={false}
              onClick={() => btnAction("Cancel")}
            />
            <Button
              // hard coding text
              btnText="Delete"
              primary={true}
              onClick={() => btnAction("Action")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
