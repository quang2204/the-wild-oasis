import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { updateBooking } from "../../../services/apiBookings";

const useCheck_out = () => {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked out`);
      console.log(data);
      queryClient.invalidateQueries({ active: true });
    },
  });
  return { checkout, isCheckout };
};

export default useCheck_out;
