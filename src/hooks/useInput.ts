import { useState } from "react";

type UseInputProps<T> = [T, (v: T) => void, () => void];

export const useInput = <T>(initialValue: T): UseInputProps<T> => {
  const [value, setValue] = useState<T>(initialValue);

  const onChangeForm = (changedValue: T): void => {
    setValue(changedValue as T);
  };

  const resetForm = (): void => {
    setValue(initialValue);
  };

  return [value, onChangeForm, resetForm];
};
