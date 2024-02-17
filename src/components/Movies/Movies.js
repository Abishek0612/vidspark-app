import { useGetMoviesQuery } from "../../services/TMDB";
import MovieList from "./MovieList";
import SkeletonLoader from "../../shared/loading";

const Movies = () => {
  const { data, isLoading } = useGetMoviesQuery();
  // console.log("Is Loading:", isLoading);

  if (isLoading) {
    // console.log("Displaying skeleton loaders");
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
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default Movies;
