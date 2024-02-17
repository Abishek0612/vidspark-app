import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CircularProgress from "@mui/material/CircularProgress";
const Dashboard = lazy(() => import("./components/Dasboard/Dashboard"));
const Movies = lazy(() => import("./components/Movies/Movies"));
const Videos = lazy(() => import("./components/Videos/Videos"));
const YoutubeVideos = lazy(() =>
  import("./components/YoutubeVideos/YoutubeVideos")
);
const About = lazy(() => import("./components/About/About"));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="text-black flex justify-center font-xl   items-center font-xl  p-5 rounded-lg">
              <CircularProgress />
            </div>
          }
        >
          {" "}
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route index element={<Videos />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/youtube-videos" element={<YoutubeVideos />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
