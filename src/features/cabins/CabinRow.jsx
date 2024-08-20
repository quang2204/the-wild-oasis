import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";

import { useState } from "react";

import UpdateCabinForm from "./UpdateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import ConfirmDelete from "../../ui/ConfirmDelete";
// import Menus, { StyledButton, StyledToggle } from "../../ui/Menus";
import useSliderClick from "../../hooks/useSliderClick";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import Action from "../../hooks/Action";
// v1
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1fr 1fr 1fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  /* transform: scale(1.66666) translateX(-2px); */
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
// const queryClient = useQueryClient();

const CabinRow = ({
  cabin,
  index,
  check,
  handcheck,
  isLast,
  close,
  setCheck,
}) => {
  const [showCabin, setShowCabin] = useState(false);
  const [deleteshowCabin, setDeleteShowCabin] = useState(false);
  const { deleteCabin, isDelete } = useDeleteCabin();

  const [error, setError] = useState(true);
  const queryClient = useQueryClient();
  const Delete = (id, image) => {
    const filename = image.split("/").pop();
    deleteCabin({ id, img: filename });
  };

  const [showMenu, setShowMenu] = useState(false);
  const { mutate, isLoading } = useMutation({
    mutationFn: addEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      // reset();
      setShowCabin(false);
    },
    onError: (err) => toast.error(err.message),
  });
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;
  const handCopyCabin = () => {
    mutate({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
    close();
  };
  const handleImageError = (event) => {
    event.target.src =
      "https://jfyctkgwzapudocvktmy.supabase.co/storage/v1/object/public/cabin-images/0.9171104444802938-qbit.png"; // Thay bằng đường dẫn ảnh dự phòng
    event.target.alt = "Đang cập nhật ảnh";
    setError(false);
  };

  return (
    <>
      <TableRow>
        <Cabin>{index + 1}</Cabin>
        <Cabin className="text-left">{name}</Cabin>
        <div className="flex justify-center ml-5">
          <Img
            src={image}
            alt="Hình ảnh"
            onError={handleImageError}
            className="flex justify-center"
          />
        </div>
        <div>Fits up tp {maxCapacity} </div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount ? formatCurrency(discount) : "---"}</Discount>
        <Action
          id={cabinId}
          check={check}
          setCheck={setCheck}
          handCopy={handCopyCabin}
          setShow={setShowCabin}
          isLast={isLast}
          close={close}
          setDeleteShow={setDeleteShowCabin}
        ></Action>
      </TableRow>
      {showCabin && (
        <UpdateCabinForm
          setShowCabin={setShowCabin}
          cabin={cabin}
        ></UpdateCabinForm>
      )}
      {deleteshowCabin && (
        <ConfirmDelete
          onConfirm={() => Delete(cabinId, image)}
          closeModal={() => setDeleteShowCabin(false)}
          resource={name}
          disabled={isDelete}
        ></ConfirmDelete>
      )}
    </>
  );
};

export default CabinRow;
