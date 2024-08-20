import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { Textarea } from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRef } from "react";
import { Overlay, StyledModal } from "../../ui/Modal";
const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 30rem 2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;
  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: rgba(0, 0, 0, 0.3); */
  z-index: 9999;
`;

const Flex = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-direction: column;
`;
function CreateCabinForm({ setShowCabin }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [filename, setFilename] = useState("");
  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFilename(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const { mutate, isLoading } = useMutation({
    mutationFn: addEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      reset();
      setShowCabin(false);
    },
    onError: (err) => toast.error(err.message),
  });
  const onSubmit = (data) => {
    mutate({ ...data, image: filename });
  };

  const onError = (err) => {
    console.log(err);
  };

  return (
    <Overlay>
      <StyledModal>
        <Div>
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow>
              <Label htmlFor="name">Cabin name</Label>
              <Flex>
                <Input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "Cabin name is required",
                  })}
                  disabled={isLoading}
                />
                {errors?.name && <Error>{errors.name.message}</Error>}
              </Flex>
            </FormRow>

            <FormRow>
              <Label htmlFor="maxCapacity">Maximum capacity</Label>
              <Flex>
                <Input
                  type="number"
                  id="maxCapacity"
                  {...register("maxCapacity", {
                    required: "MaxCapacity name is required",
                    min: {
                      value: 1,
                      message: "MaxCapacity must be greater than or equal to 1",
                    },
                  })}
                  disabled={isLoading}
                />
                {errors?.maxCapacity && (
                  <Error>{errors.maxCapacity.message}</Error>
                )}
              </Flex>
            </FormRow>

            <FormRow>
              <Label htmlFor="regularPrice">Regular price</Label>
              <Flex>
                <Input
                  type="number"
                  id="regularPrice"
                  disabled={isLoading}
                  {...register("regularPrice", {
                    required: "Regular price is required",
                    min: {
                      value: 1,
                      message:
                        "Regular price must be greater than or equal to 1",
                    },
                  })}
                />
                {errors?.regularPrice && (
                  <Error>{errors.regularPrice.message}</Error>
                )}
              </Flex>
            </FormRow>
            <FormRow>
              <Label htmlFor="discount">Discount</Label>
              <Flex>
                <Input
                  type="number"
                  id="discount"
                  disabled={isLoading}
                  defaultValue={0}
                  {...register("discount", {
                    required: "Can't be empty, make it at least 0",
                    validate: (value) =>
                      parseFloat(getValues().regularPrice) >=
                        parseFloat(value) ||
                      "Discount should be less than regular price",
                  })}
                />
                {errors?.discount && <Error>{errors.discount.message}</Error>}
              </Flex>
            </FormRow>
            <FormRow>
              <Label htmlFor="description">Description for website</Label>
              <Flex>
                <Textarea
                  type="number"
                  id="description"
                  disabled={isLoading}
                  defaultValue=""
                  {...register("description", {
                    required: "Description name is required",
                  })}
                />
                {errors?.description && (
                  <Error>{errors.description.message}</Error>
                )}
              </Flex>
            </FormRow>

            <div>
              <Label>Cabin photo</Label>
              <div className="p-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <div className="border-dashed border-2 border-indigo-600">
                  <span
                    className="flex justify-center py-3 cursor-pointer"
                    onClick={handleClick}
                  >
                    Upload img
                  </span>
                  <img
                    src={imageUrl}
                    alt=""
                    width={"200px"}
                    className="m-auto py-2 max-h-[200px] "
                  />
                </div>
              </div>
              {errors?.image && <Error>{errors.image.message}</Error>}
            </div>
            <FormRow>
              <Button
                variation="secondary"
                type="reset"
                onClick={() => setShowCabin(false)}
              >
                Cancel
              </Button>
              <Button disabled={isLoading}>Add cabin</Button>
            </FormRow>
          </Form>
        </Div>
      </StyledModal>
    </Overlay>
  );
}

export default CreateCabinForm;
