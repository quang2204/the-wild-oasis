import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import { useState } from "react";
import useToggles from "../hooks/useToggle";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 23rem 50fr;
  grid-template-rows: auto 1fr;
  /* min-height: 100vh; */
  height: 100%;
`;

const Main = styled.main`
  min-height: 100vh;

  background-color: var(--color-grey-50);

  /* z-index: 990; */
  @media (max-width: 1118px) {
    margin-left: -220px;
  }
`;

const Container = styled.div`
  max-width: 121rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  /* margin-top: 50px; */
  padding: 0 10px;
`;

function AppLayout() {
  const [open, setOpen] = useState(false);

  return (
    <StyledAppLayout>
      {/* <Header /> */}
      <div></div>
      <Sidebar open={open} />
      <Main>
        <Container>
          <Header setOpen={setOpen} open={open}></Header>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
