import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
// import CabinRow from "features/cabins/CabinRow";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabin from "./useCabin";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";

// v2
// Ngay bây giờ điều này không thực sự có thể tái sử dụng ... nhưng chúng tôi cũng muốn sử dụng một bảng tương tự cho khách, nhưng với các cột khác nhau.Ngoài ra, ngay bây giờ chúng tôi đang xác định các cột này trong cả hai đầu bảng và cabin, điều này không tốt chút nào.Thay vào đó, sẽ tốt hơn nhiều khi chỉ cần chuyển các cột vào bảng và bảng sẽ cung cấp quyền truy cập vào các cột cho cả tiêu đề và hàng.Vậy làm thế nào chúng ta có thể làm điều đó?Vâng, chúng ta có thể sử dụng một thành phần ghép!Chúng ta không phải làm điều đó như thế này, có một triệu cách để thực hiện một bảng, cũng không có lưới CSS, nhưng đây là những gì tôi đã chọn

// v1

// Chúng tôi muốn mỗi hàng bảng có một menu và chúng tôi chỉ muốn một trong số chúng được mở cùng một lúc.Chúng tôi cũng muốn chức năng này có thể tái sử dụng.Chúng tôi có thể thêm trạng thái OpenID ở đây vào bảng, nhưng điều đó thực sự không thể tái sử dụng được ... cách tốt nhất là sử dụng thành phần ghép

// Khách sạn sẽ không bao giờ có nhiều cabin, vì vậy không cần phải phân trang.Vì vậy, chúng tôi sẽ không thực hiện phân trang, và chúng tôi sẽ lọc và sắp xếp.Vì vậy, ở đây chúng ta học cách thực hiện nó ở phía trước (sau này trong việc đặt phòng, chúng ta sẽ thực hiện phiên bản back-end, đó là thế giới thực hơn)

const CabinTable = () => {
  const [check, setCheck] = useState(null);
  const { isLoading, data: cabins } = useCabin();
  // useEffect(() => {
  //   handcheck()
  // },[isLoading]2
  const handcheck = (id) => {
    setCheck((prevCheck) => (prevCheck === id ? null : id));
  };

  const close = () => {
    setCheck(null);
  };
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;

  if (!cabins.length && cabins.length > 0)
    return <Empty resourceName="cabins" />;
  // Filter
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;

  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }
  // Sort
  const sortValue = searchParams.get("sortBy") || "time";
  if (sortValue === "time")
    filteredCabins.sort((a, b) => b.created_at.localeCompare(a.created_at));
  if (sortValue === "name-asc")
    filteredCabins.sort((a, b) => a.name.localeCompare(b.name));
  if (sortValue === "name-desc")
    filteredCabins.sort((a, b) => b.name.localeCompare(a.name));
  if (sortValue === "price-asc")
    filteredCabins.sort((a, b) => a.regularPrice - b.regularPrice);
  if (sortValue === "price-desc")
    filteredCabins.sort((a, b) => b.regularPrice - a.regularPrice);
  if (sortValue === "maxCapecity-asc") {
    filteredCabins.sort((a, b) => a.maxCapacity - b.maxCapacity);
  }
  if (sortValue === "maxCapecity-desc") {
    filteredCabins.sort((a, b) => b.maxCapacity - a.maxCapacity);
  }
  // Pagination

  return (
    <Menus>
      <Table role="table" columns="0.7fr 1.7fr 1.1fr 1.1fr 1fr 1.2fr 1fr">
        <Table.Header role="row">
          <div className="text-center">Stt</div>
          <div className="text-center ">Cabin</div>
          <div className="text-center">Img</div>
          <div className="text-center">Capecity</div>
          <div className="text-center">Price</div>
          <div className="text-center">Discount</div>
          <div className="text-center">Action</div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(cabin, index) => (
            <CabinRow
              cabin={cabin}
              key={cabin.id}
              index={index}
              check={check}
              handcheck={handcheck}
              close={close}
              setCheck={setCheck}
              isLast={
                (cabins.length === 6 && index === cabins.length - 1) ||
                (cabins.length > 6 && index >= cabins.length - 2)
              }
            />
          )}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
