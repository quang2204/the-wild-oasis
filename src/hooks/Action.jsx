import React from "react";
import { StyledButton, StyledToggle } from "../ui/Menus";
import { useOutsideClick } from "./useOutsideClick";

const Action = ({
  check,
  setCheck,
  id,
  isLast,
  handCopy,
  setShow,
  setDeleteShow,
  close,
}) => {
  const ref = useOutsideClick(close);
  return (
    <div className="relative flex">
      {check === id ? (
        <StyledToggle onClick={() => setCheck(null)}>
          <div></div>
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
        <StyledToggle onClick={() => setCheck(id)}>
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
          className={`flex  justify-center m-auto z-10  flex-col absolute ${
            isLast ? "bottom-14" : "top-14"
          } left-[40px]  border-[1px] rounded-xl  bg-white`}
          ref={ref}
        >
          <StyledButton
            onClick={handCopy}
            className="flex gap-3 items-center  border-b-2"
          >
            <i className="fa-regular fa-copy"></i>
            <div>Copy</div>
          </StyledButton>
          <StyledButton
            onClick={() => setShow(true)}
            className="flex gap-3 items-center  border-b-2 "
          >
            <i className="fa-regular fa-pen-to-square"></i>
            <div>Update</div>
          </StyledButton>
          <StyledButton
            onClick={() => setDeleteShow(true)}
            className="flex gap-3 items-center "
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
