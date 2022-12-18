import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorageTask, setLocalStorageTask } from '@/utils';
import { Task } from '@/models';

export const taskSlice = createSlice({
  name: 'task',
  initialState: getLocalStorageTask(),
  reducers: {
    addTask: {
      /**
       * Add new task in state.
       *
       * @param state Actual state.
       * @param action Payload(Task) to push in state.
       */
      reducer: (state, action: PayloadAction<Task>) => {
        state.push(action.payload);
        setLocalStorageTask(state);
      },
      /**
       * Prepare task to send in payload.
       *
       * @param task Task values.
       * @returns Object of task with nanoId.
       */
      prepare: (task: Task) => {
        const id = nanoid();
        return { payload: { ...task, id } };
      },
    },
    /**
     * Update task.
     *
     * @param state Actual state.
     * @param action Payload(Task) to update from state.
     */
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1, action.payload);
      setLocalStorageTask(state);
    },
    /**
     * Delete task.
     *
     * @param state Actual state.
     * @param action Payload(TaskId) to remove from state.
     */
    removeTask: (state, action: PayloadAction<string>) => {
      const index = state.findIndex(({ id }) => id === action.payload);
      state.splice(index, 1);
      setLocalStorageTask(state);
    },
    /**
     * Sort tasks.
     *
     * @param state Actual state.
     * @param action Payload(Task[]) to set in state..
     */
    sortTask: (state, action: PayloadAction<Task[]>) => {
      state.splice(0);
      state.push(...action.payload);
      setLocalStorageTask(state);
    },
  },
});

export const { addTask, updateTask, removeTask, sortTask } = taskSlice.actions;
