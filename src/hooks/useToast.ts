import { useEffect, useState } from "react";

export default function useToast(): [boolean, () => void] {
  const [isToastEnabled, setToastEnabled] = useState(false);
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const enable = () => {
    setToastEnabled(true);
    timeout = setTimeout(() => {
      setToastEnabled(false);
    }, 5000);
  }

  useEffect(() => {
    return () => {
      if(timeout) {
        clearTimeout(timeout);
      }
    }
  }, []);

  return [isToastEnabled, enable];
}
