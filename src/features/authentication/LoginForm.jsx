import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import apiAuth from "../../services/apiAuth";
import useLogin from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("quang20042204@gmail.com");
  const [password, setPassword] = useState("uang22");
  const { login, isLoading } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" orientation="vertical">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label="Password" orientation="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          required
          disabled={isLoading}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <FormRow orientation="vertical">
        <Button
          className="w-full flex justify-center items-center gap-3"
          size="large"
          disabled={isLoading || !email || !password}
        >
          {isLoading ? <SpinnerMini /> : ""} LOGIN
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
