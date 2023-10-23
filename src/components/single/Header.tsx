import { useEffect, useState } from "react";
import { motion, useAnimation, AnimationControls } from "framer-motion";

const Header = () => {
  const controls = useAnimation();
  const [lastYPos, setLastYPos] = useState(0);
  const [mouseTimer, setMouseTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const yPos = window.scrollY;
      const isScrollingUp = yPos < lastYPos;

      // Controls the Framer Motion animation
      if (Math.abs(yPos - lastYPos) > 3) {
        controls.start({
          y: isScrollingUp ? 0 : -160,
          transition: { ease: "easeOut", duration: 0.2 },
        });
      }

      setLastYPos(yPos);
    };

    const handleMouseMove = () => {
      if (mouseTimer) {
        clearTimeout(mouseTimer);
      }

      setMouseTimer(
        setTimeout(() => {
          controls.start({
            y: 0,
            transition: { ease: "easeOut", duration: 0.2 },
          });
        }, 5000)
      );
    };

    let requestId: number;
    const onScroll = () => {
      requestId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, false);
    window.addEventListener("mousemove", handleMouseMove, false);

    return () => {
      cancelAnimationFrame(requestId);
      if (mouseTimer) {
        clearTimeout(mouseTimer);
      }
      window.removeEventListener("scroll", onScroll, false);
      window.removeEventListener("mousemove", handleMouseMove, false);
    };
  }, [lastYPos, controls, mouseTimer]);

  return (
    <motion.div
      className="w-screen h-auto bg-[#1E4EAF] sticky top-0 p-6 flex justify-between items-center z-50"
      initial={{ y: 0 }}
      animate={controls as AnimationControls}
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
    </motion.div>
  );
};

export default Header;
