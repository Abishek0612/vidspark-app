import { Skeleton } from "@mui/material";

const SkeletonLoader = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <Skeleton
        variant="rectangular"
        width="100%"
        height={256}
        animation="wave"
      />

      <div className="p-4">
        <Skeleton variant="text" height={32} width="80%" animation="wave" />
        <Skeleton variant="text" height={32} width="80%" animation="wave" />
        <Skeleton variant="text" height={32} width="80%" animation="wave" />
      </div>
    </div>
  );
};
export default SkeletonLoader;
