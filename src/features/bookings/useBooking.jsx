import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

export function useBooking() {
  // const { bookingId } = useParams();
  const queryClient = useQueryClient();
  const [seachParams] = useSearchParams();
  const filterValue = seachParams.get("status") || "all";
  const filter =
    filterValue === "null"
      ? null
      : {
          field: "status",
          value: filterValue,
        };
  const sortBy = seachParams.get("sortBy") || "startDate-desc";
  const [field, order] = sortBy.split("-");

  const sort = {
    field,
    order,
  };
  // Pagination
  const page = !seachParams.get("page") ? 1 : parseInt(seachParams.get("page"));
  const {
    isLoading,
    data: { data: booking, count } = {},
    error,
  } = useQuery({
    queryKey: ["booking", filterValue, sort, page],
    queryFn: () => getBookings(filter, sort, page),
    retry: false,
  });

  // Prefetch
  const pageCount = Math.ceil(count / 10);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["booking", filterValue, sort, page + 1],
      queryFn: () => getBookings({ filter, sort, page: page + 1 }),
      retry: false,
    });
  }
  if (page > 1) {
      queryClient.prefetchQuery({
    queryKey: ["booking", filterValue, sort, page - 1],
    queryFn: () => getBookings({ filter, sort, page: page - 1 }),
    retry: false,
  });
  }

  return { isLoading, error, booking, count };
}
