
# TaskPalette - Trello-like Kanban Board App

## Project Overview

TaskPalette is a comprehensive Kanban board application inspired by Trello. It provides a feature-rich task management system allowing users to create boards, manage tasks with drag-and-drop functionality, customize themes, and configure user profiles.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Features Guide](#features-guide)
  - [Dashboard & Navigation](#dashboard--navigation)
  - [Managing Boards](#managing-boards)
  - [Working with Tasks](#working-with-tasks)
  - [Theme Customization](#theme-customization)
  - [Settings](#settings)
- [Project Structure](#project-structure)
- [Technical Details](#technical-details)
- [Troubleshooting](#troubleshooting)

## Getting Started

### Prerequisites

Before running TaskPalette locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16.x or higher)
- npm (comes with Node.js) or [Yarn](https://yarnpkg.com/) or [Bun](https://bun.sh/) (recommended)

### Installation

1. **Clone the repository**:

```bash
git clone <repository-url>
cd taskpalette
```

2. **Install dependencies**:

With npm:
```bash
npm install
```

With Yarn:
```bash
yarn install
```

With Bun:
```bash
bun install
```

### Running the Application

1. **Start the development server**:

With npm:
```bash
npm run dev
```

With Yarn:
```bash
yarn dev
```

With Bun:
```bash
bun dev
```

2. **Access the application**:
   
Open your browser and navigate to [http://localhost:8080](http://localhost:8080)

## Features Guide

### Dashboard & Navigation

- **Home Page**: Access all your boards from the main dashboard
- **Sidebar**: Navigate between boards and access application settings
  - Click "ALL BOARDS" at the top to return to the dashboard
  - Use the toggle at the bottom to collapse/expand the sidebar
- **Board Search**: Filter boards using the search input in the sidebar
- **Theme Toggle**: Switch between light and dark mode using the toggle in the sidebar

### Managing Boards

- **View Boards**: Click on a board card or its name in the sidebar to view it
- **Create Board**: 
  1. Click the "Create New Board" button in the sidebar
  2. Fill in the board details form (title, description, etc.)
  3. Click "Create Board"
- **Edit Board**: 
  1. Open the board you want to edit
  2. Click the vertical dots menu (⋮) in the top-right corner
  3. Select "Edit Current Board"
  4. Update the board details and click "Save Changes"
- **Delete Board**:
  1. Open the board you want to delete
  2. Click the vertical dots menu (⋮) in the top-right corner
  3. Select "Delete Board" (currently notifies with a toast that deletion is not implemented)

### Working with Tasks

- **View Tasks**: Tasks are displayed in columns based on their status (To Do, In Progress, Done)
- **Create Task**:
  1. Open a board
  2. Click the "+ Add New Task" button in the header
  3. Fill in the task details (title, description, priority, due date)
  4. Click "Create Task"
- **Edit Task**:
  1. Click on a task card to open it
  2. Update the task details
  3. Click "Save Changes"
- **Move Tasks**: Drag and drop tasks between columns to change their status
  - You can also change status from the task edit modal

### Theme Customization

- **Toggle Dark/Light Mode**:
  - Use the theme toggle in the sidebar
  - Go to Settings > Theme to configure additional theme options
- **Color Schemes**:
  - Access the Settings page
  - Choose from available color schemes (Blue, Green, Purple, Orange)
  - Enable/disable system preference detection

### Settings

- **Profile Settings**: Update user profile information
- **Theme Settings**: Customize application appearance
- **Notification Preferences**: Configure how you receive notifications
- **Security Settings**: Update password and security preferences

## Project Structure

```
src/
├── components/
│   ├── atoms/         # Basic components (Badge, Button, etc.)
│   ├── molecules/     # Combinations of atoms (TaskCard, BoardCard, etc.)
│   ├── organisms/     # Larger components (TaskList, BoardList, etc.)
│   ├── templates/     # Page layouts (BoardTemplate, SettingsTemplate, etc.)
│   └── ui/            # shadcn/ui components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Page components
├── recoil/
│   ├── atoms/         # Recoil atoms for state management
│   └── selectors/     # Recoil selectors for derived state
└── main.tsx           # Application entry point
```

## Technical Details

TaskPalette is built with:

- **React** with **TypeScript** for the UI
- **Recoil** for state management
- **React Router** for navigation
- **React Hook Form** with **Zod** for form validation
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Framer Motion** for animations
- **react-beautiful-dnd** for drag-and-drop functionality

## Troubleshooting

### Common Issues

- **Build Errors**: If you encounter build errors, try:
  ```bash
  npm clean-install
  # or
  yarn cache clean && yarn install
  # or
  bun install --force
  ```

- **White Screen**: If the application shows a white screen:
  - Check browser console for errors
  - Ensure all dependencies are correctly installed
  - Restart the development server

### Browser Compatibility

TaskPalette works best in modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

We welcome contributions! Please see our contributing guidelines for details.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

