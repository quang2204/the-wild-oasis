import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import { Overlay, StyledModal } from "./Modal";
import SpinnerMini from "./SpinnerMini";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resource, onConfirm, disabled, closeModal }) {
  return (
    <Overlay>
      <StyledModal>
        <StyledConfirmDelete>
          <Heading type="h3">Delete {resource}</Heading>
          <p>
            Are you sure you want to delete this {resource} permanently? This
            action cannot be undone.
          </p>
          <div>
            <Button variation="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variation="danger"
              onClick={onConfirm}
              disabled={disabled}
              className="flex justify-between items-center gap-3"
            >
              <div>{disabled && <SpinnerMini></SpinnerMini>}</div>
              <div>Delete</div>
            </Button>
          </div>
        </StyledConfirmDelete>
      </StyledModal>
    </Overlay>
  );
}

export default ConfirmDelete;
