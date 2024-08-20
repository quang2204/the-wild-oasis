// import SortBy from 'ui/SortBy';
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          {
            value: "all",
            label: "All",
          },
          {
            value: "no-discount",
            label: "No-discount",
          },
          {
            value: "with-discount",
            label: "With-discount",
          },
        ]}
      ></Filter>
      <SortBy
        options={[
          {
            value: "name-asc",
            label: "Sort by name (a-z)",
          },
          {
            value: "name-desc",
            label: "Sort by name (z-a)",
          },
          {
            value: "price-asc",
            label: "Sort by price (low to high)",
          },
          {
            value: "price-desc",
            label: "Sort by price (high to low)",
          },
          {
            value: "maxCapecity-asc",
            label: "Sort by max capacity (low to high)",
          },
          {
            value: "maxCapecity-desc",
            label: "Sort by max capacity (high to low)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
