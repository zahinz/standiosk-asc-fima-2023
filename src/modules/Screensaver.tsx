import { useState, useEffect } from "react";

interface Props {
  // Define the props your WrappedComponent might need
  [key: string]: any;
}

const withScreensaver = (WrappedComponent: React.ComponentType<Props>) => {
  const Screensaver = () => {
    const maxFileNumber = Number(import.meta.env.VITE_LAST_POSTER_ID) || 1;
    const [selectedId, setSelectedId] = useState(1);

    useEffect(() => {
      let currentId = 1;
      const intervalId = setInterval(() => {
        if (currentId === 24) {
          currentId++;
        }
        setSelectedId(currentId);
        currentId = currentId >= maxFileNumber ? 1 : currentId + 1;
      }, 600000);

      return () => clearInterval(intervalId);
    }, [maxFileNumber]);

    return (
      <div className="w-screen h-screen bg-slate-50">
        <img
          className="h-full w-full object-contain"
          src={`/poster/jpg/${selectedId}.jpg`}
          alt="poster"
        />
      </div>
    );
  };

  const WithScreensaver = (props: Props) => {
    const [isScreensaverActive, setIsScreensaverActive] = useState(false);

    useEffect(() => {
      const activateScreensaver = () => setIsScreensaverActive(true);
      const timeoutId = setTimeout(activateScreensaver, 600000);

      const resetScreensaver = () => {
        clearTimeout(timeoutId);
        setIsScreensaverActive(false);
        setTimeout(activateScreensaver, 600000);
      };

      window.addEventListener("mousemove", resetScreensaver);
      window.addEventListener("keypress", resetScreensaver);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("mousemove", resetScreensaver);
        window.removeEventListener("keypress", resetScreensaver);
      };
    }, []);

    return isScreensaverActive ? (
      <Screensaver />
    ) : (
      <WrappedComponent {...props} />
    );
  };

  return WithScreensaver;
};

export default withScreensaver;
