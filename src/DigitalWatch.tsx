import React, { useState, useEffect } from "react";

interface DigitalWatchProps {
  showDate: boolean;
}

const DigitalWatch: React.FC<DigitalWatchProps> = ({ showDate }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h2>{time.toLocaleTimeString()}</h2>
      {showDate && <p style={{ fontSize: "small" }}>{time.toLocaleDateString()}</p>}
    </div>
  );
};

export default DigitalWatch;
