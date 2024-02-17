import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const youtubeApiKey = process.env.REACT_APP_YOUTUBE_KEY;

export const youtubeApi = createApi({
  reducerPath: "youtubeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/youtube/v3",
  }),

  endpoints: (builder) => ({
    getYouTubeVideos: builder.query({
      query: ({ searchTerm = "" } = {}) => {
        const topics = "MERN Stack|Node.JS|Python";
        const combinedSearchTerm = searchTerm
          ? `${searchTerm}+(${topics})`
          : topics;
        return `search?part=snippet&maxResults=25&q=${encodeURIComponent(
          combinedSearchTerm
        )}&key=${youtubeApiKey}`;
      },
    }),
  }),
});

export const { useGetYouTubeVideosQuery } = youtubeApi;
