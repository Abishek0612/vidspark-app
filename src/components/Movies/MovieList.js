import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { css } from "@emotion/react";
import SkeletonLoader from "../../shared/loading";

const cardStyle = css`
  transition: transform 300ms ease-in-out, box-shadow 300ms ease-in-out;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  }
`;

const MovieList = ({ movies }) => {
  return (
    <div
      css={cardStyle}
      className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 dark:bg-gray-900"
    >
      {movies?.results.map((movie) => (
        <div
          key={movie.id}
          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition duration-500 ease-in-out transform hover:scale-105"
        >
          <LazyLoadImage
            className="w-full h-64 object-cover"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            effect="blur"
            placeholder={
              <SkeletonLoader style={{ width: "100%", height: "100%" }} />
            }
          />

          <div className="p-4">
            <h5 className="text-lg font-bold  text-gray-900">{movie.title}</h5>
            <p className="text-sm text-gray-60 text-gray-400">
              Release Date: {movie.release_date}
            </p>
            <p className="text-sm  text-gray-400">
              Rating: {movie.vote_average}/10
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
