import React, { useState, useEffect } from "react";

interface DigitalWatchProps {
  showDate: boolean;
  bengaliDate: boolean;
}

const DigitalWatch: React.FC<DigitalWatchProps> = ({ showDate, bengaliDate }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const getBengaliDate = (date: Date) => {
    return date.toLocaleDateString("bn-BD");
  };

  return (
    <div>
      <h2>{time.toLocaleTimeString()}</h2>
      {showDate && !bengaliDate && (
        <p style={{ fontSize: "small" }}>
          {time.toLocaleDateString()}
        </p>
      )}
      {showDate && bengaliDate && (
        <p style={{ fontSize: "small" }}>
          {getBengaliDate(time)}
        </p>
      )}
    </div>
  );
};

export default DigitalWatch;
