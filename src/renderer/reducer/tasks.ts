import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BaseTask {
  id: string;
  title: string;
  projectId: string;
  completed: boolean;
  deleted: boolean;
  date?: number;
  tags?: string[];
  content?: any;
}

export interface TaskState {
  tasks: BaseTask[];
  selectedId: string;
  editingId: string;
}

export interface TaskUpdatePayload {
  id: string;
  title?: string;
  projectId?: string;
  completed?: boolean;
  deleted?: boolean;
  date?: number;
  tags?: string[];
  content?: any;
}

const initialState: TaskState = {
  selectedId: '',
  editingId: '',
  tasks: [1, 2, 3, 4, 5, 6].map((item) => ({
    id: String(item),
    title: `测试 task${item}`,
    completed: false,
    projectId: 'inbox',
    deleted: false,
  })),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      const { title, projectId = 'inbox' } = action.payload;
      const id = String(Date.now());
      state.editingId = id;
      state.tasks.push({
        id,
        title,
        projectId,
        completed: false,
        deleted: false,
      });
    },
    updateTask(state, action: PayloadAction<TaskUpdatePayload>) {
      const { id, ...rest } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index > -1) {
        const task = state.tasks[index];
        state.tasks[index] = { ...task, ...rest };
      }
    },
    deleteTask(state, action) {
      const task = state.tasks.find((item) => item.id === action.payload);
      if (task) {
        task.deleted = true;
      }
    },
    // 彻底删除
    removeTask(state, action) {
      const tasks = state.tasks.filter((item) => item.id === action.payload);
      state.tasks = tasks;
    },
    updateSelectedId(state, action: PayloadAction<string>) {
      state.selectedId = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  updateSelectedId,
} = tasksSlice.actions;

export default tasksSlice.reducer;
