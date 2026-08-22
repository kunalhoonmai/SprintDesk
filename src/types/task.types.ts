export type TaskStatus = 'backlog' | 'in-progress' | 'review' | 'done'

export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: number
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assigneeId: number
  dueDate: string
  sprintId: number
  order: number
  createdAt: string
  completedAt: string | null
  updatedAt: string
}

export interface User {
  id: number
  name: string
  email: string
  avatar: string
}

export interface Sprint {
  id: number
  name: string
  goal: string
  startDate: string
  endDate: string
  status: string
}

export interface Comment {
  id: number
  taskId: number
  authorId: number
  message: string
  createdAt: string
}

export interface Notification {
  id: number
  userId: number
  type: string
  title: string
  message: string
  read: boolean
  createdAt: string
}

export interface MockData {
  users: User[]
  sprints: Sprint[]
  tasks: Task[]
  comments: Comment[]
  notifications: Notification[]
}