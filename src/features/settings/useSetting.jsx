import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getSettings } from "../../services/apiSettings";

const useSetting = () => {
  const { isLoading, error, data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, error, settings };
};

export default useSetting;
