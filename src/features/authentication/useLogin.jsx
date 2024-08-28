import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import apiAuth from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => apiAuth({ email, password }),
    onSuccess: (user) => {
        queryClient.setQueryData(["user"], user);
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error("Provided email or password are incorrect");
    },
  });
  return { login, isLoading };
};

export default useLogin;
