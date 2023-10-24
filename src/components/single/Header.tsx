import { useEffect, useState } from "react";

const Header = () => {
  const [lastYPos, setLastYPos] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [mouseTimer, setMouseTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const yPos = window.scrollY;
      const isScrollingUp = yPos < lastYPos;

      if (Math.abs(yPos - lastYPos) > 3) {
        setIsHidden(!isScrollingUp);
      }

      setLastYPos(yPos);
    };

    const handleMouseMove = () => {
      if (mouseTimer) {
        clearTimeout(mouseTimer);
      }

      setMouseTimer(
        setTimeout(() => {
          setIsHidden(false);
        }, 5000)
      );
    };

    window.addEventListener("scroll", handleScroll, false);
    window.addEventListener("mousemove", handleMouseMove, false);

    return () => {
      if (mouseTimer) {
        clearTimeout(mouseTimer);
      }
      window.removeEventListener("scroll", handleScroll, false);
      window.removeEventListener("mousemove", handleMouseMove, false);
    };
  }, [lastYPos, mouseTimer]);

  return (
    <div
      className={`w-screen h-auto bg-[#1E4EAF] sticky top-0 p-6 flex justify-between items-center z-50 transition-all ease-out duration-200 ${
        isHidden ? "translate-y-[-160px]" : "translate-y-0"
      }`}
    >
      <div className="w-3/5 space-y-2">
        <h1 className="font-bold text-white">
          Non-Communicable Diseases in the Muslim World
        </h1>
        <h5 className="text-[#00D084]">
          Federation of Islamic Medical Association (FIMA) Convention in
          conjunction with
          <br />
          24th Islamic Medical Association of Malaysia (IMAM) Annual Scientific
          Conference 2023
        </h5>
      </div>
      <div className="w-2/5 flex items-center justify-end">
        <img className="w-[11%] -mr-4" src="/logo/imam.png" alt="IMAM logo" />
        <img className="w-[51%]" src="/logo/fima.png" alt="FIMA logo" />
      </div>
    </div>
  );
};

export default Header;
