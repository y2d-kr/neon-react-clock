import { useEffect, useState } from "react";

const numbers = Array.from({ length: 12 }, (_, index) => index + 1);

function useCurrentTime() {
  const [time, setTime] = useState(() => new Date());

  // useEffect(() => {
  //   let frameId;

  //   const update = () => {
  //     setTime(new Date());
  //     frameId = requestAnimationFrame(update);
  //   };

  //   frameId = requestAnimationFrame(update);
  //   return () => cancelAnimationFrame(frameId);
  // }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return time;
}

function Hand({ className, angle }) {
  return (
    <span
      className={`hand ${className}`}
      style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
    />
  );
}

function Clock() {
  const time = useCurrentTime();
  // const milliseconds = time.getMilliseconds();
  // const seconds = time.getSeconds() + milliseconds / 1000;
  const seconds = time.getSeconds();

  const minutes = time.getMinutes() + seconds / 60;
  const hours = (time.getHours() % 12) + minutes / 60;

  return (
    <section className="clock-card" aria-label="현재 시각 아날로그 시계">
      <div className="clock">
        {/* <div className="minute-marks" aria-hidden="true">
          {Array.from({ length: 60 }, (_, index) => (
            <i key={index} style={{ transform: `rotate(${index * 6}deg)` }} />
          ))}
        </div> */}

        {numbers.map((number) => {
          const angle = number * 30;
          return (
            <span
              className="number-position"
              key={number}
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <b style={{ transform: `rotate(${-angle}deg)` }}>{number}</b>
            </span>
          );
        })}

        <div className="hands" aria-hidden="true">
          <Hand className="hour-hand" angle={hours * 30} />
          <Hand className="minute-hand" angle={minutes * 6} />
          <Hand className="second-hand" angle={seconds * 6} />
          <span className="center-pin" />
        </div>
      </div>

      <p className="digital-time" aria-live="off">
        {time.toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })}
      </p>
    </section>
  );
}

export default function App() {
  return (
    <main className="page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <Clock />
    </main>
  );
}
