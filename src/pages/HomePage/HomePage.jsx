import React from "react";
import Countdown from "../../components/Countdown/Countdown";

const HomePage = () => {
  const targetDate = "2024-09-29T00:00:00";

  return (
    <div>
      <Countdown targetDate={targetDate} />
    </div>
  );
};

export default HomePage;
