
# TaskPalette - Trello-like Kanban Board Application

## Overview

TaskPalette is a comprehensive kanban board application inspired by Trello, designed to help users manage tasks and projects efficiently. Built with modern web technologies and featuring a sleek UI, TaskPalette offers a responsive design that works seamlessly across devices.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage Guide](#usage-guide)
- [Backend Integration](#backend-integration)
- [Authentication](#authentication)
- [Theme System](#theme-system)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)

## Features

### Core Functionality
- **Kanban Board Management**: Create, view, edit, and delete boards
- **Task Management**: Create tasks with titles, descriptions, priorities, and due dates
- **Drag and Drop Interface**: Move tasks between columns (To Do, In Progress, Done)
- **Responsive Design**: Seamless experience on desktop and mobile devices

### User Experience
- **Custom Themes**: Toggle between light/dark mode and select from multiple color schemes
- **Board Navigation**: Easily filter and search boards
- **Collapsible Sidebar**: Optimized for both desktop and mobile viewing
- **Authentication**: Secure user authentication with profile management
- **Settings Management**: Multiple settings tabs for different application aspects

### Settings Management
- **Profile Settings**: Update personal information and user avatar
- **Theme Customization**: Change UI appearance and color schemes
- **Database Settings**: Configure database connections
- **Security Settings**: Update password and manage active sessions
- **Notification Preferences**: Control how and when notifications are received
- **Project Settings**: Manage general project configurations

## Technology Stack

### Frontend
- **React**: UI library for building component-based interfaces
- **TypeScript**: Static typing for enhanced code quality and developer experience
- **Recoil**: State management for predictable state handling
- **React Router**: Declarative routing for single-page application
- **React Hook Form**: Form validation with Zod schema validation
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: High-quality UI component library
- **Framer Motion**: Animation library for smooth transitions
- **react-beautiful-dnd**: Drag and drop functionality for task management

### Backend
- **Supabase**: Backend-as-a-service for:
  - PostgreSQL Database: Storing boards, tasks, columns, and user profiles
  - Authentication: User registration, login, and session management
  - Row-Level Security: Ensuring data privacy and security
  - Storage: Image and file uploads (for avatars, etc.)

## Architecture

TaskPalette follows an atomic design methodology for its components:

```
src/
├── components/
│   ├── atoms/       # Basic building blocks (Badge, Button, etc.)
│   ├── molecules/   # Combinations of atoms (TaskCard, BoardCard, etc.)
│   ├── organisms/   # Complex UI sections (TaskList, BoardList, etc.)
│   ├── templates/   # Page layouts (BoardTemplate, SettingsTemplate)
│   └── ui/          # shadcn/ui components
├── contexts/        # React contexts for global state
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── pages/           # Page components
├── recoil/          # State management
│   ├── atoms/       # Recoil atoms
│   └── selectors/   # Computed values
├── integrations/    # Third-party service integrations
│   └── supabase/    # Supabase client and types
└── types/           # TypeScript type definitions
```

### State Management
The application uses Recoil for state management, separating concerns into:
- User state (authentication, profiles)
- UI state (theme, sidebar)
- Data state (boards, tasks, columns)

### Data Flow
1. User interactions trigger Recoil state changes or API calls
2. API calls communicate with Supabase backend
3. State updates trigger UI re-renders
4. Row-Level Security ensures users only access their own data

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm, yarn, or bun package manager
- Supabase account (for backend services)

### Setup Process
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd taskpalette
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Create a .env file with required environment variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

## Configuration

### Supabase Setup
1. Create a new Supabase project
2. Set up the following tables:
   - profiles (user profiles)
   - boards (kanban boards)
   - columns (board columns)
   - tasks (tasks within columns)

3. Enable authentication services
4. Set up storage buckets for file uploads
5. Configure Row Level Security policies for data privacy

### Environment Variables
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Usage Guide

### Authentication
- Sign up with email/password
- Log in to access your boards and profile
- Update profile information in Settings

### Board Management
1. **Create a Board**:
   - Click "Create New Board" in the sidebar
   - Enter board title and description
   - Click "Create Board"

2. **Manage Tasks**:
   - Click "+ Add New Task" to create tasks
   - Drag tasks between columns to update status
   - Click on a task to edit details

3. **Edit Board**:
   - Use the dropdown menu (⋮) to access board options
   - Select "Edit Current Board" to modify board details

### Settings
Access settings via the sidebar to manage:
- Profile information
- Theme preferences
- Database configurations
- Security settings
- Notification preferences
- Project settings

## Backend Integration

### Database Schema
TaskPalette uses the following key tables in Supabase:

1. **profiles**
   - id (UUID, references auth.users)
   - full_name (text)
   - avatar_url (text)
   - bio (text)
   - created_at (timestamp)
   - updated_at (timestamp)

2. **boards**
   - id (UUID)
   - title (text)
   - description (text)
   - user_id (UUID, references auth.users)
   - created_at (timestamp)
   - updated_at (timestamp)

3. **columns**
   - id (UUID)
   - title (text)
   - board_id (UUID, references boards)
   - position (integer)
   - created_at (timestamp)

4. **tasks**
   - id (UUID)
   - title (text)
   - description (text)
   - column_id (UUID, references columns)
   - position (integer)
   - priority (text)
   - due_date (timestamp)
   - created_at (timestamp)
   - updated_at (timestamp)

### Row Level Security
All tables implement Row Level Security to ensure users can only:
- View their own boards and tasks
- Edit their own profile information
- Create content associated with their user ID

## Authentication

TaskPalette uses Supabase Authentication with:
- Email/password authentication
- JWT token-based session management
- Protected routes requiring authentication
- Profile management connected to auth.users

## Theme System

TaskPalette features a comprehensive theme system with:
- Light/Dark mode toggle
- Multiple color schemes (Blue, Green, Purple, Orange)
- System theme detection
- Theme persistence through local storage
- Smooth theme transitions

## Contributing

We welcome contributions! To contribute:
1. Fork the repository
2. Create a feature branch
3. Make changes following the project structure
4. Submit a pull request with descriptive comments

## Troubleshooting

### Common Issues
- **Authentication Problems**: Ensure Supabase authentication is properly set up
- **Data Not Loading**: Check Row Level Security policies in Supabase
- **UI Display Issues**: Verify correct theme configuration
- **Task Drag Issues**: Ensure react-beautiful-dnd is properly implemented

### Debugging
- Check browser console for errors
- Verify network requests to Supabase
- Ensure environment variables are correctly set

---

TaskPalette is developed with ♥ by the TaskPalette team.
