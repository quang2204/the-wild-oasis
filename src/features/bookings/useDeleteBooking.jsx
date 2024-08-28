import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
const useDeleteBooking = () => {

  const queryClient = useQueryClient();
  const { isLoading: isDelete, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Deleted Successfully");
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
    },

    onError: (err) => toast.error(err.message),
  });
  return {
    deleteBooking,
    isDelete,
  };
};

export default useDeleteBooking;
