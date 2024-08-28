import React from "react";
import { StyledButton, StyledToggle } from "../ui/Menus";
import { useOutsideClick } from "./useOutsideClick";
import { useNavigate } from "react-router-dom";
import useBookingId from "../features/bookings/useBookingId";
import { useBooking } from "../features/bookings/useBooking";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import useDeleteCabin from "../features/cabins/useDeleteCabin";
import useCheck_out from "../features/bookings/Check-in-out/useCheck_out";

const Action = ({
  check,
  setCheck,
  id,
  isLast,
  handCopy,
  setShow,
  setDeleteShow,
  close,
  type,
  status,
}) => {
  const ref = useOutsideClick(close);
  const navigate = useNavigate();
  const { checkout } = useCheck_out();
  const handCheckout = () => {
    checkout(id);
    setCheck(false);
  };
  return (
    <div className="relative ">
      {check === id ? (
        <StyledToggle
          onClick={() => setCheck(null)}
          className={`${type === "cabin" && "text-center"}`}
        >
          {/* <div></div> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-three-dots-vertical"
            viewBox="0 0 16 16"
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          </svg>
        </StyledToggle>
      ) : (
        <StyledToggle
          onClick={() => setCheck(id)}
          className={`${type === "cabin" && "text-center"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-three-dots-vertical"
            viewBox="0 0 16 16"
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          </svg>
        </StyledToggle>
      )}

      {check === id && (
        <div
          className={`flex  justify-center m-auto z-10  flex-col absolute  ${
            isLast ? "bottom-14" : "top-14"
          } ${
            type === "cabin" ? "left-[90px]" : "left-[68px]"
          }  border-[1px] rounded-xl bg-white`}
          ref={ref}
        >
          {type === "cabin" && (
            <>
              <StyledButton
                onClick={handCopy}
                className="flex gap-3 items-center border-b-2 py-4 px-7 "
              >
                <i className="fa-regular fa-copy"></i>
                <div>Copy</div>
              </StyledButton>
              <StyledButton
                onClick={() => setShow(true)}
                className="flex gap-3 items-center  border-b-2 py-4 px-7"
              >
                <i className="fa-regular fa-pen-to-square"></i>
                <div>Update</div>
              </StyledButton>
            </>
          )}
          {type === "booking" && (
            <>
              <StyledButton
                onClick={() => navigate(`/bookings/${id}`)}
                className="flex items-center justify-center border-b-2 w-[98px] py-4"
              >
                <i className="fa-solid fa-circle-info"></i>
                <div>Detail</div>
              </StyledButton>
              {status === "unconfirmed" && (
                <StyledButton
                  onClick={() => navigate(`/checkin/${id}`)}
                  className="flex items-center border-b-2 w-[120px] justify-center  py-4"
                >
                  <i className="fa-solid fa-building-circle-check"></i>
                  <div>Check in</div>
                </StyledButton>
              )}
              {status === "checked-in" && (
                <StyledButton
                  onClick={handCheckout}
                  className="flex items-center border-b-2 justify-center py-3 w-[120px]"
                >
                  <i class="fa-solid fa-money-check-dollar"></i>
                  <div>Check out</div>
                </StyledButton>
              )}
            </>
          )}
          <StyledButton
            onClick={() => setDeleteShow(true)}
            className={`flex gap-3 items-center ${
              type === "cabin" && "py-4 px-7"
            } ${type === "booking" && "flex justify-center w-[104px] py-4"} `}
          >
            <i className="fa-solid fa-trash-can"></i>
            Delete
          </StyledButton>
        </div>
      )}
    </div>
  );
};

export default Action;
