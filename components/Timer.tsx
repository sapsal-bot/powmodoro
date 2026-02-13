
import React, { useEffect, useRef } from 'react';
import { TimerStatus } from '../types';

interface TimerProps {
  currentTime: number;
  initialTime: number;
  status: TimerStatus;
  onTick: () => void;
  onComplete: () => void;
  onToggle: () => void;
  onReset: () => void;
}

const Timer: React.FC<TimerProps> = ({ 
  currentTime, 
  initialTime, 
  status, 
  onTick, 
  onComplete, 
  onToggle, 
  onReset 
}) => {
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (status === TimerStatus.RUNNING) {
      timerRef.current = window.setInterval(() => {
        if (currentTime > 0) {
          onTick();
        } else {
          onComplete();
        }
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, currentTime, onTick, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((initialTime - currentTime) / initialTime) * 100;

  return (
    <div className="flex flex-col items-center">
      {/* Circular Progress Display */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            className="stroke-current text-white text-opacity-20 fill-none"
            strokeWidth="12"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            className="stroke-current text-yellow-400 fill-none transition-all duration-500 ease-linear"
            strokeWidth="12"
            strokeDasharray="283%"
            strokeDashoffset={`${283 - (283 * progress) / 100}%`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-6xl md:text-7xl font-black text-white tabular-nums drop-shadow-lg">
            {formatTime(currentTime)}
          </span>
          <span className="text-white text-opacity-70 font-bold uppercase tracking-widest text-sm mt-2">
            {status === TimerStatus.RUNNING ? 'Focusing...' : 'Ready?'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-12 flex gap-4">
        <button
          onClick={onToggle}
          className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-3xl transition-all shadow-xl active:scale-90 ${
            status === TimerStatus.RUNNING 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-green-400 hover:bg-green-500 text-white'
          }`}
        >
          <i className={`fa-solid ${status === TimerStatus.RUNNING ? 'fa-pause' : 'fa-play'}`}></i>
        </button>
        
        <button
          onClick={onReset}
          className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white flex items-center justify-center text-3xl transition-all active:scale-90 shadow-xl"
        >
          <i className="fa-solid fa-rotate-left"></i>
        </button>
      </div>
    </div>
  );
};

export default Timer;
