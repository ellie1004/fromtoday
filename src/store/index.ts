// Zustand store setup
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {
  Goal,
  SubGoal,
  GoalProgress,
  AIMentorSession,
  CreateGoalInput,
  UpdateGoalInput,
} from '../shared/types';

// Goals slice
interface GoalsState {
  goals: Goal[];
  subGoals: SubGoal[];
  progressHistory: GoalProgress[];
  addGoal: (input: CreateGoalInput) => Goal;
  updateGoal: (input: UpdateGoalInput) => void;
  deleteGoal: (id: string) => void;
  addSubGoal: (goalId: string, title: string) => SubGoal;
  toggleSubGoal: (id: string) => void;
  updateProgress: (goalId: string, value: number, note?: string) => void;
}

// AI Mentor slice
interface AIMentorState {
  sessions: AIMentorSession[];
  currentSessionId: string | null;
  isLoading: boolean;
  createSession: (goalId?: string) => string;
  addMessage: (
    sessionId: string,
    role: 'user' | 'assistant',
    content: string,
    goalId?: string
  ) => void;
  setCurrentSession: (sessionId: string | null) => void;
  setLoading: (loading: boolean) => void;
}

// User Profile slice
interface UserProfile {
  name?: string;
  email?: string;
  avatarUrl?: string;
}

interface UserProfileState {
  profile: UserProfile;
  setUserName: (name: string) => void;
  setUserProfile: (profile: Partial<UserProfile>) => void;
}

// UI State slice
interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

// Combined store type
type AppStore = GoalsState & AIMentorState & UserProfileState & UIState;

// Helper functions
const generateId = () => crypto.randomUUID();
const now = () => new Date().toISOString();

export const useStore = create<AppStore>()(
  devtools(
    persist(
      (set) => ({
        // Goals state
        goals: [],
        subGoals: [],
        progressHistory: [],

        addGoal: (input: CreateGoalInput) => {
          const newGoal: Goal = {
            id: generateId(),
            ...input,
            status: 'active',
            progress: 0,
            createdAt: now(),
            updatedAt: now(),
          };

          set((state) => ({
            goals: [...state.goals, newGoal],
          }));

          return newGoal;
        },

        updateGoal: (input: UpdateGoalInput) => {
          set((state) => ({
            goals: state.goals.map((goal) =>
              goal.id === input.id
                ? { ...goal, ...input, updatedAt: now() }
                : goal
            ),
          }));
        },

        deleteGoal: (id: string) => {
          set((state) => ({
            goals: state.goals.filter((goal) => goal.id !== id),
            subGoals: state.subGoals.filter((subGoal) => subGoal.goalId !== id),
            progressHistory: state.progressHistory.filter(
              (progress) => progress.goalId !== id
            ),
          }));
        },

        addSubGoal: (goalId: string, title: string) => {
          const newSubGoal: SubGoal = {
            id: generateId(),
            goalId,
            title,
            completed: false,
            createdAt: now(),
          };

          set((state) => ({
            subGoals: [...state.subGoals, newSubGoal],
          }));

          return newSubGoal;
        },

        toggleSubGoal: (id: string) => {
          set((state) => ({
            subGoals: state.subGoals.map((subGoal) =>
              subGoal.id === id
                ? {
                    ...subGoal,
                    completed: !subGoal.completed,
                    completedAt: !subGoal.completed ? now() : undefined,
                  }
                : subGoal
            ),
          }));
        },

        updateProgress: (goalId: string, value: number, note?: string) => {
          const progress: GoalProgress = {
            goalId,
            date: now(),
            value,
            note,
          };

          set((state) => ({
            progressHistory: [...state.progressHistory, progress],
            goals: state.goals.map((goal) =>
              goal.id === goalId
                ? { ...goal, progress: value, updatedAt: now() }
                : goal
            ),
          }));
        },

        // AI Mentor state
        sessions: [],
        currentSessionId: null,
        isLoading: false,

        createSession: (goalId?: string) => {
          const sessionId = generateId();
          const newSession: AIMentorSession = {
            id: sessionId,
            goalId,
            messages: [],
            createdAt: now(),
            updatedAt: now(),
          };

          set((state) => ({
            sessions: [...state.sessions, newSession],
            currentSessionId: sessionId,
          }));

          return sessionId;
        },

        addMessage: (sessionId, role, content, goalId) => {
          set((state) => ({
            sessions: state.sessions.map((session) =>
              session.id === sessionId
                ? {
                    ...session,
                    messages: [
                      ...session.messages,
                      {
                        id: generateId(),
                        role,
                        content,
                        timestamp: now(),
                        goalId,
                      },
                    ],
                    updatedAt: now(),
                  }
                : session
            ),
          }));
        },

        setCurrentSession: (sessionId) => {
          set({ currentSessionId: sessionId });
        },

        setLoading: (loading) => {
          set({ isLoading: loading });
        },

        // User Profile state
        profile: {},

        setUserName: (name: string) => {
          set((state) => ({
            profile: { ...state.profile, name },
          }));
        },

        setUserProfile: (profileUpdate: Partial<UserProfile>) => {
          set((state) => ({
            profile: { ...state.profile, ...profileUpdate },
          }));
        },

        // UI state
        sidebarOpen: true,
        theme: 'system',

        toggleSidebar: () => {
          set((state) => ({ sidebarOpen: !state.sidebarOpen }));
        },

        setTheme: (theme) => {
          set({ theme });
        },
      }),
      {
        name: 'fromtoday-storage',
        partialize: (state) => ({
          goals: state.goals,
          subGoals: state.subGoals,
          progressHistory: state.progressHistory,
          sessions: state.sessions,
          profile: state.profile,
          theme: state.theme,
        }),
      }
    ),
    { name: 'FromToday Store' }
  )
);

// Selectors
export const useGoals = () => useStore((state) => state.goals);
export const useActiveGoals = () =>
  useStore((state) => state.goals.filter((g) => g.status === 'active'));
export const useGoalById = (id: string) =>
  useStore((state) => state.goals.find((g) => g.id === id));
export const useSubGoalsByGoalId = (goalId: string) =>
  useStore((state) => state.subGoals.filter((sg) => sg.goalId === goalId));
export const useCurrentSession = () =>
  useStore((state) => {
    if (!state.currentSessionId) return null;
    return state.sessions.find((s) => s.id === state.currentSessionId);
  });
export const useUserProfile = () => useStore((state) => state.profile);
export const useUserName = () => useStore((state) => state.profile.name);
