import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { css, keyframes } from "@emotion/react";

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const skeletonLoaderStyle = css`
  animation: ${pulse} 1.5s ease-in-out infinite;
  background-color: #ddd;
  border-radius: 4px;
`;

const cardStyle = css`
  transition: transform 300ms ease-in-out, box-shadow 300ms ease-in-out;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  }
`;

export const SkeletonLoader = ({ style }) => (
  <div css={skeletonLoaderStyle} style={style}></div>
);

const YoutubeCard = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailSrc = video?.snippet?.thumbnails?.high?.url;
  const videoSrc = `https://www.youtube.com/embed/${video?.id.videoId}`;

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <div
      css={cardStyle}
      className="max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out m-2 bg-white dark:bg-gray-800"
    >
      {isPlaying ? (
        <iframe
          className="w-full h-56"
          src={videoSrc}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={video?.snippet.title}
        ></iframe>
      ) : (
        <LazyLoadImage
          effect="blur"
          src={thumbnailSrc}
          width="100%"
          height="56"
          style={{ objectFit: "cover" }}
          alt={video?.snippet.title}
          onClick={handlePlayVideo}
          className="cursor-pointer"
        />
      )}

      <div className="px-6 py-4 dark:bg-gray-900">
        <div className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
          {video?.snippet?.title}
        </div>
        <p className="text-gray-700 dark:text-gray-400 text-base">
          {video?.snippet?.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
          {video?.snippet?.channelTitle}
        </span>
      </div>
    </div>
  );
};

export default YoutubeCard;
