import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

const NotFound404 = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer); // Cleanup timeout if component is unmounted
  }, []);

  const handleBackHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="h-screen w-screen flex flex-col gap-2 justify-center items-center">
      {showLoader ? (
        <Loader2 className="animate-spin" size={48} color="#1e4eaf" />
      ) : (
        <>
          <h1>404 Not Found</h1>
          <Button onClick={handleBackHome}>Go Home</Button>
        </>
      )}
    </div>
  );
};

export default NotFound404;
