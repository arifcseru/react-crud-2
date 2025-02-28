import React, { useState, useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";

interface Field {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
}

interface ReactCrudProps {
  formTitle: string;
  formEntryData: Field[];
  storeData: (formData: { [key: string]: string }) => void;
  listData: { [key: string]: string }[];
  fieldsToShow: string[];
}

const ReactCrud: React.FC<ReactCrudProps> = ({ storeData, formTitle, formEntryData, listData, fieldsToShow }) => {
  const [time, setTime] = useState(new Date());
  const [formData, setFormData] = useState<{ [key: string]: string }>(
    formEntryData.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {})
  );

  const [crudListData, setCrudListData] = useState(listData);

  useEffect(() => {
    setCrudListData(listData);
  }, [listData]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const getBengaliDate = (date: Date) => {
    return date.toLocaleDateString("bn-BD");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container>
      <h2>{formTitle}</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const updatedList = [...crudListData, formData];
          setCrudListData(updatedList);
          setFormData(formEntryData.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {}));
          storeData(formData);
        }}
      >
        {formEntryData.map((field) => (
          <Row key={field.name} className="mb-3">
            <Col md={3}>
              <label htmlFor={field.name} className="form-label">
                {field.label}
              </label>
            </Col>
            <Col md={9}>
              {(field.type == 'text' || field.type == 'date' || field.type == 'number' || field.type == 'email') &&
                <input
                  type={field.type}
                  className="form-control"
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                />}

              {(field.type == 'textarea') &&
                <textarea
                  className="form-control"
                  name={field.name}
                  placeholder={field.placeholder}
                  onChange={handleChange}
                >{formData[field.name]}</textarea>}
            </Col>
          </Row>
        ))}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {listData && <Table striped bordered hover>
        <thead>
          <tr>
            {fieldsToShow.map((field) => (
              <th key={field}>{field}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {crudListData.map((item, index) => (
            <tr key={index}>
              {fieldsToShow.map((field) => (
                <td key={field}>{item[field]}</td>
              ))}
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    const selectedItem = listData[index];
                    setFormData(selectedItem);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    const updatedList = listData.filter((_, i) => i !== index);
                    // Assuming you have a state to manage listData, you need to update it here
                    // For example, if you have a state like `const [data, setData] = useState(listData);`
                    // You would call `setData(updatedList);`
                    setCrudListData(updatedList);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      }
    </Container>
  );
};

export default ReactCrud;
