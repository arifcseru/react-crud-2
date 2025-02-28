import React, { useState, useEffect } from "react";

interface Field {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
}

interface ReactCrudProps {
  showDate: boolean;
  bengaliDate: boolean;
  data: Field[];
}

const ReactCrud: React.FC<ReactCrudProps> = ({ showDate, bengaliDate, data }) => {
  const [time, setTime] = useState(new Date());
  const [formData, setFormData] = useState<{ [key: string]: string }>(
    data.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {})
  );

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const getBengaliDate = (date: Date) => {
    return date.toLocaleDateString("bn-BD");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      <form>
        {data.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default ReactCrud;
