import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

const useBookingId = () => {
  const { id } = useParams();
  const {
    isLoading,
    error,
    data: bookingId,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
    retry: false,
  });
  return { isLoading, error, bookingId };
};

export default useBookingId;
