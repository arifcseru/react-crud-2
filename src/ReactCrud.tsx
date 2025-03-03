import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Field {
  isRequired: boolean;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
}

interface ReactCrudProps {
  formTitle: string;
  formEntryData: Field[];
  dataStoreHook: (formData: { [key: string]: string }) => Promise<void>;
  listData: { [key: string]: string }[];
  fieldsToShow: string[];
  apiUrl: string;
}

const ReactCrud: React.FC<ReactCrudProps> = ({ dataStoreHook, formTitle, formEntryData, listData, fieldsToShow, apiUrl }) => {
  const [time, setTime] = useState(new Date());
  const [formData, setFormData] = useState<{ [key: string]: string }>(
    formEntryData.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {})
  );

  const [crudListData, setCrudListData] = useState(listData);
  const [crudListDataLabels, setCrudListDataLabels] = useState<string[]>([]);

  useEffect(() => {
    setCrudListData(listData);
  }, [listData]);

  useEffect(() => {
    let labels = [];
    for (let crudDataField of crudListData) {
      for (let key in crudDataField) {
        const fieldLabel = formEntryData.find((field) => field.name === key)?.label || key;
        labels.push(fieldLabel);
      }
    }
    setCrudListDataLabels(labels);

  }, []);

  const getBengaliDate = (date: Date) => {
    return date.toLocaleDateString("bn-BD");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container">
      <h2>{formTitle}</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          for (let field of formEntryData) {
            if (field.isRequired && !formData[field.name]) {
              alert(`${field.label} is required`);
              return;
            }
          }

          //const updatedList = [...crudListData, formData];
          //setCrudListData(updatedList);
          // setFormData(formEntryData.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {}));

          dataStoreHook(formData).then(() => {
            console.log("formData:", JSON.stringify(formData));
            const existingIndex = crudListData.findIndex(item => item.id === formData.id);
            console.log("existingIndex:", existingIndex);

            if (existingIndex !== -1) {
              console.log(crudListData);
              const updatedList = crudListData.map((item, index) =>
                index === existingIndex ? formData : item
              );
              console.log(updatedList);

              setCrudListData(updatedList);
            } else {
              const updatedList = [...crudListData, formData];
              setCrudListData(updatedList);
            }
            setFormData(formEntryData.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {}));
          }).catch((error) => {
            console.error("Error storing data:", error);
            alert("Failed to store data. Please try again.");
          });
        }}
      >
        {formEntryData.map((field) => (
          <div key={field.name} className="row mb-3">
            {(field.type != 'hidden') && <div className="col col-md-3" >
              <label htmlFor={field.name} className="form-label">
                {field.label}
              </label>
            </div>}
            {(field.type != 'hidden') && <div className="col col-md-9">
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
            </div>}

            {(field.type == 'hidden') && <input
              type={'hidden'}
              className="form-control"
              name={field.name}
              value={formData[field.name]}
            />}
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {listData && <div className="table">
        <thead>
          <tr>
            {crudListDataLabels.map((field) => (
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
                    if (!window.confirm("Are you sure you want to delete this item?")) {
                      return;
                    }
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
      </div>
      }
    </div>
  );
};

export default ReactCrud;
