import ExtraSection from "../ExtraSection/ExtraSection";
import PopularClass from "../PopularClass/PopularClass";
import PopularInstructors from "../PopularInstuctors/PopularInstructors";
import Banner from "../Banner/Banner";
const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularClass isFromPopularClass={true}></PopularClass>
      <PopularInstructors></PopularInstructors>
      <ExtraSection></ExtraSection>
    </div>
  );
};

export default Home;
