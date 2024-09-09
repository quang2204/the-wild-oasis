import { useQueries, useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiAuth";

const useUser = () => {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUsers,
  });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
};

export default useUser;
