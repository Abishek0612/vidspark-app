import React, { useState } from "react";
import { useGetYouTubeVideosQuery } from "../../services/YOUTUBE";
import YoutubeCard from "./YoutubeCard";
import SkeletonLoader from "../../shared/loading";
import Searchbar from "../../shared/searchbar";

const YoutubeVideos = () => {
  const [searchTerm, setSearchTerm] = useState("react tutorial");
  const { data, isLoading } = useGetYouTubeVideosQuery(
    searchTerm.toLowerCase()
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <SkeletonLoader
              key={index}
              style={{ height: "200px", marginBottom: "1rem" }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl justify-center flex font-semibold mb-5">
        Youtube Videos
      </h2>

      <Searchbar
        placeholder="Search by keywords..."
        onSearchChange={(newSearchTerm) => setSearchTerm(newSearchTerm)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.items
          ?.filter((video) => video.id && video.id.videoId)
          .map((video) => (
            <YoutubeCard key={video.id.videoId} video={video} />
          ))}
      </div>
    </div>
  );
};

export default YoutubeVideos;
