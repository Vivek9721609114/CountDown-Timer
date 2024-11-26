import React from "react";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import InputTimer from "./components/InputTimer/InputTimer";
import ShowTimer from "./components/ShowTimer/ShowTimer";
const App = () => {
  const [isStart, setIsStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerId, SetTimerId] = useState(0);

  const handleStart = () => {
    if (hours < 0 || minutes < 0 || seconds < 0) {
      alert("Invalid Input");
      return;
    } else {
      setIsStart(true);
      clearInterval(timerId);
    }
  };

  const handleResume = () => {
    setIsPaused(false);
    runTimer(seconds, minutes, hours);
  };

  const handlePause = () => {
    setIsPaused(true);
    clearInterval(timerId);
  };
  const handleReset = () => {
    setIsStart(false);
    resetTimer();
  };

  const resetTimer = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    clearInterval(tid);
  };

  const handleInput = (e) => {
    console.log(e.target.id, e.target.value);
    const value = parseInt(e.target.value);
    const id = e.target.id;
    if (id === "hours") {
      setHours(value);
    } else if (id === "minutes") {
      setMinutes(value);
    } else {
      setSeconds(value);
    }
  };

  const runTimer = (sec, min, hr, tid) => {
    if (sec > 0) {
      setSeconds((s) => s - 1);
    } else if (sec === 0 && min > 0) {
      setMinutes((m) => m - 1);
      setSeconds(59);
    } else {
      setHours((h) => h - 1);
      setMinutes(59);
      setSeconds(59);
    }

    if (sec === 0 && min === 0 && hr === 0) {
      resetTimer();
      // handleReset();
      alert("Timer is Finished");
      clearInterval(tid);
      return;
    }
  };
  useEffect(() => {
    let tid;
    if (isStart) {
      tid = setInterval(() => {
        runTimer(seconds, minutes, hours, tid);
      }, 1000);
      SetTimerId(tid);
    }
    return () => {
      clearInterval(tid);
    };
  }, [isStart, hours, minutes, seconds]);
  console.log(hours, minutes, seconds);
  return (
    <div className="app">
      <h1>Countdown Timer</h1>
      {!isStart && (
        <InputTimer handleInput={handleInput} handleStart={handleStart} />
      )}

      {isStart && (
        <ShowTimer
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          isPaused={isPaused}
          handlePause={handlePause}
          handleResume={handleResume}
          handleReset={handleReset}
        />
      )}
    </div>
  );
};

export default App;
