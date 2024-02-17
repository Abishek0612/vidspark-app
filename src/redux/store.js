import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB";
import { youtubeApi } from "../services/YOUTUBE";

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    [youtubeApi.reducerPath]: youtubeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware, youtubeApi.middleware),
});
