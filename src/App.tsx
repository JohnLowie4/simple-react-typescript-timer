import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [minutes, setMinutes]: string = useState("00");
  const [seconds, setSeconds]: string = useState("00");
  const [milliseconds, setMilliseconds]: string = useState("00");
  const [time, setTime]: number = useState(0);
  const [isActive, setIsActive]: boolean = useState(false)
  const startTimeRef = useRef<NodeJS.Timeout | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  function handleStart() {
    if (isActive) return;

    setIsActive(true);
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
    clearInterval(intervalIdRef.current!);
  }

  function handleReset() {
    if (!isActive) {
      clearInterval(intervalIdRef.current!);
      setIsActive(false);
      setTime(0);
      setMilliseconds("00");
      setSeconds("00");
      setMinutes("00");
      startTimeRef.current = null;
    }
  }

  return (
    <div className="timer">
      <div className="timer-time">
        <h1>Timer</h1>
        <span className="timer-minutes">{minutes}</span>
        :
        <span className="timer-seconds">{seconds}</span>
        :
        <span className="timer-milliseconds">{milliseconds}</span>
      </div>
      <div className="timer-buttons">
        <button className="timer-start" onClick={handleStart}>Start</button>
        <button className="timer-stop" onClick={handleStop}>Stop</button>
        <button className="timer-reset" onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}

export default App
