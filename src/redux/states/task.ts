import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorageTask, setLocalStorageTask } from '@/utils';
import { Task } from '@/models';

export const taskSlice = createSlice({
  name: 'task',
  initialState: getLocalStorageTask(),
  reducers: {
    addTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.push(action.payload);
        setLocalStorageTask(state);
      },
      prepare: (task: Task) => {
        const id = nanoid();
        return { payload: { ...task, id } };
      },
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1, action.payload);
      setLocalStorageTask(state);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      const index = state.findIndex(({ id }) => id === action.payload);
      state.splice(index, 1);
      setLocalStorageTask(state);
    },
  },
});

export const { addTask, updateTask, removeTask } = taskSlice.actions;
