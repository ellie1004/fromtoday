// Shared TypeScript types and interfaces

export type GoalStatus = 'active' | 'completed' | 'paused' | 'archived';
export type GoalPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TimeFrame = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';

export interface Goal {
  id: string;
  title: string;
  description?: string;
  status: GoalStatus;
  priority: GoalPriority;
  startDate: string; // ISO date string
  targetDate?: string; // ISO date string
  completedDate?: string; // ISO date string
  timeFrame: TimeFrame;
  tags: string[];
  progress: number; // 0-100
  createdAt: string;
  updatedAt: string;
}

export interface SubGoal {
  id: string;
  goalId: string;
  title: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

export interface GoalProgress {
  goalId: string;
  date: string; // ISO date string
  value: number; // 0-100
  note?: string;
}

export interface AIMentorMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  goalId?: string; // Optional reference to a specific goal
}

export interface AIMentorSession {
  id: string;
  goalId?: string;
  messages: AIMentorMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalGoals: number;
  activeGoals: number;
  completedGoals: number;
  averageProgress: number;
  streakDays: number;
}

export interface CalendarEvent {
  id: string;
  goalId: string;
  title: string;
  date: string; // ISO date string
  completed: boolean;
  type: 'milestone' | 'checkpoint' | 'deadline';
}

export interface AnalyticsData {
  period: 'week' | 'month' | 'year';
  goalsCompleted: number;
  goalsCreated: number;
  averageProgress: number;
  progressByDay: Array<{
    date: string;
    progress: number;
  }>;
  goalsByStatus: Record<GoalStatus, number>;
  goalsByPriority: Record<GoalPriority, number>;
}

// Form types
export interface CreateGoalInput {
  title: string;
  description?: string;
  priority: GoalPriority;
  startDate: string;
  targetDate?: string;
  timeFrame: TimeFrame;
  tags: string[];
}

export interface UpdateGoalInput extends Partial<CreateGoalInput> {
  id: string;
  status?: GoalStatus;
  progress?: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Storage types
export interface StorageData {
  goals: Goal[];
  subGoals: SubGoal[];
  progressHistory: GoalProgress[];
  aiSessions: AIMentorSession[];
  lastSync?: string;
}
