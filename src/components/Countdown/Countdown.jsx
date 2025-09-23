import React, { useEffect, useState } from "react";
import "./Countdown.css";
import Confetti from "../Confetti/Confetti";

const Countdown = () => {
  const getTargetDate = (baseDate) => {
    const currentYear = new Date().getFullYear();
    const date = new Date(`${currentYear}-${baseDate}`);
    date.setHours(date.getHours() - 2); // Restar 2 horas a la fecha objetivo
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

  const testDate = "2025-09-29";
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
              <strong>Bienvenida al lado malo, Afri.</strong> 😈
              <br />
              <br />
              Hoy cumples 33 y, sinceramente, si esto fuera The Good Place,
              estaría Janet organizando tu fiesta perfecta… pero como es el lado
              malo, probablemente Dwight ha metido tu regalo en gelatina y Kevin
              ha pisado la tarta. 🎂😅
              <br />
              <br />
              Este año ha sido digno de un buen capítulo: despedidas tristes (💔
              Kiba, Haku), un aniversario feliz, y tú buscando casa como si
              fueras Michael intentando entender un contrato de alquiler.
              <br />
              <br />
              ¿Te acuerdas cuando todos pensaban que éramos pareja? 😂 Qué
              maravilla de sitcom vivimos… Y aún seguimos siendo mejores amigos,
              como siempre. <br />
              <br />
              Hoy solo deseo que este nuevo año venga con salud, risas, que Sewa
              y tú encontréis casa, y mucho amor del bueno —del que das tú sin
              darte cuenta. Con El Feo, Chaska, Soja, y con ese caos adorable
              que es tu vida.
              <br />
              <br />
              <strong>You’re in the good place.</strong>
              <br />
              <br />
              Feliz cumple, vieja puelca 💛
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
