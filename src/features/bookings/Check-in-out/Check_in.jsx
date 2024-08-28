import styled from "styled-components";
import BookingDataBox from "../BookingDataBox";
import Row from "../../../ui/Row";
import Heading from "../../../ui/Heading";
import Tag from "../../../ui/Tag";
import ButtonGroup from "../../../ui/ButtonGroup";
import Button from "../../../ui/Button";
import ButtonText from "../../../ui/ButtonText";
import { useMoveBack } from "../../../hooks/useMoveBack";
import useBookingId from ".././useBookingId";
import Spinner from "../../../ui/Spinner";
import Checkbox from "../../../ui/Checkbox";
import useSetting from "../../../features/settings/useSetting";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../utils/helpers";
import { useState } from "react";
import useCheck_in from "./useCheck_in";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function Check_in() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { settings, isLoading: isSetting } = useSetting();
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { bookingId, isLoading } = useBookingId();
  const { checkin, isCheckin } = useCheck_in();
  if (isSetting || isLoading) return <Spinner />;
  const { id, guests, totalPrice, numGuests, hasBreakfast, numNights } =
    bookingId;
  const optionalBreakfastPrice =
    settings.breakfastPrice * numGuests * numNights;
  const handclick = () => {
    if (!confirmPaid) return null;

    checkin({
      id,
      breakfast: {
        hasBreakfast: addBreakfast ? true : hasBreakfast,
        extrasPrice: optionalBreakfastPrice,
        totalPrice: totalPrice + optionalBreakfastPrice,
      },
    });
  };
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={bookingId} />
      <br />
      {!hasBreakfast && (
        <>
          <Box>
            <Checkbox
              checked={addBreakfast}
              onChange={() => setAddBreakfast(!addBreakfast)}
            >
              Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
            </Checkbox>
          </Box>
          <br />
        </>
      )}

      <Box>
        <Checkbox
          onChange={() => setConfirmPaid(!confirmPaid)}
          checked={confirmPaid}
        >
          I confirm that {guests.fullName} has paid the total amount of
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : formatCurrency(optionalBreakfastPrice + totalPrice)}
          {addBreakfast &&
            `(${formatCurrency(optionalBreakfastPrice)} + ${formatCurrency(
              totalPrice
            )}
             
            })`}
        </Checkbox>
      </Box>
      <br />
      <ButtonGroup>
        <Button
          onClick={handclick}
          disabled={confirmPaid == false || isCheckin}
        >
          Check in booking #{id}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
      <br />
    </>
  );
}

export default Check_in;
