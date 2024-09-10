import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Countdown from "./components/Countdown/Countdown";
import TestConfetti from "./pages/TestConffeti/TestConfetti";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Countdown targetDate="09-29" />} />
        <Route path="/test-confetti" element={<TestConfetti />} />
      </Routes>
    </Router>
  );
}

export default App;
