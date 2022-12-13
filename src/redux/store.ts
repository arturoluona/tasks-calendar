import { Task } from '@/models';
import { configureStore } from '@reduxjs/toolkit';
import { taskSlice } from '@/redux/states/task';

interface AppStore {
  /** Store. */
  task: Task[];
}

export default configureStore<AppStore>({
  reducer: {
    task: taskSlice.reducer,
  },
});
