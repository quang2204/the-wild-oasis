import { DeleteCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();
  const { isLoading: isDelete, mutate: deleteCabin } = useMutation({
    mutationFn: ({ id, img }) => DeleteCabin(id, img),
    onSuccess: () => {
      toast.success("Deleted Successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return {
    deleteCabin,
    isDelete,
  };
};

export default useDeleteCabin;
