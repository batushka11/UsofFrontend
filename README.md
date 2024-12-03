<div align="center">
  <img src="https://speakaboutit.s3.eu-north-1.amazonaws.com/svgviewer-png-output-4.png" alt="Logo" style="height: 130px; width: 250px;" />
</div>

![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black)

# Speak About It - Frontend

**Speak About It** is a question-and-answer platform designed for both professional and enthusiast programmers. This frontend project is built with modern technologies to provide a smooth, interactive experience for users to share challenges, solutions, and collaborate with others.

## Table of Contents

- [Technology Stack](#technology-stack)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the Application](#running-the-application)
- [License](#license)

---

## Technology Stack

This project is built using the following frontend technologies:

- **React**: A powerful JavaScript library for building user interfaces, enabling a component-based architecture.
- **TypeScript**: Provides type safety to improve code quality and developer productivity.
- **Chakra UI**: A modern React UI library that simplifies building accessible and visually appealing components.
- **React Router**: Used for handling client-side routing, enabling navigation within the app without full page reloads.
- **React Hook Form**: Simplifies form handling and validation in React applications.
- **Redux**: A state management tool used to manage and share state across the app.
- **Zod**: A TypeScript-first schema validation library to ensure the integrity of data throughout the app.
- **Webpack**: A module bundler used to bundle and optimize JavaScript, CSS, and other assets for production.
- **NPM**: Node Package Manager is used for managing project dependencies and scripts.

---

## Features

- **User Registration and Authentication**: Secure registration and login system to create and manage accounts.
- **Post Creation and Interaction**: Users can create posts, comment, and engage with other users' posts.
  - **Markdown Support**: Posts are displayed and created using Markdown, allowing users to format text, add links, images, and code blocks for better readability and clarity.
  - **Customizable Posts**: Users have the flexibility to customize their posts by adding rich text, images, code snippets, and even embedding content. This enhances the content presentation and provides a personalized experience for both the poster and the readers.
- **Categories and Tags**: Posts can be categorized and tagged for easy organization and search.
- **Sorting and Filtering**: Flexible options to sort and filter posts based on various criteria.
- **Favorites**: Users can mark posts as favorites for easy access later.
- **Notifications**: Receive email notifications about updates on subscribed posts.
- **Role-based Access**: Different permissions for regular users and admins, controlling access to various features.
- **Dark and Light Themes**: The app supports both dark and light themes. Users can toggle between these themes to suit their preferences. Chakra UI provides a seamless experience for switching between themes with the click of a button.
- **User Status (Online/Offline)**: Users can see whether other users are online or offline, represented by a visible status indicator next to their profile. Active users are marked with a green dot, while inactive users are marked with a gray dot.

## Getting Started

Follow these steps to set up the frontend project on your local machine.

### Prerequisites

Ensure you have the following installed:

- **NPM**: [Download and install NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/batushka11/USOF-frontend.git
   ```

2. **Navigate to the Project Folder**:

   ```bash
   cd USOF-frontend
   ```

3. **Set Up Environment Variables**: An .env.example file is provided with all the required environment variables. Create a .env file by copying .env.example and then fill in the necessary values.

   ```bash
   cp .env.example .env
   ```

4. **Install dependencies**: Install all necessary dependencies for the project by running:

   ```bash
   npm install
   ```

---

### Running the Application

- **Start the application using**:

  ```bash
  npm run start
  ```

By default, the app will be available at http://localhost:3000

## License

This project is licensed under the MIT License. See the [LICENSE](./License.md) file for more details.
