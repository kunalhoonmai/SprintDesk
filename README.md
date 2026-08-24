# SprintDesk

SprintDesk is a modern project management workspace built for managing sprint tasks through a clean Kanban workflow.

## ✨ Overview

SprintDesk provides a focused workspace where teams can:

- Manage tasks across a Kanban board
- Move tasks between workflow stages using drag and drop
- Search tasks quickly
- View task details in a drawer
- Track notifications
- Manage user profile and logout
- Switch between light and dark themes
- Use a responsive interface across desktop, tablet, and mobile layouts

## 🚀 Features

### Kanban Board

Tasks are organized into four workflow stages:

- **Backlog**
- **In Progress**
- **Review**
- **Done**

Tasks can be dragged between columns and reordered within a column.

### Task Management

Each task includes:

- Title
- Description
- Priority
- Assignee
- Due date
- Current status

Clicking a task opens its detailed view.

### 🔎 Task Search

The top navigation includes task search with:

- Real-time filtering
- Task status
- Task priority
- Empty-state handling
- Keyboard `Escape` support

### 🔔 Notifications

The notification center supports:

- Unread notification count
- Individual notification read state
- Mark all as read
- Notification empty state

### 👤 User Profile

The profile menu displays:

- User avatar
- Name
- Email
- Logout action

### 🌙 Theme Support

SprintDesk supports:

- Light theme
- Dark theme
- Global theme-aware UI
- Theme-aware cards, inputs, dropdowns, navigation and Kanban components

### 📱 Responsive UI

The application is designed to work across:

- Desktop
- Tablet
- Mobile

On smaller screens, navigation and Kanban content adapt to the available viewport.

## 🛠️ Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **Zustand**
- **dnd-kit**
- **Lucide React**
- **DummyJSON Authentication API**

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd sprintdesk
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

### 4. Build for production

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

## 🔐 Demo Credentials

SprintDesk uses the DummyJSON authentication service for the assignment.

### Demo Login

```text
Username: emilys
Password: emilyspass
```

Use these credentials on the SprintDesk login screen.

> These are demo credentials for the assignment and are not production credentials.

## 🌐 Authentication

The login flow:

1. User enters username and password.
2. SprintDesk sends the credentials to the authentication service.
3. On successful authentication, the user is redirected to the dashboard.
4. Authentication state is persisted for the application session.
5. The user can log out from the profile menu.

## 🎯 Main Workflow

```text
Login
  ↓
Dashboard
  ↓
View Kanban Board
  ↓
Search / Open Task
  ↓
Update Task Status
  ↓
Move Task Between Columns
  ↓
Review Notifications
```

## 🖱️ Drag & Drop

Tasks can be moved by dragging the grip icon on each task card.

Supported interactions:

- Reorder tasks within the same column
- Move tasks to another column
- Drop directly onto a column
- Visual drag overlay
- Drop-area feedback

## 📌 Task Status Flow

```text
Backlog → In Progress → Review → Done
```

The board also allows tasks to move between any supported columns when required.

## 🎨 Design

SprintDesk follows a modern SaaS-style interface with:

- Violet primary accent
- Slate-based neutral palette
- Rounded cards
- Soft borders
- Subtle shadows
- Responsive spacing
- Light and dark themes
- Minimal visual clutter

The UI is designed to keep the Kanban workflow as the primary focus.

## 🔒 Security Note

The credentials included in this README are public demo credentials provided for testing the assignment.

Do not use real passwords, API secrets, access tokens, or production credentials in this repository.

If environment variables are required for deployment, keep them outside source control.

## ☁️ Deployment

The application can be deployed to platforms such as Render or Vercel.

For a typical production build:

```bash
npm install
npm run build
```

The generated production files are placed in:

```text
dist/
```

### SPA Routing

Because SprintDesk uses React Router, the deployment platform must redirect unknown application routes to:

```text
/index.html
```

This is required so routes such as:

```text
/login
/dashboard
```

continue working after refreshing the browser.

## 🧪 Testing Checklist

Before submission, verify:

- [ ] Login works with demo credentials
- [ ] Invalid login displays an error
- [ ] Successful login redirects to dashboard
- [ ] Dashboard loads after refresh
- [ ] Kanban columns render correctly
- [ ] Tasks can be reordered
- [ ] Tasks can be moved between columns
- [ ] Task drawer opens and closes
- [ ] Search works
- [ ] Notifications open correctly
- [ ] Notifications can be marked as read
- [ ] Profile dropdown works
- [ ] Logout works
- [ ] Light theme works
- [ ] Dark theme works
- [ ] Mobile layout works
- [ ] Production build succeeds
- [ ] SPA routes work after deployment refresh

## 📦 Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates the production build.

```bash
npm run preview
```

Runs the production build locally for preview.

## 📄 Assignment

SprintDesk was developed as a frontend project-management dashboard demonstrating:

- React component architecture
- TypeScript
- State management
- Authentication
- Drag-and-drop interactions
- Responsive UI development
- Theme support
- Search and notification functionality
- Production deployment readiness

## 👨‍💻 Author

**Kunal Sahu**

Frontend Developer | React | TypeScript

---

Made with React, TypeScript and Tailwind CSS.
