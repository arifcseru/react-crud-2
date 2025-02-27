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
import DigitalWatch from 'react-digital-watch';

function App() {
    return (
        <div>
            <h1>Digital Watch</h1>
            <DigitalWatch language="en" />
        </div>
    );
}

export default App;
```

## Props

The `DigitalWatch` component accepts the following props:

| Prop       | Type   | Default | Description                           |
|------------|--------|---------|---------------------------------------|
| `language` | string | `en`    | The language code for the watch display. Supported languages: `en`, `es`, `fr`, `de`, etc. |

## License

This project is licensed under the MIT License.