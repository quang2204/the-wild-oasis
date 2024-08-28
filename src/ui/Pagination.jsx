import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
const StyledPagination = styled.div`
  /* width: 100%; */
  display: flex;
  align-items: center;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  gap: 0.6rem;

  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-left: -50%; */
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
const Page_Size = 10;
const Pagination = ({ count }) => {
  const [seachParams, setSearchParams] = useSearchParams();

  const currentPage = !seachParams.get("page")
    ? 1
    : parseInt(seachParams.get("page"));
  const pageCount = Math.ceil(count / Page_Size);
  const nextPage = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    seachParams.set("page", next);
    setSearchParams(seachParams);
  };
  const [index, setIndex] = useState();

  useEffect(() => {
    let lastIndex = [];
    for (let i = 0; i < pageCount; i++) {
      lastIndex.push(i);
    }

    setIndex(lastIndex);

    // This will log the final value of i
  }, [currentPage]);

  const prePage = () => {
    const pre = currentPage === 1 ? currentPage : currentPage - 1;
    seachParams.set("page", pre);
    setSearchParams(seachParams);
  };
  const page = (page) => {
    seachParams.set("page", page);
    setSearchParams(seachParams);
  };
  // if (pageCount <= 1) return null;
  return (
    <>
      <StyledPagination>
        <P>
          Show <span className="pr-2">{(currentPage - 1) * Page_Size + 1}</span>
          to
          <span className="px-2">
            {currentPage === pageCount ? count : currentPage * Page_Size}
          </span>
          of <span>{count}</span> results
        </P>
      </StyledPagination>
      {pageCount > 1 && (
        <ButtonPage
          prePage={prePage}
          currentPage={currentPage}
          index={index}
          page={page}
          pageCount={pageCount}
          nextPage={nextPage}
          seachParams={seachParams}
        ></ButtonPage>
      )}
    </>
  );
};
const ButtonPage = ({
  prePage,
  currentPage,
  index,
  page,
  pageCount,
  nextPage,
  seachParams,
}) => {
  return (
    <div className="w-[60%]">
      <Buttons>
        <PaginationButton onClick={prePage} disabled={currentPage === 1}>
          <HiChevronLeft></HiChevronLeft>
          <span>Previous</span>
        </PaginationButton>
        <div className="flex gap-5 items-center ">
          {index &&
            index.slice(0, 5).map((item, idx) => (
              <div className="cursor-pointer" key={idx}>
                <div
                  onClick={() => page(item + 1)}
                  className={`w-[30px] h-[30px] flex justify-center items-center rounded-full ${
                    (seachParams.get("page") || "1") == item + 1 &&
                    "bg-blue-500 text-white "
                  }`}
                >
                  {item + 1}
                </div>
              </div>
            ))}
        </div>
        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span> <HiChevronRight></HiChevronRight>
        </PaginationButton>
      </Buttons>
    </div>
  );
};
export default Pagination;
