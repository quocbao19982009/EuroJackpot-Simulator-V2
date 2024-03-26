import { configureStore } from "@reduxjs/toolkit";
import { gameSettingSlice } from "./slices/gameSettingSlice";
import { lotterySlice } from "./slices/lotterySlice";
import { userSlice } from "./slices/userSlice";
// ...

export const store = configureStore({
  reducer: {
    lotterySlice: lotterySlice.reducer,
    gameSettingSlice: gameSettingSlice.reducer,
    userSlice: userSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
