# Cardiovascular Disease Prediction Frontend

This is the frontend application for the Cardiovascular Disease Prediction system, built with React, Tailwind CSS, and shadcn/ui components.

## Features

- Modern, responsive UI with Tailwind CSS
- Component library using shadcn/ui design principles
- Landing page for unauthenticated users
- Dashboard layout for authenticated users
- Tabular data prediction interface
- ECG analysis interface with file upload
- User authentication (login/registration)
- Loading states and skeleton screens
- Toast notifications for user feedback

## Tech Stack

- React.js
- Tailwind CSS
- shadcn/ui component library
- Axios for API requests

## Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Header, LandingPage)
│   ├── dashboard/       # Dashboard components
│   ├── predictions/     # Prediction model interfaces
│   └── ui/              # Reusable UI components
├── api.js              # API service
└── App.js              # Main application component
```

For detailed documentation on components, see [src/components/README.md](src/components/README.md).

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Development

This project uses:
- Tailwind CSS for styling
- Custom design system with medical-themed color palette
- Component-based architecture
- Responsive design principles

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)
