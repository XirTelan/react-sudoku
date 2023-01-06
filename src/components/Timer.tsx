import React, { useEffect, useState } from "react";

export default function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const intreval = setInterval(() => {
      setTime((prevVal) => prevVal + 1);
    }, 1000);
    if (!isRunning) clearInterval(intreval);

    return () => clearInterval(intreval);
  }, [isRunning]);

  const min = Math.floor(time / 60);

  return (
    <>
      <div className="bg-white">
        {min < 10 ? `0${min}` : min} : {Math.floor(time % 60)}
      </div>
      <button
        className="bg-white"
        onClick={() => setIsRunning((prev) => !prev)}
      >
        {" "}
        {isRunning ? "Pause" : "Play"}
      </button>
    </>
  );
}
