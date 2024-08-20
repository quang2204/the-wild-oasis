import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
// import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { booking, isLoading, count } = useBooking();

  if (isLoading) return <Spinner />;
  // if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.2fr 0.5fr 0.6fr 1.2fr 0.9fr 18rem 6rem">
        <Table.Header>
          <div>Stt</div>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div>Action</div>
        </Table.Header>

        <Table.Body
          data={booking}
          render={(booking, index) => (
            <BookingRow key={booking.id} index={index} booking={booking} />
          )}
        />

        <Table.Footer>{/* <Pagination count={count} /> */}</Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
