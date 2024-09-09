import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import CabinRow from "../features/cabins/CabinRow";
import CabinTable from "../features/cabins/CabinTable";
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 55rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
  margin: auto;
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h1" className="text-center">
        Login
      </Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
