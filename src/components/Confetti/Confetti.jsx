import React, { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

const Confetti = () => {
  const [containerDimensions, setContainerDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const detectSize = () => {
    const countdown = document.querySelector(".countdown");
    if (countdown) {
      setContainerDimensions({
        width: countdown.offsetWidth,
        height: countdown.offsetHeight,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    detectSize(); // Initial call
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, []);

  return (
    <>
      {true && (
        <div className="confetti-container">
          <ReactConfetti
            width={containerDimensions.width}
            height={containerDimensions.height}
            tweenDuration={1000}
          />
        </div>
      )}
    </>
  );
};

export default Confetti;
