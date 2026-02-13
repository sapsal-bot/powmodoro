
import React, { useState, useCallback, useEffect } from 'react';
import { TimerStatus } from './types';
import Timer from './components/Timer';
import { getExtravagantPraise } from './services/geminiService'; // Import the service
import Celebration from './components/Celebration';

const DEFAULT_FOCUS_TIME = 25 * 60; // 25 minutes
// PRE_FETCH_THRESHOLD_SECONDS is no longer strictly necessary since praise generation is instant
// const PRE_FETCH_THRESHOLD_SECONDS = 10; // Start fetching praise when 10 seconds remain

// Combined all floating images, with corrections for GitHub raw URLs
const floatingCharacterImages = [
  "https://github.com/sapsal-bot/sapsal_stuff/blob/main/crepe.png?raw=true", // crepe
  "https://github.com/sapsal-bot/sapsal_stuff/blob/main/thumbman.png?raw=true", // thumbman
  "https://github.com/sapsal-bot/sapsal_stuff/blob/main/politecat.png?raw=true", // polite cat
  "https://github.com/sapsal-bot/sapsal_stuff/blob/main/thumb.png?raw=true", // thumb
  "https://github.com/sapsal-bot/sapsal_stuff/blob/main/meme-like%20cat%20with%20party%20hat.%20%EC%8B%A4%EC%82%AC%20%EC%8A%A4%ED%83%80%EC%9D%BC.%20cat%20looks%20super%20excited.%20cat%20is%20standing%20on%20two%20feet.%20you%20can%20see%20its%20whole%20body..jpg?raw=true",
  "https://github.com/sapsal-bot/sapsal_stuff/blob/main/dachshund%20%EC%9D%B4%EB%AF%B8%EC%A7%80%2C%20%EB%B0%B0%EA%B2%B0%20%ED%88%AC%EB%AA%85.jpg?raw=true",
  "https://github.com/sapsal-bot/sapsal_stuff/blob/main/30bdb583ca2d78d9b0821c425835dc1f.jpg?raw=true",
  "https://github.com/sapsal-bot/sapsal_stuff/blob/main/%EB%B0%B0%EA%B2%B0%20%ED%88%AC%EB%AA%85%2C%20%EC%86%8C%EC%8B%9C%EC%A7%80.jpg?raw=true",
  "https://github.com/sapsal-bot/sapsal_stuff/blob/main/%EB%B0%B0%EA%B2%B0%20%ED%88%AC%EB%AA%85%2C%20%ED%94%BC%EC%9E%90%20%EC%A1%B0%EA%B0%81.jpg?raw=true",
  // Adding more prominent images for better visibility
];

