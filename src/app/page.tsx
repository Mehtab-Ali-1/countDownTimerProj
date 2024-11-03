"use client"
import { useEffect, useState } from "react"

export default function Timer () {

const [isStart , setIsStart] = useState(false);
const [isPaused , setIsPaused] = useState(false);
const [hourse, setHours] = useState(0);
const [minutes, setMinutes] = useState(0);
const [seconds, setSeconds] = useState(0);
const [timerId, setTimerId] = useState(0);

const handleStart = () => {
  if(hourse < 0 || minutes < 0 || seconds <=0){
    alert("Invalid Input");
  }else{
    setIsStart(true);
  }
}

// const handleBlank = (blankInput:any) => {
//   if (blankInput ===""){
//     blankInput("00")
//   }
//   }

const resetTimer = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    clearInterval(timerId);
}
const handleResume = () => {
  setIsPaused(false);
  runTimer(seconds,minutes,hourse);
}
const handlePause = () => {
  setIsPaused(true);
  clearInterval(timerId);
}
const handleReset = () => {
  setIsStart(false);
  resetTimer();
}

const handleInput = (e:any) => {
  console.log(e.target.id, e.target.value);
  const value = parseInt(e.target.value);
  const id = e.target.id;
  if (id=== "hours"){
    setHours(value);
  } else if (id === "minutes"){
    setMinutes(value);
  } else {
    setSeconds(value);
  }
}

const runTimer = (sec:any, min:any, hr:any, tid?:any) => {
  if (sec > 0){
    setSeconds((s) => s-1);
  }else if (sec === 0 && min > 0){
    setMinutes((min) => min-1);
    setSeconds(59);
  }else if (min === 0) {
    setHours((h) => h-1);
    setMinutes(59);
    setSeconds(59);
  }
  if (sec ===0 && min === 0 && hr === 0){
    handleReset();
    alert("Timer is finished.");
    clearInterval(tid);
    return
  }
}

  useEffect(() => {
    let tid:any;
    if (isStart) {
      tid = setInterval(() => {
        runTimer(seconds,minutes,hourse,tid)
      }, 1000);
      setTimerId(tid);
    }
    return () => {
      clearInterval(tid);
    }

  },[isStart,hourse,minutes,seconds])

console.log(hourse, minutes, seconds);


  return (
    
    <div className="flex  flex-col w-screen h-screen bg-gradient-to-r from-blue-700 to-black justify-center items-center space-y-8">
      <h1 className="sm:text-5xl text-3xl font-serif text-white font-bold">Countdown Timer</h1>
      {
        !isStart && (
          <div className="flex flex-col justify-center items-center space-y-8">
        <div className="space-x-7">
          <input
            onChange={handleInput}
             className="text-center w-16 h-16 border-none outline-none text-2xl text-blue-900 font-bold" id="hours"  placeholder="HH" />
          <input
            onChange={handleInput}
             className="text-center w-16 h-16 border-none outline-none text-2xl text-blue-900 font-bold" id="minutes"  placeholder="MM" />
          <input
            onChange={handleInput}
             className="text-center w-16 h-16 border-none outline-none text-2xl text-blue-900 font-bold" id="seconds"  placeholder="SS" />
          </div>
            <button 
            onClick={handleStart}
            className="text-white   text-xl px-9 py-2 bg-blue-500 rounded-xl" >Start</button>
          </div>
        )
      }

      {
      isStart && (
        <div className="space-y-7">
          <div className="flex justify-center items-center fixed space-x-2 md:space-x-3 text-5xl font-bold text-white">
            
          <div >{hourse < 10 ? `0${hourse}` : hourse}</div>
          <span>:</span>
          <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
          <span>:</span>
          <div>{seconds < 10 ? `0${seconds}` : seconds}</div>
        </div>
        <div className="space-x-7 pt-12">
          {
            !isPaused && (
              <button
              onClick={handlePause}
               className="text-white text-xl w-28 h-11 bg-blue-500 rounded-xl">Pause</button>
            )
          }
          {
            isPaused && (
              <button
              onClick={handleResume}
              className="text-white   text-xl w-28 h-11 bg-blue-500 rounded-xl">Resume</button>
            )
          }
          <button
            onClick={handleReset}
            className="text-white   text-xl w-28 h-11 bg-blue-500 rounded-xl">Reset</button>
        </div>
      </div>
        )
      }
    </div>
  )
}
