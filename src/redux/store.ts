import { AppStore } from '@/models';
import { configureStore } from '@reduxjs/toolkit';
import { taskSlice } from '@/redux/states/task';

export default configureStore<AppStore>({
  reducer: {
    task: taskSlice.reducer,
  },
});
