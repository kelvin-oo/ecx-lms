"use client"
import { useEffect, useRef, useState } from "react"

export default function Timer({
  initDeadline = "00:00:00",
  className
}) {
  const [timer, setTimer] = useState("...")
  const [isTwoHrsLeft, setTwoHrsLeft] = useState(false)
  const Ref = useRef()

  function getTimeRemaining(deadTime) {
    const total = Date.parse(deadTime) - Date.parse(new Date())
    
    const hour = Math.floor(total / (1000 * 60 * 60) % 24)
    const minutes = Math.floor((total / 1000 / 60) % 60)
    const seconds = Math.floor((total / 1000) % 60)

    return {total, hour, minutes, seconds}
  }

  function startTimer(deadTime) {
    let { total, hour, minutes, seconds } = getTimeRemaining(deadTime)
    
    if (total >= 0) {
      setTimer(
        (hour > 9 ? hour : '0' + hour) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':' +
        (seconds > 9 ? seconds : '0' + seconds)
      )
    }
  }

  function clearTimer(deadTime) {
    setTimer(initDeadline)
    if (Ref.current) clearInterval(Ref.current)

    const id = setInterval(() => {
      startTimer(deadTime)
    }, 1000);

    Ref.current = id;
  }

  function getDeadTime() {
    let deadline = new Date()
    const initSplit = initDeadline.split(":")
    deadline.setHours(deadline.getHours() + (+initSplit[0]))
    deadline.setMinutes(deadline.getMinutes() + (+initSplit[1]))
    deadline.setSeconds(deadline.getSeconds() + (+initSplit[2]))

    return deadline
  }


  useEffect(() => {
    clearTimer(getDeadTime())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isTwoHrsLeft) return
    const timerSplit = timer.split(":")
    if ((+timerSplit[0]) < 2) {
      setTwoHrsLeft(true)
    }
  }, [isTwoHrsLeft, timer]) //text-end lg:text-center

  return (
    <div
      className={`col-span-2 lg:col-span-1 text-sm lg:text-base ${className || ''}`}
      style={{
        color: isTwoHrsLeft ? "#F2443F" : "#00B29A"
      }}
    >
      {timer}
    </div>
  )
}