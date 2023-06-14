import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/open-animation.css";
import "./Banner.css";
import { AwesomeButton } from "react-awesome-button";
import { Link } from "react-router-dom";

const Banner = () => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  const backgroundImage1 =
    "https://img.freepik.com/premium-vector/silhouettes-soccer-players-ball-football-goalkeeper-team-champion-with-cup-isolated-vector-illustration-set_108855-2660.jpg?size=626&ext=jpg";
  const backgroundImage2 =
    "https://img.freepik.com/premium-vector/silhouettes-soccer-players-ball-football-goalkeeper-team-champion-with-cup-isolated-vector-illustration-set_108855-2660.jpg?size=626&ext=jpg";
  const backgroundImage3 =
    "https://img.freepik.com/free-vector/variety-sports-vector-silhouette-illustration-set-isolated-white-background_8130-2035.jpg?size=626&ext=jpg";
  return (
    <div className="relative z-10">
      <AutoplaySlider
        play={true}
        cancelOnInteraction={false} // should stop playing on user interaction
        interval={6000}
        className="aws"
        animation="openAnimation"
      >
        <div data-src="" className="bg-natural h-full w-full">
          <div
            className="flex items-center justify-center p-10"
            style={{
              backgroundImage: `url(${backgroundImage1})`,
              height: "100%",
            }}
          >
            <img
              src="https://img.freepik.com/premium-vector/soccer-players-with-ball-sports-soccer-team-silhouettes-decorated-with-triangle-mosaic-pattern-football-players-goalkeeper-posing-with-ball-isolated-vector-illustration_108855-3368.jpg?size=626&ext=jpg"
              alt=""
              className="hidden md:inline-block ml-16 rounded-3xl"
            />
            <div className="md:relative box w-1/2 right-32 rounded-3xl top-8 p-5 md:p-10 bg-slate-700 opacity-90  text-white">
              <p className="text-2xl md:text-5xl font-font2">
                Welcome to, <br />{" "}
                <span className="block font-font1  md:my-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  ATHLETE ZONE
                </span>{" "}
                website,{" "}
                <Link to="/classes">
                  <AwesomeButton>All Classes</AwesomeButton>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div data-src="" className="bg-natural h-full w-full">
          <div
            className="flex items-center justify-center p-10"
            style={{
              backgroundImage: `url(${backgroundImage2})`,
              height: "100%",
            }}
          >
            <img
              src="https://img.freepik.com/free-vector/box-full-sport-equipments_1308-37207.jpg?size=626&ext=jpg"
              alt=""
              className="hidden md:inline-block ml-16 rounded-3xl"
            />
            <div className="md:relative box w-1/2 right-32 rounded-3xl top-8 p-5 md:p-10 bg-slate-700 opacity-90  text-white">
              <p className="text-2xl md:text-5xl font-font2">
                Our, <br />{" "}
                <span className="block text-2xl md:text-6xl font-font1 md:my-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  best Of Best
                </span>{" "}
                for Instructor,{" "}
                <Link to="/instructors">
                  <AwesomeButton>instructor</AwesomeButton>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div data-src="" className="bg-natural h-full w-full">
          <div
            className="flex items-center justify-center p-10"
            style={{
              backgroundImage: `url(${backgroundImage3})`,
              height: "100%",
            }}
          >
            <img
              src="https://img.freepik.com/premium-vector/collection-balls-sports-balls-banner-hand-drawn-sketch-vector-background_460848-15283.jpg?size=626&ext=jpg"
              alt=""
              className="hidden md:inline-block ml-16 rounded-3xl"
            />
            <div className="md:relative box w-1/2 right-32 rounded-3xl top-8 p-5 md:p-10 bg-slate-700 opacity-90  text-white">
              <p className="text-2xl md:text-5xl my-5 font-font2">
                A World of, <br />
                <span className="block font-font1 mb-5 md:my-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  Sports
                </span>{" "}
                <Link to="/dashboard">
                  <AwesomeButton>Go to Dashboard</AwesomeButton>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </AutoplaySlider>
    </div>
  );
};

export default Banner;
