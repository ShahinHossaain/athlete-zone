import ExtraSection from "../ExtraSection/ExtraSection";
import PopularClass from "../PopularClass/PopularClass";
// import PopularInstructors from "../PopularInstuctors/PopularInstructors";
import Banner from "../Banner/Banner";
import Instructors from "../../Instructor/Instructors/Instructors";
const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularClass ></PopularClass>
      {/* <PopularInstructors></PopularInstructors>
       */}
      <Instructors />
      <ExtraSection></ExtraSection>
    </div>
  );
};

export default Home;
