# Admin Dashboard - Angular 17

## Project Overview

This project is an admin dashboard built with Angular 17 and styled with Tailwind CSS. It features both dark mode and light mode for a better user experience. The dashboard allows for CRUD operations and displays data dynamically in a user-friendly interface.

## Features

- Angular 17 framework
- Tailwind CSS for styling
- Dark mode and light mode toggle
- Responsive design
- CRUD operations
- Form validation and dynamic form field addition
- Data display in tables with sorting and filtering capabilities

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- Angular CLI installed globally (`npm install -g @angular/cli`)

## Installation

1. Clone the repository

    ```sh
    git clone  https://github.com/MohandSoluman/Dashboard.git
    ```
    

2. Navigate to the project directory

    ```sh
    cd Dashboard
    ```

3. Install the dependencies

    ```sh
    npm install
    ```

## Usage

1. Start the development server

    ```sh
    ng serve
    ```

2. Open your browser and navigate to `http://localhost:4200`

3. Use the admin dashboard to perform CRUD operations and manage your data.

## Tailwind CSS Integration

Tailwind CSS is used for styling the application. The configuration can be found in `tailwind.config.js` and the styles are included in `src/styles.css`.

### Dark and Light Mode

The dashboard supports both dark and light modes. The mode can be toggled using a switch in the UI.

#### Setting up Dark Mode

Tailwind CSS has built-in support for dark mode. The configuration is set in `tailwind.config.js`:

```js
module.exports = {
  darkMode: 'class', // or lightMode
}
