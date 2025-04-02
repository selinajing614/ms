/**
 * 用户选择的全局状态管理
 */
import { create } from 'zustand'

interface TaskChoice {
  taskId: number;
  choices: Record<string, any>;
  completed: boolean;
}

interface UserChoicesState {
  currentTask: number;
  taskChoices: TaskChoice[];
  addChoice: (taskId: number, choices: Record<string, any>) => void;
  setCurrentTask: (taskId: number) => void;
  resetChoices: () => void;
}

export const useUserChoices = create<UserChoicesState>((set) => ({
  currentTask: 0,
  taskChoices: [],
  
  addChoice: (taskId, choices) => set((state) => ({
    taskChoices: [
      ...state.taskChoices.filter(t => t.taskId !== taskId),
      {
        taskId,
        choices,
        completed: true
      }
    ]
  })),
  
  setCurrentTask: (taskId) => set({ currentTask: taskId }),
  
  resetChoices: () => set({
    currentTask: 0,
    taskChoices: []
  })
})) 