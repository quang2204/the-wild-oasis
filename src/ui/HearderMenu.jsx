import React from "react";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import Logout from "../features/authentication/Logout";
import UseAvartar from "../features/authentication/useAvartar";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";
const StyleHearderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;
const HearderMenu = () => {
  const navigate = useNavigate();
  return (
    <StyleHearderMenu onClick={() => navigate("/account")}>
      <li>
        <UseAvartar></UseAvartar>
      </li>
      
      <li>
        <ButtonIcon>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyleHearderMenu>
  );
};

export default HearderMenu;
