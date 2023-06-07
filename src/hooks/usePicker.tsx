import { ReactElement, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface UsePickerParams {
  mode: "date" | "time" | "datetime";
  timePickerModeAndroid?: "spinner" | "clock" | "default";
  setValue: React.Dispatch<React.SetStateAction<Date | null>>;
}

type UsePickerReturn = [ReactElement, boolean, () => void];

export const usePicker = ({ mode, timePickerModeAndroid, setValue }: UsePickerParams): UsePickerReturn => {
  const [isPickerOn, setIsPickerOn] = useState<boolean>(false);

  const pickerOn = (): void => {
    setIsPickerOn(true);
  };

  const pickerOff = (): void => {
    setIsPickerOn(false);
  };

  const onConfirm = (value: Date): void => {
    setValue(value);
    pickerOff();
  };

  const picker: ReactElement = <DateTimePickerModal isVisible={isPickerOn} mode={mode} onConfirm={onConfirm} timePickerModeAndroid={timePickerModeAndroid} onCancel={pickerOff} />;

  return [picker, isPickerOn, pickerOn];
};
