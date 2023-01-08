import React, { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

export default function Timer(props: timerProps) {
  const { isRunning, setIsRunning } = props;
  const [time, setTime] = useState(0);

  useEffect(() => {
    const intreval = setInterval(() => {
      setTime((prevVal) => prevVal + 1);
    }, 1000);
    if (!isRunning) clearInterval(intreval);

    return () => clearInterval(intreval);
  }, [isRunning]);

  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);

  return (
    <>
      <div className="flex items-center">
        <div className=" text-slate-100 font-bold text-lg mr-1">
          {min < 10 ? `0${min}` : min} : {sec < 10 ? `0${sec}` : sec}
        </div>
        <button
          className="text-mySecondary hover:bg-mySecondary text-center hover:text-white h-8 w-8 p-1 rounded-full"
          onClick={() => setIsRunning((prev) => !prev)}
        >
          <div className="flex justify-center">
            {isRunning ? <FaPause /> : <FaPlay />}
          </div>
        </button>
      </div>
    </>
  );
}

type timerProps = {
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
};
