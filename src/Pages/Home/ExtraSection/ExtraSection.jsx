import { Slide } from "react-awesome-reveal";
const ExtraSection = () => {
  return (
    <Slide direction="" delay={10}>
      <div>
        <div className="mx-3 md:mx-20 card shadow-lg p-3 md:p-10 bg-[#8294C4] navv mt-36 mb-32">
          <p className="text-3xl md:text-5xl text-center o_font3 tracking-2 font-bold font-serif ">
            <span className="text-center text-5xl font-bold font-font1 text-transparent bg-clip-text bg-gradient-to-r from-[#99DBF5] to-[#A7ECEE] mb-12">
              WebSite Details{" "}
            </span>
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 justify-between mt-7 text-black">
            <div className="bg-slate-300 px-4 md:px-8 w-full py-2 md:py-4 text-center transition duration-200 ease-in-out hover:bg-gray-500">
              <p className="text-3xl font-extrabold transition duration-200 ease-in-out hover:text-gray-100">
                3<span className="">0</span>
              </p>
              <p className="text-lg font-bold transition duration-200 ease-in-out hover:text-gray-100">
                members
              </p>
            </div>
            <div className="bg-slate-300 px-4 md:px-8 py-2 md:py-4 w-full text-center transition duration-200 ease-in-out hover:bg-gray-500">
              <p className="text-3xl font-extrabold transition duration-200 ease-in-out hover:text-gray-100">
                30
              </p>
              <p className="text-lg font-bold transition duration-200 ease-in-out hover:text-gray-100">
                classes
              </p>
            </div>
            <div className="bg-slate-300 px-4 md:px-8 py-2 md:py-4 w-full text-center transition duration-200 ease-in-out hover:bg-gray-500">
              <p className="text-3xl font-extrabold transition duration-200 ease-in-out hover:text-gray-100">
                33
              </p>
              <p className="text-lg font-bold transition duration-200 ease-in-out hover:text-gray-100">
                photos
              </p>
            </div>
            <div className="bg-slate-300 px-4 md:px-8 py-2 md:py-4 w-full text-center transition duration-200 ease-in-out hover:bg-gray-500">
              <p className="text-3xl font-extrabold transition duration-200 ease-in-out hover:text-gray-100">
                44
              </p>
              <p className="text-lg font-bold transition duration-200 ease-in-out hover:text-gray-100">
                forum posts
              </p>
            </div>
            <div className="bg-slate-300 px-4 md:px-8 py-2 md:py-4 w-full text-center transition duration-200 ease-in-out hover:bg-gray-500">
              <p className="text-3xl font-extrabold transition duration-200 ease-in-out hover:text-gray-100">
                55
              </p>
              <p className="text-lg font-bold transition duration-200 ease-in-out hover:text-gray-100">
                comments
              </p>
            </div>
            <div className="bg-slate-300 px-4 md:px-8 py-2 md:py-4 w-full text-center transition duration-200 ease-in-out hover:bg-gray-500">
              <p className="text-3xl font-extrabold transition duration-200 ease-in-out hover:text-gray-100">
                35
              </p>
              <p className="text-lg font-bold transition duration-200 ease-in-out hover:text-gray-100">
                Articles
              </p>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default ExtraSection;
