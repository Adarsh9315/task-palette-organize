
# TaskPalette - Trello-like Kanban Board App

## Project Overview

TaskPalette is a comprehensive Kanban board application inspired by Trello. It provides a feature-rich task management system allowing users to create boards, manage tasks with drag-and-drop functionality, customize themes, and configure user profiles. The app follows atomic design principles with a modern UI/UX approach.

## Tech Stack

- **Frontend**:
  - React with TypeScript
  - Recoil for state management
  - React Router for navigation
  - React Hook Form with Zod for form validation
  - Tailwind CSS for styling
  - shadcn/ui for UI components
  - Framer Motion for animations
  - react-beautiful-dnd for drag-and-drop functionality
  - Lucide React for icons

## Features

### Kanban Board Functionality
- Create, edit, and delete boards
- Manage tasks within columns (To Do, In Progress, Done)
- Drag-and-drop tasks between columns
- Task properties including title, description, status, priority, and due date
- Responsive design for desktop and mobile

### UI Animations & Transitions
- Smooth transitions when moving tasks between columns
- Hover effects on cards and interactive elements
- Task expansion animations
- Animated notifications using Sonner

### Color Theme Switching
- Light and dark mode support
- Custom color themes for boards
- System preference detection

### User Management & Settings
- User profile management
- Theme preferences
- Notification settings
- Password and security settings
- Session management

### Enhanced User Experience
- Task priority levels (low, medium, high)
- Due date management with calendar picker
- User-friendly interface with intuitive navigation
- Mobile responsive design

## Component Breakdown (Atomic Design)

### Atoms
Small, basic building blocks of the application:
- **Badge**: Visual indicator for task status and priority
- **Button**: Interactive element for actions
- **Input**: Form input fields
- **Avatar**: User profile image display

### Molecules
Groups of atoms that work together as a unit:
- **TaskCard**: Displays task information with actions
- **BoardCard**: Displays board information with actions
- **TaskForm**: Form for creating and editing tasks
- **BoardForm**: Form for creating and editing boards
- **UserProfileForm**: Form for managing user profile
- **ThemeSettings**: Component for managing theme preferences

### Organisms
Groups of molecules that form a relatively complex section:
- **AppHeader**: Application header with navigation and user menu
- **TaskList**: Displays and organizes tasks by status
- **BoardList**: Displays all boards
- **CreateTaskModal**: Modal for creating tasks
- **EditTaskModal**: Modal for editing tasks

### Templates
Page layouts that place components in a structure:
- **DashboardTemplate**: Layout for the main dashboard
- **BoardTemplate**: Layout for board details
- **BoardFormTemplate**: Layout for board creation/editing
- **SettingsTemplate**: Layout for settings pages

## State Management with Recoil

The application uses Recoil for state management with the following structure:

### Atoms
Pieces of state that components can subscribe to:
- **boardsState**: Stores the list of boards
- **tasksState**: Stores the list of tasks
- **themeState**: Manages the application theme
- **modalState**: Manages the state of modals (create/edit tasks)

### Selectors
Pure functions that derive data from atoms:
- **boardByIdSelector**: Gets a specific board by ID
- **filteredTasksSelector**: Filters tasks by board ID
- **tasksByStatusSelector**: Gets tasks by board ID and status

## Animations & Transitions

- **Drag and Drop**: Smooth animations when moving tasks between columns
- **Hover Effects**: Scale and shadow changes on cards and buttons
- **Motion Animations**: Using Framer Motion for entrance and exit animations
- **Toast Notifications**: Animated notifications for user actions

## Color Theme System

- **Light/Dark Mode**: Toggle between light and dark themes
- **Color Schemes**: Multiple color options (Blue, Green, Purple, Orange)
- **System Preference**: Option to use system color scheme preference
- **Board Themes**: Individual board color theming

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

5. Open your browser and navigate to `http://localhost:5173`

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
- **Mobile**: Stacked layouts with appropriate touch targets and mobile menu

## Future Enhancements

- Real-time collaboration using WebSockets
- File attachments for tasks
- Advanced filtering and search
- Task dependencies and sub-tasks
- Custom fields for tasks
- Time tracking
- Integration with calendar applications
- Activity logs and reports
- Advanced user roles and permissions
- Board templates

## Change Log

### Version 2.0.0
- Added drag-and-drop functionality for tasks
- Implemented theme switching (light/dark mode)
- Added user profile and settings pages
- Enhanced task cards with priority, due dates
- Added animations and transitions
- Improved mobile responsiveness

### Version 1.0.0
- Initial release with core functionality
- Board and task management
- Responsive design
- Form validation
