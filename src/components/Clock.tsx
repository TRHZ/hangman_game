import { useEffect, useState } from 'react';
import '../css/clock.css';

interface ClockProps {
  gameStarted: boolean;
}

const Clock: React.FC<ClockProps> = ({ gameStarted }) => {
  const [count, setCount] = useState(0);
  const [intervalKey, setIntervalKey] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (gameStarted) {
      const key = setInterval(() => {
        setCount(count => count + 1);
      }, 1000);
      setIntervalKey(key);
    } else {
      // Reset timer and clear interval when game ends
      setCount(0);
      if (intervalKey) clearInterval(intervalKey);
    }

    return () => {
      // Clear interval when component unmounts
      if (intervalKey) clearInterval(intervalKey);
    };
  }, [gameStarted]);

  return <div className="clock">{count} Seconds have passed</div>;
};

export default Clock;
