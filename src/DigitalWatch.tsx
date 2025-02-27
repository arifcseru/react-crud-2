import React, { useState, useEffect } from "react";

const DigitalWatch: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontSize: "2rem", fontFamily: "monospace", textAlign: "center" }}>
      {time.toLocaleTimeString()}
    </div>
  );
};

export default DigitalWatch;
