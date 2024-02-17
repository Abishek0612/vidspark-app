import React, { useState, useRef, useEffect } from "react";
import { css, keyframes } from "@emotion/react";

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.95);
  }
`;

const skeletonLoaderStyle = css`
  animation: ${pulse} 1.5s ease-in-out infinite;
  background: linear-gradient(-90deg, #ddd 25%, #eee 50%, #ddd 75%);
  background-size: 400% 100%;
  border-radius: 4px;
  height: 56px;
  width: 100%;
`;

const VideoCard = ({ video, theme }) => {
  const [isVideoLoaded, setVideoLoaded] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const videoRef = useRef(null);

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setVideoLoaded(true);
        observer.unobserve(videoRef.current);
      }
    });
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleThumbnailClick = () => {
    setShowThumbnail(false);
  };

  return (
    <div
      ref={videoRef}
      className={`w-full max-w-sm rounded-lg shadow-md overflow-hidden mx-auto ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      {showThumbnail && (
        <img
          src={video.thumb}
          alt="thumbnail"
          className="w-full h-56 object-cover cursor-pointer"
          onClick={handleThumbnailClick}
        />
      )}
      {!isVideoLoaded && <div css={skeletonLoaderStyle}></div>}
      {isVideoLoaded && !showThumbnail && (
        <iframe
          className="w-full h-56"
          src={video.sources[0]}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={video?.snippet?.title}
        ></iframe>
      )}
      <div className="px-5 py-3">
        <h3
          className={`${
            theme === "dark" ? "text-gray-200" : "text-gray-700"
          } uppercase`}
        >
          <strong>Title</strong> : {video.title}
        </h3>
        <span
          className={`${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          } mt-2`}
        >
          {video.subtitle}
        </span>
      </div>
    </div>
  );
};

export default VideoCard;
