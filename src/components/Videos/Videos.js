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
  const [isDragEnabled, setIsDragEnabled] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleSearchChange = (searchTerm) => {
    const filtered = !searchTerm
      ? videos
      : videos.filter((video) =>
          video.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    setFilteredVideos(filtered);
    setCurrentPage(1);
  };
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleDragMode = () => {
    setIsDragEnabled(!isDragEnabled);
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragEnter = (targetIndex) => {
    if (draggedIndex === targetIndex) return;

    const newVideos = [...filteredVideos];
    const draggedItem = newVideos[draggedIndex];
    newVideos.splice(draggedIndex, 1);
    newVideos.splice(targetIndex, 0, draggedItem);

    setFilteredVideos(newVideos);
    setDraggedIndex(targetIndex);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
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
        <button
          onClick={toggleDragMode}
          className={`${
            isDragEnabled
              ? "bg-green-500 hover:bg-green-700 "
              : "bg-blue-500 hover:bg-blue-700"
          } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition-all duration-150 ease-in-out mb-4`}
        >
          {isDragEnabled ? "Disable Drag & Drop" : "Enable Drag & Drop"}
        </button>
        <Searchbar
          placeholder="Search by video name..."
          onSearchChange={handleSearchChange}
        />
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${
            isDragEnabled ? "cursor-grab" : ""
          }`}
        >
          {currentVideos.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              theme={theme}
              isDragEnabled={isDragEnabled}
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
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
