import React, { useState } from "react";
import mediaJSON from "./data.json";
import VideoCard from "./VideoCard";
import Searchbar from "../../shared/searchbar";
import { useTheme } from "../../contexts/ThemeContext";
import Pagination from "../../shared/pagination";

const Videos = () => {
  const videosPerPage = 8;
  const videos = mediaJSON.categories[0].videos;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const { theme } = useTheme();
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const handleSearchChange = (searchTerm) => {
    const filtered = !searchTerm
      ? videos
      : videos.filter((video) =>
          video.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    setFilteredVideos(filtered);
    setCurrentPage(1);
  };

  const handleVideoPlay = (id) => {
    setPlayingVideoId(id);
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(
    indexOfFirstVideo,
    indexOfLastVideo
  );

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl justify-center flex font-semibold mb-5 dark:text-gray-200">
          Videos
        </h2>
        <Searchbar
          placeholder="Search by video name..."
          onSearchChange={handleSearchChange}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentVideos.map((video, index) => (
            <VideoCard
              key={index}
              video={video}
              theme={theme}
              isPlaying={playingVideoId === video.id}
              onPlay={handleVideoPlay}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Videos;
