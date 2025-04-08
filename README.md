
# TaskPalette - Task Management App

## Project Overview

TaskPalette is a modern task management application built with atomic design principles using React and Recoil. The app allows users to create boards for different projects and manage tasks within those boards with an intuitive, clean interface.

## Tech Stack

- **Frontend**:
  - React with TypeScript
  - Recoil for state management
  - React Router for navigation
  - React Hook Form with Zod for form validation
  - Tailwind CSS for styling
  - shadcn/ui for UI components
  - Lucide React for icons

## Features

- Create, edit, and delete boards
- Create, edit, and delete tasks within boards
- Organize tasks by status (To Do, In Progress, Done)
- Responsive design that works on desktop, tablet, and mobile devices
- Form validation for all inputs

## Component Breakdown (Atomic Design)

### Atoms
Small, basic building blocks of the application:

- **Badge**: Visual indicator for task status
- **Loader**: Loading spinner component

### Molecules
Groups of atoms that work together as a unit:

- **TaskCard**: Displays task information with actions
- **BoardCard**: Displays board information with actions
- **TaskForm**: Form for creating and editing tasks
- **BoardForm**: Form for creating and editing boards

### Organisms
Groups of molecules that form a relatively complex section:

- **AppHeader**: Application header with navigation
- **TaskList**: Displays and organizes tasks by status
- **BoardList**: Displays all boards
- **CreateTaskModal**: Modal for creating tasks
- **EditTaskModal**: Modal for editing tasks

### Templates
Page layouts that place components in a structure:

- **DashboardTemplate**: Layout for the main dashboard
- **BoardTemplate**: Layout for board details
- **BoardFormTemplate**: Layout for board creation/editing

## State Management with Recoil

The application uses Recoil for state management with the following structure:

### Atoms
Pieces of state that components can subscribe to:

- **boardsState**: Stores the list of boards
- **tasksState**: Stores the list of tasks
- **modalState**: Manages the state of modals (create/edit tasks)

### Selectors
Pure functions that derive data from atoms:

- **boardByIdSelector**: Gets a specific board by ID
- **filteredTasksSelector**: Filters tasks by board ID
- **tasksByStatusSelector**: Gets tasks by board ID and status

## Installation and Setup

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd taskpalette
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:8080`

## Project Structure

```
src/
├── components/
│   ├── atoms/         # Basic components
│   ├── molecules/     # Combinations of atoms
│   ├── organisms/     # Larger components
│   ├── templates/     # Page layouts
│   └── ui/            # shadcn/ui components
├── lib/
│   └── utils.ts       # Utility functions
├── pages/             # Page components
├── recoil/
│   ├── atoms/         # Recoil atoms
│   └── selectors/     # Recoil selectors
└── main.tsx           # Application entry point
```

## Responsive Design

The application is fully responsive and adapts to different screen sizes:

- **Desktop**: Full layout with multi-column views
- **Tablet**: Adjusted spacing and layouts
- **Mobile**: Stacked layouts with appropriate touch targets

## Form Validation

All forms implement validation using React Hook Form and Zod:

- **Task Form**:
  - Title: Required
  - Description: Required
  - Status: Must be one of the predefined statuses

- **Board Form**:
  - Title: Required
  - Description: Required

## Future Enhancements

- Drag and drop for task status changes
- User authentication and accounts
- Task due dates and priority levels
- File attachments for tasks
- Task filtering and search
- Dark/light theme toggle
- Task comments and collaboration features

## Change Log

### Version 1.0.0
- Initial release with core functionality
- Board and task management
- Responsive design
- Form validation
