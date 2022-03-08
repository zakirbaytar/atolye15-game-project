import { useEffect, useRef, useState } from 'react';

const useCoundownTimer = (seconds: number) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [timeLeft, setTimeLeft] = useState(seconds);

  const startTimer = () => {
    timer.current = setInterval(() => {
      setTimeLeft((currentTimeLeft) => currentTimeLeft - 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTimeLeft(seconds);
  };

  const restartTimer = () => {
    resetTimer();
    startTimer();
  };

  useEffect(() => {
    if (timeLeft === 0) {
      stopTimer();
    }
  }, [timeLeft, stopTimer]);

  return { timeLeft, startTimer, stopTimer, resetTimer, restartTimer };
};

export default useCoundownTimer;
