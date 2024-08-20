import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCabins } from "../../services/apiCabins";

const useCabin = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });

  return { isLoading, data };
};

export default useCabin;
