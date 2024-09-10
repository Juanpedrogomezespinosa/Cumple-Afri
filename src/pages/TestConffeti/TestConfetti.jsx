// src/pages/TestConfetti.jsx
import React, { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";

const TestConfetti = () => {
  const [windowDimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const detectSize = () => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <ReactConfetti
        width={windowDimension.width}
        height={windowDimension.height}
        tweenDuration={1000}
      />
      <h1
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Confetti Test
      </h1>
    </div>
  );
};

export default TestConfetti;
