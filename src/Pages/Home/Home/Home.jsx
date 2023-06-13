import Banner from "../Banner/Banner";
import PopularClass from "../PopularClass/PopularClass";
import PopularInstructors from "../PopularInstuctors/PopularInstructors";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularClass isFromPopularClass={true}></PopularClass>
      <PopularInstructors></PopularInstructors>
    </div>
  );
};

export default Home;
