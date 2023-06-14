import { Bounce } from "react-awesome-reveal";

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="bg-gradient-to-r from-[#46458C] to-[#99DBF5] py-8 mb-10 rounded-lg navv">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center font-font1 lette">
          <Bounce>
            <h2 className="text-7xl tracking-wider font-bold text-white text-transparent bg-clip-text bg-gradient-to-r from-[#46458C] to-[#A7ECEE]">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl flex flex-col font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#99DBF5] to-[#A7ECEE] mt-4">
                {subtitle}
                <span>---------------- ----------------</span>
              </p>
            )}
          </Bounce>
        </div>
      </div>
    </div>
  );
};

export default SectionTitle;
