import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB";
import { setupListeners } from "@reduxjs/toolkit/query";
import genreOrCategoryReducer from "../features/currentGenreOrCategory";
import userReducer from "../features/auth";
export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreOrCategoryReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
setupListeners(store.dispatch);
