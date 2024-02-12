import { configureStore } from "@reduxjs/toolkit";
import { lotterySlice } from "./slices/lotterySlice";
// ...

export const store = configureStore({
  reducer: {
    lotterySlice: lotterySlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
