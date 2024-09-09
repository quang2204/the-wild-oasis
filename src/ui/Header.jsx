import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import HearderMenu from "./HearderMenu";
const StyledHeader = styled.header`
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  /* margin-left: -30px; */
  display: flex;
  justify-content: space-between;
  z-index: 900;
  margin-top: 10px;
  position: sticky;
  top: 0px;
  left: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: var(--shadow-md);
  padding: 20px 20px;
`;

function Header({ open, setOpen }) {
  const { pathname } = useLocation();
  const name = pathname.split("/")[1];
  const capitalizedName =
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  return (
    <StyledHeader>
      <div className="flex justify-between items-center text-[19px]">
        <h4 className="text-[16px] font-semibold">
          <span className="font-light opacity-40 text-[15px]">Pages</span> /
          {capitalizedName}
        </h4>
        {/* <i
          className="fa-solid fa-bars cursor-pointer max-[1118px]:block hidden"
          onClick={() => setOpen(!open)}
        ></i> */}

        <div className="max-[1118px]:block hidden">
          <input
            className="label-check"
            id="label-check"
            type="checkbox"
            onChange={() => setOpen(!open)}
          />
          <label htmlFor="label-check" className="hamburger-label">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
            <label></label>
          </label>
        </div>
      </div>
      <HearderMenu></HearderMenu>
    </StyledHeader>
  );
}

export default Header;
