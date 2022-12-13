import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorageTask, setLocalStorageTask } from '@/utils';
import { Task } from '@/models';

export const taskSlice = createSlice({
  name: 'task',
  initialState: getLocalStorageTask(),
  reducers: {
    addTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        setLocalStorageTask(action.payload);
        state.push(action.payload);
      },
      prepare: (task: Task) => {
        const id = nanoid();
        return { payload: { ...task, id } };
      },
    },
  },
});

export const { addTask } = taskSlice.actions;
