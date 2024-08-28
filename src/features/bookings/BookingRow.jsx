import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import Table from "../../ui/Table";
import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import Tag from "../../ui/Tag";
import Action from "../../hooks/Action";
import { useState } from "react";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDleteBooking from "./useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

const BookingRow = ({ booking, index, check, setCheck, close, isLast }) => {
  const [showCabin, setShowCabin] = useState(false);
  const [deleteshowCabin, setDeleteShowCabin] = useState(false);
  const { deleteBooking, isDelete } = useDleteBooking();
  const {
    cabins: { name: cabinName },
    created_at,
    endDate,
    guests: { email, fullName: guestName },
    id,
    numGuests,
    numNights,
    startDate,
    status,
    totalPrice,
  } = booking;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const Delete = (id) => {
    deleteBooking(id);
  };
  return (
    <>
      <Table.Row>
        <Cabin className="text-center">{index + 1}</Cabin>
        <Cabin className="text-center">
          {cabinName.length > 15
            ? cabinName.substring(0, 15) + "..."
            : cabinName}
        </Cabin>

        <Stacked>
          <span>{guestName}</span>
          <span>{email}</span>
        </Stacked>

        <Stacked>
          <span>
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}
            &rarr; {numNights} night stay
          </span>
          <span>
            {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(endDate), "MMM dd yyyy")}
          </span>
        </Stacked>
        <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        <Amount>{formatCurrency(totalPrice)}</Amount>
        <div className="text-center">
          <Action
            id={id}
            check={check}
            setCheck={setCheck}
            setShow={setShowCabin}
            isLast={isLast}
            close={close}
            setDeleteShow={setDeleteShowCabin}
            type="booking"
            status={status}
          ></Action>
        </div>
      </Table.Row>
      {deleteshowCabin && (
        <ConfirmDelete
          onConfirm={() => Delete(id)}
          closeModal={() => setDeleteShowCabin(false)}
          resource={cabinName}
          disabled={isDelete}
        ></ConfirmDelete>
      )}
    </>
  );
};

export default BookingRow;
