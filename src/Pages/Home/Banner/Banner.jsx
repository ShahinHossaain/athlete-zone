import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Banner = () => {
  return (
    <Carousel autoPlay infiniteLoop>
      <div className="bg-slate-400">
        <img className="" src="https://i.ibb.co/HY14FFV/hero-image-01.png" />
      </div>
      <div className="bg-slate-400">
        <img className="" src="https://i.ibb.co/HY14FFV/hero-image-01.png" />
      </div>
      <div className="bg-slate-400">
        <img className="" src="https://i.ibb.co/HY14FFV/hero-image-01.png" />
      </div>
    </Carousel>
  );
};

export default Banner;
