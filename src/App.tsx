import { useState, useRef } from 'react'
import './App.css'

function App() {
  // Disable buttons based on timer state
  const [isStartButtonDisabled, setIsStartButtonDisabled] = useState<boolean>(false);
  const [isStopButtonDisabled, setIsStopButtonDisabled] = useState<boolean>(true);
  const [isResetButtonDisabled, setIsResetButtonDisabled] = useState<boolean>(true);
  // Timer state
  const [minutes, setMinutes] = useState<string>("00");
  const [seconds, setSeconds] = useState<string>("00");
  const [milliseconds, setMilliseconds] = useState<string>("00");
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false)
  const startTimeRef = useRef<number | null>(null);
  const intervalIdRef = useRef<number | null>(null);

  function handleStart() {
    if (isActive) return;

    setIsActive(true);
    setIsStartButtonDisabled(true);
    setIsStopButtonDisabled(false);
    setIsResetButtonDisabled(true);
    startTimeRef.current = Date.now() - time;
    intervalIdRef.current = setInterval(() => {
      setTime(Date.now() - startTimeRef.current!);
      setMilliseconds(((Date.now() - startTimeRef.current!) % 1000).toString().padStart(3, '0').slice(0, 2));
      setSeconds((Math.floor((Date.now() - startTimeRef.current!) / 1000) % 60).toString().padStart(2, '0'));
      setMinutes((Math.floor((Date.now() - startTimeRef.current!) / 60000) % 60).toString().padStart(2, '0'));
    }, 10);
  }

  function handleStop() {
    if (!isActive) return;
    setIsActive(false);
    setIsStartButtonDisabled(false);
    setIsResetButtonDisabled(false);
    clearInterval(intervalIdRef.current!);
  }

  function handleReset() {
    if (!isActive) {
      clearInterval(intervalIdRef.current!);
      setIsActive(false);
      setIsStartButtonDisabled(false);
      setIsStopButtonDisabled(true);
      setIsResetButtonDisabled(true);
      setTime(0);
      setMilliseconds("00");
      setSeconds("00");
      setMinutes("00");
      startTimeRef.current = null;
    }
  }

  return (
    <div id="timer">
      <div id="timer-time">
        <h1 className="timer-title">Timer</h1>
        <div className="timer-time-display">
          <div className="timer-minutes">{minutes}</div>
          <div className="timer-colon">:</div>
          <div className="timer-seconds">{seconds}</div>
          <div className="timer-colon">:</div>
          <div className="timer-milliseconds">{milliseconds}</div>
        </div>
      </div>
      <div id="timer-buttons">
        <button className="timer-start" onClick={handleStart} disabled={isStartButtonDisabled}>Start</button>
        <button className="timer-stop" onClick={handleStop} disabled={isStopButtonDisabled}>Stop</button>
        <button className="timer-reset" onClick={handleReset} disabled={isResetButtonDisabled}>Reset</button>
      </div>
    </div>
  )
}

export default App
