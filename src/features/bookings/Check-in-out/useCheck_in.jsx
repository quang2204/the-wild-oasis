import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { updateBooking } from "../../../services/apiBookings";
import { useNavigate } from "react-router-dom";
const useCheck_in = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckin } = useMutation({
    mutationFn: ({ id, breakfast }) =>
      updateBooking(id, {
        status: "checked-in",
        isPaid: breakfast.hasBreakfast,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
      navigate("/bookings");
    },
  });

  return { checkin, isCheckin };
};

export default useCheck_in;
