import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

interface Field {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
}

interface ReactCrudProps {
  formTitle: string;
  data: Field[];
  createData: (formData: { [key: string]: string }) => void;
}

const ReactCrud: React.FC<ReactCrudProps> = ({ createData, formTitle, data }) => {
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
    <Container>
      <h2>{formTitle}</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(formData);
          createData(formData);
        }}
      >
        {data.map((field) => (
          <Row key={field.name} className="mb-3">
            <Col md={3}>
              <label htmlFor={field.name} className="form-label">
                {field.label}
              </label>
            </Col>
            <Col md={9}>
              <input
                type={field.type}
                className="form-control"
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
              />
            </Col>
          </Row>
        ))}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Container>
  );
};

export default ReactCrud;
