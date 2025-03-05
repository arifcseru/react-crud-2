# React CRUD 2

This is a simple crud form component for React that supports all features for create read update and delete.

## Installation

To install the package, use npm:

```bash
npm install react-crud-2
```

## Usage

Here is an example of how to use the `react-crud-2` component in your React application:

```jsx
import React from 'react';
import { ReactCrud } from 'react-crud-2';

function App() {
  const formData = [
    {
      isRequired: false,
      name: "id",
      type: "hidden",
      label: "Id",
      placeholder: "Enter your id",
      value: ""
    },
    {
      isRequired: true,
      name: "firstName",
      type: "text",
      label: "First Name",
      placeholder: "Enter your first name",
      value: ""
    },
    {
      isRequired: true,
      name: "lastName",
      type: "text",
      label: "Last Name",
      placeholder: "Enter your last name",
      value: ""
    },
    {
      isRequired: true,
      name: "dob",
      type: "date",
      label: "Date Of Birth",
      placeholder: "Enter Date Of Birth",
      value: ""
    },
    {
      isRequired: true,
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      value: ""
    },
    {
      isRequired: true,
      name: "address",
      type: "textarea",
      label: "Address",
      placeholder: "Enter Address",
      value: ""
    }
  ];
  const saveEmployee = (formData) => {
    return new Promise((resolve, reject) => {
      console.log("Store Data triggered.");
      axios.post("https://jsonplaceholder.typicode.com/todos", formData)
        .then(response => {
          console.log("Data successfully posted:", response.data);
          resolve(response.data);
        })
        .catch(error => {
          console.error("There was an error posting the data:", error);
          reject(error);
        });
    });
  }


  const deleteEmployee = (id) => {
    return new Promise((resolve, reject) => {
      console.log("Delete Data triggered.");
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(response => {
          console.log("Data successfully deleted:", response.data);
          setListData(prevListData => prevListData.filter(employee => employee.id !== id));
          resolve(response.data);
        })
        .catch(error => {
          console.error("There was an error deleting the data:", error);
          reject(error);
        });
    });
  }

  const fieldsToShow = ['id', 'firstName', 'lastName', 'email', 'address'];
  const [listData, setListData] = useState(Array.from({ length: 30 }, (v, i) => ({
    id: i + 1,
    firstName: `FirstName${i + 1}`,
    lastName: `LastName${i + 1}`,
    dob: `2000-01-${String(i + 1).padStart(2, '0')}`,
    email: `user${i + 1}@mail.com`,
    address: `Address ${i + 1}, City, Country`
  })));

  return (
    <div>
      <h1 className="text-center mt-5">React-Crud-2</h1>
      <div className="App mt-3">
        <ReactCrud formTitle={"Employee Information"}
          identifierField={"id"}
          dataStoreHook={saveEmployee}
          dataRemoveHook={deleteEmployee}
          listData={listData}
          formEntryData={formData}
          fieldsToShow={fieldsToShow} />
      </div>
    </div>
  );
}

export default App;

```

## Props

The `ReactCrud` component accepts the following props:

| Prop            | Type                                     | Description                                        |
|-----------------|------------------------------------------|----------------------------------------------------|
| `formTitle`     | string                                   | Title of the CRUD form                             |
| `formEntryData` | Field[]                                  | Array of form field definitions                    |
| `dataStoreHook` | (formData: {[key: string]: string}) => Promise<void> | Function to handle form submission     |
| `listData`      | {[key: string]: string}[]                | Data to display in the table                       |
| `fieldsToShow`  | string[]                                 | Fields from listData to display as table columns   |
| `apiUrl`        | string                                   | API URL for data operations (currently unused)     |
| `dataRemoveHook` | (id: string) => Promise<void> | Function to handle data deletion |
| `identifierField` | string | The unique identifier field name in the data |

## Features

- Create, read, update, and delete operations with a single component
- Form validation for required fields
- Modal-based form entry
- Pagination support
- Search functionality
- Responsive Bootstrap-based UI
- Customizable form fields


## Dependencies

This component requires:
- Bootstrap (for responsive UI)
- Font Awesome (for icons)
- React (for building the user interface)
- PropTypes (for type-checking props)
- React Bootstrap (for Bootstrap components in React)
- React Icons (for using icons in React)
## Field Interface

Each field in the `formEntryData` array should have the following properties:

| Property       | Type    | Description                                        |
|---------------|------------------------------------------|----------------------------------------------------|
| `isRequired`  | boolean | Whether the field is required                     |
| `name`        | string  | Name of the field (used as identifier)            |
| `type`        | string  | Field type (text, email, textarea, date, hidden, etc.) |
| `label`       | string  | Field label displayed in the form                 |
| `value`       | string  | Default value for the field                       |

## License

This project is licensed under the MIT License.