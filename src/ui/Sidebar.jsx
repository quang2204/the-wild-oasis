import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 0;
  border-right: 1px solid #e9e0e0;
  position: fixed;
  top: 0;
  left: 0px;
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  height: 100%;
  width: 230px;
  transition: 0.5s ease-in all;
  z-index: 999;
  /* @media (max-width: 1118px) {
    transform: translateX(-250px);
  } */
`;

function Sidebar({ open }) {
  return (
    <StyledSidebar
      className={`${open ? "max-[1118px]:-translate-x-[250px] " : ""}`}
    >
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
