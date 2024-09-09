import { useMutation } from "@tanstack/react-query";
import React from "react";
import { apiSingup } from "../../services/apiAuth";
import toast from "react-hot-toast";

const useSingup = () => {
  const { mutate: singup, isLoading } = useMutation({
    mutationFn: apiSingup,
    onSuccess: (user) => {
      console.log(user);
      toast.success("User created successfully,Please verify your email");
    },
  });
  return { singup, isLoading };
};

export default useSingup;
