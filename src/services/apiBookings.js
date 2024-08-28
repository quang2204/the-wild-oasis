import { getToday } from "../utils/helpers";
import supabase from "./supabase";
export const getBookings = async (filterValue, sort, page) => {
  // Build the query
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, guests(fullName, email), cabins(name)",
      { count: "exact" }
    );

  // Áp dụng bộ lọc nếu giá trị không phải là "tất cả"

  if (filterValue.value !== "all" && filterValue.value !== undefined) {
    query = query.eq(filterValue.field, filterValue.value);
  }
  //sort
  if (sort)
    query = query.order(sort.field, {
      ascending: sort.order === "asc",
    });
  //Pagination
  if (page) {
    const from = (page - 1) * 10;
    const to = from + 9;
    query = query.range(from, to);
  }
  // Execute the query
  const { data, error, count } = await query;

  // Handle errors
  if (error) {
    console.error("Error fetching bookings:", error);
    throw new Error("Bookings not found");
  }

  // Return the data
  return { data, count };
};

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Trả về tất cả các đặt phòng được tạo ra sau ngày nhất định.Chẳng hạn, hữu ích để đặt chỗ trong 30 ngày qua.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Trả về tất cả các kỳ nghỉ được tạo sau ngày đã cho
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Hoạt động có nghĩa là có kiểm tra hoặc kiểm tra ngày hôm nay
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  console.log(id, obj);
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
