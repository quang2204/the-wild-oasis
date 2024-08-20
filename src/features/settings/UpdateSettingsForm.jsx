import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSetting from "./useSetting";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    error,
    settings: {
      minBooking,
      maxBooking,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSetting();
  const { isUpdating, updateSetting } = useUpdateSetting();
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  const handUpdate = (e, name) => {
    const { value } = e.target;
    console.log(value);
    if (!value) return;
    updateSetting({ [name]: value });
  };
  return (
    <div>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBooking}
          disabled={isUpdating}
          onBlur={(e) => handUpdate(e, "minBooking")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBooking}
          disabled={isUpdating}
          onBlur={(e) => handUpdate(e, "maxBooking")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </div>
  );
}

export default UpdateSettingsForm;