const App: React.FC = () => {
  const [sessionCount, setSessionCount] = useState(0);
  const [timerStatus, setTimerStatus] = useState<TimerStatus>(TimerStatus.IDLE);
  const [currentTime, setCurrentTime] = useState(DEFAULT_FOCUS_TIME);
  const [initialTime, setInitialTime] = useState(DEFAULT_FOCUS_TIME);
  const [currentPraise, setCurrentPraise] = useState<string | null>(null);
  // These states are no longer needed as praise is generated locally and instantly
  // const [isPraiseBeingFetched, setIsPraiseBeingFetched] = useState(false);
  // const [isPraiseFetchInitiated, setIsPraiseFetchInitiated] = useState(false);

  // API Key selection states are no longer needed
  // const [hasSelectedApiKey, setHasSelectedApiKey] = useState<boolean>(false);
  // const [showApiKeySelectionPrompt, setShowApiKeySelectionPrompt] = useState<boolean>(false);

  // Removed useEffect for API key status check on component mount

  // Request notification permission on component mount
  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          if (permission === 'denied') {
            console.warn("Notification permission denied. You will not receive session completion alerts.");
          }
        });
      } else if (Notification.permission === 'denied') {
        console.warn("Notification permission is denied. Please enable it in your browser settings to receive session completion alerts.");
      }
    } else {
      console.warn("This browser does not support desktop notifications.");
    }
  }, []);

  // Simplified praise fetch: now synchronous and local
  // Fix: Mark fetchPraiseMessage as async and await the promise returned by getExtravagantPraise
  const fetchPraiseMessage = useCallback(async () => {
    // setIsPraiseBeingFetched(true); // No longer needed
    // setIsPraiseFetchInitiated(true); // No longer needed
    const praiseMessage = await getExtravagantPraise(sessionCount + 1);
    setCurrentPraise(praiseMessage);
    // setIsPraiseBeingFetched(false); // No longer needed
  }, [sessionCount]);

  const handleTick = useCallback(() => {
    setCurrentTime(prev => prev - 1);
  }, []);

  // Removed effect to pre-fetch praise, as it's now instantaneous and fetched on complete.
  /*
  useEffect(() => {
    if (
      timerStatus === TimerStatus.RUNNING &&
      currentTime <= PRE_FETCH_THRESHOLD_SECONDS &&
      !isPraiseFetchInitiated &&
      currentPraise === null
    ) {
      fetchPraiseMessage();
    }
  }, [timerStatus, currentTime, isPraiseFetchInitiated, currentPraise, fetchPraiseMessage]);
  */

  const handleComplete = useCallback(() => {
    fetchPraiseMessage();
    setTimerStatus(TimerStatus.FINISHED);
    setSessionCount(prev => {
      const newSessionCount = prev + 1;

      // Show browser notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification("Pomodoro Session Complete!", {
          body: `Session ${newSessionCount} finished! Time for a well-deserved break.`,
          icon: '/politecat.png' // Using a local image as the icon
        });
      }
      return newSessionCount;
    });
  }, [fetchPraiseMessage]);

  const handleToggle = useCallback(() => {
    if (timerStatus === TimerStatus.RUNNING) {
      setTimerStatus(TimerStatus.PAUSED);
    } else {
      setTimerStatus(TimerStatus.RUNNING);
    }
  }, [timerStatus]);

  const handleReset = useCallback(() => {
    setTimerStatus(TimerStatus.IDLE);
    setCurrentTime(initialTime);
    setCurrentPraise(null);
    // setIsPraiseBeingFetched(false); // No longer needed
    // setIsPraiseFetchInitiated(false); // No longer needed
    // Removed API key prompt state reset
  }, [initialTime]);

  const handleNextSession = useCallback(() => {
    setTimerStatus(TimerStatus.IDLE);
    setCurrentTime(DEFAULT_FOCUS_TIME);
    setInitialTime(DEFAULT_FOCUS_TIME);
    setCurrentPraise(null);
    // setIsPraiseBeingFetched(false); // No longer needed
    // setIsPraiseFetchInitiated(false); // No longer needed
    // Removed API key status re-check and prompt hiding
  }, []);

  const setTimerSeconds = (secs: number) => {
    setInitialTime(secs);
    setCurrentTime(secs);
    setTimerStatus(TimerStatus.IDLE);
    setCurrentPraise(null);
    // setIsPraiseBeingFetched(false); // No longer needed
    // setIsPraiseFetchInitiated(false); // No longer needed
    // Removed API key prompt hiding
  };

  const changeTimerDuration = (mins: number) => {
    setTimerSeconds(mins * 60);
  };

  // Removed handleSelectApiKey function

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-md">
          ✨✨✨ POWMODORO ✨✨✨
        </h1>
        <p className="text-indigo-100 font-medium opacity-90">
          FOCUS pokus fidibus - the praise is on us🪄
        </p>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-lg bg-white bg-opacity-10 backdrop-blur-lg rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white border-opacity-20 flex flex-col items-center">
        
        {/* Session Badge */}
        <div className="mb-8 px-4 py-2 bg-yellow-400 rounded-full font-black text-indigo-900 text-sm shadow-lg animate-bounce-subtle">
          STREAK: {sessionCount} SESSIONS 🔥
        </div>

        <Timer 
          currentTime={currentTime}
          initialTime={initialTime}
          status={timerStatus}
          onTick={handleTick}
          onComplete={handleComplete}
          onToggle={handleToggle}
          onReset={handleReset}
        />

        {/* Quick Presets & Test Mode */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {/* Test Mode Button */}
          <button
            onClick={() => setTimerSeconds(5)}
            disabled={timerStatus === TimerStatus.RUNNING}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all border-2 ${
              initialTime === 5 
                ? 'bg-orange-500 border-orange-500 text-white shadow-md scale-105' 
                : 'bg-white bg-opacity-5 border-orange-400 border-opacity-50 text-orange-200 hover:bg-orange-500 hover:bg-opacity-20'
            } ${timerStatus === TimerStatus.RUNNING ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            TEST (5s)
          </button>

          {[10, 25, 45].map((mins) => (
            <button
              key={mins}
              onClick={() => changeTimerDuration(mins)}
              disabled={timerStatus === TimerStatus.RUNNING}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                initialTime === mins * 60 
                  ? 'bg-white text-indigo-600 shadow-md' 
                  : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
              } ${timerStatus === TimerStatus.RUNNING ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {mins}m
            </button>
          ))}
        </div>
      </main>

      {/* Footer Info */}
      <footer className="mt-8 text-indigo-200 text-xs font-medium text-center max-w-xs leading-relaxed">
        Conceived out of personal necessity, this product was developed as a direct and deliberate response to an internally recognized need, following the repeated realization that existing alternatives failed to sufficiently address it. It is my sincere hope that its use may not only contribute to improved productivity, but also foster a modest yet meaningful sense of accomplishment and self-regard over time.
      </footer>

      {/* Removed API Key Selection Prompt Modal */}

      {/* Celebration Modal */}
      {timerStatus === TimerStatus.FINISHED && currentPraise !== null && (
        <Celebration 
          sessionCount={sessionCount} 
          initialPraise={currentPraise}
          onNext={handleNextSession} 
          floatingImages={floatingCharacterImages} // Pass the array of image URLs
        />
      )}
    </div>
  );
};

export default App;