import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins({ setShowCabin, showCabin }) {
  return (
    <>
      <Row type="horizontal">
        <CabinTableOperations></CabinTableOperations>
        <div>
          {/* <p>Filter/Sort</p> */}

          <Button
            onClick={() => {
              setShowCabin(!showCabin);
            }}
          >
            Create new
          </Button>
        </div>
      </Row>
      <Row>
        <CabinTable></CabinTable>

        {showCabin && <CreateCabinForm setShowCabin={setShowCabin} />}
      </Row>
    </>
  );
}

export default Cabins;
