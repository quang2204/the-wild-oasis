import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiAuth, { apiAuthGg_Git } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => apiAuth({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
export function useLoginGG_Git() {
  const queryClient = useQueryClient();
  const { mutate: loginGg_git, isLoadingGg_git } = useMutation({
    mutationFn: (value) => apiAuthGg_Git(value),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { loginGg_git, isLoadingGg_git };
}
export default useLogin;
