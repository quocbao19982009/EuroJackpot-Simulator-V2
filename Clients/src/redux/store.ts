import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { lotteryMiddleware } from "./reduxMiddleware";
import { lotterySlice } from "./slices/lotterySlice";
import { userSlice } from "./slices/userSlice";

const rootReducer = combineReducers({
  lotterySlice: lotterySlice.reducer,
  userSlice: userSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(lotteryMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
