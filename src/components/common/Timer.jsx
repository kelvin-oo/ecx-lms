'use client'
import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ date, className }) => {
  const [timer, setTimer] = useState('00:00:00');
  const [isFinished, setIsFinished] = useState(false);

  const calculateTimeRemaining = (deadLine) => {
    const currentTime = new Date();
    const timeRemaining = deadLine - currentTime;

    if (timeRemaining <= 0) {
      setIsFinished(true);
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    return { hours, minutes, seconds };
  };

  const updateTimer = () => {
    const deadLine = new Date(date.split('/').reverse().join('-'));
    const { hours, minutes, seconds } = calculateTimeRemaining(deadLine);

    if (!isFinished) {
      setTimer(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }
  };

  useEffect(() => {
    const intervalId = setInterval(updateTimer, 1000);
    return () => clearInterval(intervalId);
  }, [date, isFinished]);

  return (
    <div
      className={`col-span-2 lg:col-span-1 text-sm lg:text-base  ${className || ''}`}
      style={{
        color: isFinished ? "#F2443F" : "#00B29A"
      }}
    >
      {timer}
    </div>
  );
};

export default CountdownTimer;