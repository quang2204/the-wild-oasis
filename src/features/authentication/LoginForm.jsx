import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useLogin, { useLoginGG_Git } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("quang2004@gmail.com");
  const [password, setPassword] = useState("2004");
  const { login, isLoading } = useLogin();
  const { loginGg_git, isLoadingGg_git } = useLoginGG_Git();
  console.log(isLoadingGg_git);
  function handleSubmit() {
    login({ email, password });
  }
  const handleloginGg_Git = (value) => {
    loginGg_git(value);
  };
  return (
    <div>
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
          onClick={handleSubmit}
        >
          {isLoading ? <SpinnerMini /> : ""} Login
        </Button>
        <Button
          className="w-full flex justify-center items-center gap-3"
          size="large"
          disabled={isLoadingGg_git}
          onClick={() => handleloginGg_Git("gg")}
        >
          {isLoadingGg_git ? <SpinnerMini /> : ""} Login Google
        </Button>
        <Button
          className="w-full flex justify-center items-center gap-3"
          size="large"
          disabled={isLoadingGg_git}
          onClick={() => handleloginGg_Git("git")}
        >
          {isLoadingGg_git ? <SpinnerMini /> : ""} Login GitHub
        </Button>
      </FormRow>
    </div>
  );
}

export default LoginForm;
