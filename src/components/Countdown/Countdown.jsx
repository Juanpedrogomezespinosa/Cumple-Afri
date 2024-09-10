import React, { useEffect, useState } from "react";
import "./Countdown.css";
import Confetti from "../Confetti/Confetti";

const Countdown = () => {
  const getTargetDate = (baseDate) => {
    const currentYear = new Date().getFullYear();
    const date = new Date(`${currentYear}-${baseDate}`);
    return date;
  };

  const calculateTimeLeft = (targetDate) => {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        months: Math.floor(difference / (1000 * 60 * 60 * 24 * 30)),
        days: Math.floor(
          (difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
        ),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };

  const today = new Date();
  let birthday = getTargetDate("09-29");

  // Si el cumpleaños ya ha pasado este año, ajusta el año para el próximo
  if (today > birthday) {
    birthday = getTargetDate("09-29");
    birthday.setFullYear(birthday.getFullYear() + 1);
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(birthday));

  useEffect(() => {
    const timer = setInterval(() => {
      const newToday = new Date();
      let newBirthday = getTargetDate("09-29");

      // Si el cumpleaños ya ha pasado este año, ajusta el año para el próximo
      if (newToday > newBirthday) {
        newBirthday.setFullYear(newBirthday.getFullYear() + 1);
      }

      setTimeLeft(calculateTimeLeft(newBirthday));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timerComponents = [];

  // Traducción en español
  const timeUnits = {
    months: "meses",
    days: "días",
    hours: "horas",
    minutes: "minutos",
    seconds: "segundos",
  };

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval} className="timer-component">
        {timeLeft[interval]} {timeUnits[interval]}{" "}
      </span>
    );
  });

  const testDate = "2024-09-29";
  const showBirthdayMessage =
    today.toDateString() === new Date(testDate).toDateString();

  return (
    <div className="countdown-container">
      {showBirthdayMessage && <Confetti />}
      <div className="countdown">
        {!showBirthdayMessage && (
          <h2>Cuenta atrás para el cumpleaños de Wendolín África:</h2>
        )}
        {showBirthdayMessage && (
          <div className="birthday-message">
            <h2>¡Feliz cumpleaños, Wendolín África! 🎉🎂</h2>
            <p>
              Hoy celebramos tus 32 años con una gran sonrisa y mucha alegría.
              Eres una persona increíble y mereces todo lo mejor en tu día
              especial. Que este año esté lleno de aventuras, amor y momentos
              inolvidables con tus seres queridos, y por supuesto, con tu fiel
              amiga Chaska a tu lado. ¡Disfruta de cada momento y que todos tus
              deseos se hagan realidad!
            </p>
          </div>
        )}
        {!showBirthdayMessage && timerComponents.length > 0 && (
          <div className="timer-container">{timerComponents}</div>
        )}
        {!showBirthdayMessage && timerComponents.length === 0 && (
          <span>¡Hoy es el cumpleaños de Wendolín África!</span>
        )}
      </div>
    </div>
  );
};

export default Countdown;
