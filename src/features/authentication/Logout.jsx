import React from "react";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "./useLogout";
const Logout = () => {
  const { isLoading, logout } = useLogout();
  const handleLogout = () => {
    if (confirm("Bạn chắc chắn muốn đăng xuất k ")) {
      logout();
    }
  };

  return (
    <ButtonIcon disabled={isLoading} onClick={handleLogout}>
      <HiArrowRightOnRectangle/>
    </ButtonIcon>
  );
};

export default Logout;
