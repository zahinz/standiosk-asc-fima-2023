import { useState, useEffect } from "react";

const usePublicItemExists = (url: string) => {
  const [itemAvailable, setItemAvailable] = useState<boolean>(false);

  useEffect(() => {
    const check = async (url: string) => {
      try {
        const response = await fetch(url, {
          method: "HEAD",
        });
        setItemAvailable(response.status !== 404);
      } catch (error) {
        setItemAvailable(false);
      }
    };

    check(url);
  }, [url]);

  return itemAvailable;
};

export default usePublicItemExists;
