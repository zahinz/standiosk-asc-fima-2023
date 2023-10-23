import { useEffect, FC } from "react";

// The HOC function
const withDisableRightClick = <P extends object>(WrappedComponent: FC<P>) => {
  const WithDisableRightClick: FC<P> = (props) => {
    useEffect(() => {
      const preventRightClick = (event: MouseEvent) => event.preventDefault();
      window.addEventListener("contextmenu", preventRightClick);

      // Cleanup
      return () => {
        window.removeEventListener("contextmenu", preventRightClick);
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  return WithDisableRightClick;
};

export default withDisableRightClick;
