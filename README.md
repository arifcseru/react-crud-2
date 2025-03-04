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
        resolve(response.data);
      })
      .catch(error => {
        console.error("There was an error deleting the data:", error);
        reject(error);
      });
  });
}

const listData = [{ 'id': 1, name: 'John', email: 'test@mail.com' }];
const fieldsToShow = ['firstName', 'lastName', 'email', 'address'];

function App() {
  return (
    <div>
      <div className="App">
        <ReactCrud formTitle={"Employee Data"}
          dataStoreHook={saveEmployee}
          dataRemoveHook={deleteEmployee}
          formEntryData={formData}
          listData={listData}
          fieldsToShow={fieldsToShow} />
      </div>
    </div>
  );
}

export default App;

```

## Props

The `ReactCrud` component accepts the following props:

| Prop       | Type   | Default | Description                           |
|------------|--------|---------|---------------------------------------|
| `language` | string | `en`    | The language code for the watch display. Supported languages: `en`, `bd`, `es`, `fr`, `de`, etc. |

## License

This project is licensed under the MIT License.