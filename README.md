# React Digital Watch

This is a simple digital clock component for React that supports multiple languages.

## Installation

To install the package, use npm:

```bash
npm install react-digital-watch
```

## Usage

Here is an example of how to use the `react-digital-watch` component in your React application:

```jsx
import React from 'react';
import { ReactCrud } from 'react-crud-2';


const formData = [
  {
    name: "firstName",
    type: "text",
    label: "First Name",
    placeholder: "Enter your first name",
    value: ""
  },
  {
    name: "lastName",
    type: "text",
    label: "Last Name",
    placeholder: "Enter your last name",
    value: ""
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    value: ""
  },
  {
    name: "address",
    type: "textarea",
    label: "Address",
    placeholder: "Enter Address",
    value: ""
  }
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ReactCrud formTitle="User Registration" data={formData} />
      </header>
    </div>
  );
}

export default App;
```

## Props

The `ReactCrud` component accepts the following props:

| Prop       | Type   | Default | Description                           |
|------------|--------|---------|---------------------------------------|
| `language` | string | `en`    | The language code for the watch display. Supported languages: `en`, `es`, `fr`, `de`, etc. |

## License

This project is licensed under the MIT License.