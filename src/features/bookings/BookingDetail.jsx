import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import useBookingId from "./useBookingId";
import Spinner from "../../ui/Spinner";

import useDeleteBooking from "./useDeleteBooking";
import { useState } from "react";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { Link, useNavigate } from "react-router-dom";
import useCheck_out from "./Check-in-out/useCheck_out";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { bookingId, isLoading } = useBookingId();
  const { deleteBooking, isDelete } = useDeleteBooking();
  const { checkout, isCheckout } = useCheck_out();
  if (isLoading) return <Spinner />;
  const { status, id } = bookingId;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const click = () => {
    setShow(!show);
  };
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={bookingId} />
      <br />
      <ButtonGroup>
        {status === "unconfirmed" && (
          <Link to={`/checkin/${id}`}>
            <Button>Check in</Button>
          </Link>
        )}
        {status === "checked-in" && (
          <Button onClick={() => checkout(id)}>Check out</Button>
        )}
        <Button variation="danger" onClick={click}>
          Delete
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
      {show && (
        <ConfirmDelete
          onConfirm={() =>
            deleteBooking(id, {
              onSettled: () => navigate(-1),
            })
          }
          closeModal={click}
          disabled={isDelete}
        ></ConfirmDelete>
      )}
    </>
  );
}

export default BookingDetail;
