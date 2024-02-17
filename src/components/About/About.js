import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img2.jpg";
import { useTheme } from "../../contexts/ThemeContext";

const About = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      <h1 className="text-4xl font-bold text-center mb-4">About VidSpark</h1>
      <p
        className="text-lg text-center mb-6"
        style={{ color: "var(--primary-text-color)" }}
      >
        VidSpark ignites your creativity with every click...
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <img
          src={img1}
          alt="Feature 1"
          className="w-1/2 sm:w-1/3 lg:w-1/4 rounded-lg shadow-lg dark:shadow-gray-700"
        />
        <img
          src={img2}
          alt="Feature 2"
          className="w-1/2 sm:w-1/3 lg:w-1/4 rounded-lg shadow-lg dark:shadow-gray-700"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-3xl font-semibold mb-3">Our Mission</h2>
        <p className="text-lg">
          Our mission is to empower individuals to express themselves creatively
          through video. VidSpark is more than just an app; it's a community
          where creativity thrives.
        </p>
      </div>
    </div>
  );
};

export default About;
