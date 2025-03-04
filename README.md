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
    name: "firstName",
    type: "text",
    label: "First Name",
    placeholder: "Enter your first name",
    value: "",
    isRequired: true
  },
  {
    name: "lastName",
    type: "text",
    label: "Last Name",
    placeholder: "Enter your last name",
    value: "",
    isRequired: false
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    value: "",
    isRequired: true
  },
  {
    name: "address",
    type: "textarea",
    label: "Address",
    placeholder: "Enter Address",
    value: "",
    isRequired: false
  }
];

const dataStoreHook = async (formData) => {
  console.log("Storing data:", formData);
  // Your API call or state management logic here
  return formData; // Return the updated form data
};

const listData = [{ 'id': 1, 'firstName': 'John', 'lastName': 'Doe', 'email': 'test@mail.com', 'address': '123 Main St' }];
const fieldsToShow = ['firstName', 'lastName', 'email', 'address'];

function App() {
  return (
    <div>
      <div className="App">
        <ReactCrud 
          formTitle="Employee Data"
          dataStoreHook={dataStoreHook}
          formEntryData={formData}
          listData={listData}
          fieldsToShow={fieldsToShow}
          apiUrl="/api/employees" 
        />
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
| `language`      | string                                   | The language code for the watch display. Supported languages: `en`, `bd`, `es`, `fr`, `de`, etc. |

## Features

- Create, read, update, and delete operations with a single component
- Form validation for required fields
- Modal-based form entry
- Pagination support
- Search functionality
- Responsive Bootstrap-based UI
- Font Awesome icons for better user experience

## Dependencies

This component requires:
- Bootstrap (for responsive UI)
- Font Awesome (for icons)

## Field Interface

Each field in the `formEntryData` array should have the following properties:

| Property       | Type    | Description                                        |
|---------------|------------------------------------------|----------------------------------------------------|
| `isRequired`  | boolean | Whether the field is required                     |
| `name`        | string  | Name of the field (used as identifier)            |
| `type`        | string  | Field type (text, email, textarea, date, hidden, etc.) |
| `label`       | string  | Field label displayed in the form                 |
| `placeholder` | string  | Placeholder text for the field                    |
| `value`       | string  | Default value for the field                       |

## License

This project is licensed under the MIT License.