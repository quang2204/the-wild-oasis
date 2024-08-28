import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useState } from "react";
// import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { booking, isLoading, count } = useBooking();
  const [check, setCheck] = useState(null);
  const close = () => {
    setCheck(null);
  };
  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.2fr 1fr 0.7fr 1.2fr 0.9fr 13rem 10rem">
        <Table.Header>
          <div className="text-center">Stt</div>
          <div className="text-center">Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div className="text-center">Action</div>
        </Table.Header>
        <Table.Body
          data={booking}
          render={(bookings, index) => (
            <BookingRow
              key={bookings.id}
              index={index}
              booking={bookings}
              check={check}
              setCheck={setCheck}
              close={close}
              isLast={
                (booking.length === 6 && index === booking.length - 1) ||
                (booking.length > 6 && index >= booking.length - 2)
              }
            />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
