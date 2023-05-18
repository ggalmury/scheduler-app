import { useEffect, useState } from "react";
import * as Font from "expo-font";

interface UseFontParams {
  [key: string]: any;
}

export const useFont = (useFontParams: UseFontParams): boolean => {
  const [isFontFetched, setIsFontFetched] = useState<boolean>(false);

  useEffect(() => {
    fetchFont();
  }, []);

  const fetchFont = async (): Promise<void> => {
    await Font.loadAsync(useFontParams);

    setIsFontFetched(true);
  };

  return isFontFetched;
};
