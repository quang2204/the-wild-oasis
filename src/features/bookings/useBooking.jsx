import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

export function useBooking() {
  // const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBookings(),
    retry: false,
  });
  return { isLoading, error, booking };
}
