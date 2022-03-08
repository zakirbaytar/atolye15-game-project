import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';

import './style.css';

interface TimerOptions {
  defaultColor: string;
  warningThreshold: number;
  warningColor: string;
  alertThreshold: number;
  alertColor: string;
}

interface TimerProps {
  seconds: number;
  timeLeft: number;
  options?: TimerOptions;
  onTimeout?: () => void;
}

const defaultOptions = {
  defaultColor: '#00d1b2',
  warningThreshold: 4,
  warningColor: '#ffe08a',
  alertThreshold: 2,
  alertColor: '#f14668',
};

const FULL_DASH_ARRAY = 283;

const Timer: FunctionComponent<TimerProps> = ({ seconds, timeLeft, options, onTimeout }) => {
  const [strokeDashArray, setStrokeDashArray] = useState('283 283');
  const { defaultColor, alertColor, alertThreshold, warningColor, warningThreshold } = {
    ...defaultOptions,
    ...options,
  };

  const getRemainingPathColor = useCallback(() => {
    if (alertThreshold && timeLeft <= alertThreshold) {
      return alertColor;
    }
    if (warningThreshold && timeLeft <= warningThreshold) {
      return warningColor;
    }

    return defaultColor;
  }, [timeLeft, alertThreshold, alertColor, warningThreshold, warningColor, defaultColor]);

  const calculateTimeFraction = useCallback(() => {
    const rawTimeFraction = timeLeft / seconds;
    return rawTimeFraction - (1 / seconds) * (1 - rawTimeFraction);
  }, [timeLeft, seconds]);

  const getCircleDasharray = useCallback(() => {
    return `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
  }, [calculateTimeFraction]);

  const [remainingPathColor, setRemainingPathColor] = useState(defaultColor);

  useEffect(() => {
    if (!timeLeft) onTimeout?.();

    setStrokeDashArray(getCircleDasharray());
    setRemainingPathColor(getRemainingPathColor());
  }, [timeLeft, getCircleDasharray, getRemainingPathColor, onTimeout]);

  return (
    <div className="timer">
      <svg className="timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g className="timer__circle">
          <circle className="timer__path-elapsed" cx="50" cy="50" r="45" />
          <path
            id="timer-path-remaining"
            strokeDasharray={strokeDashArray}
            className="timer__path-remaining"
            style={{ color: remainingPathColor }}
            d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
          />
        </g>
      </svg>
      <span id="timer-label" className="timer__label">
        {timeLeft}
      </span>
    </div>
  );
};

Timer.defaultProps = {
  options: defaultOptions,
  onTimeout: () => {},
};

export default Timer;
