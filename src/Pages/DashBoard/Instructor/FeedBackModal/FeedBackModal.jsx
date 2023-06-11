const FeedBackModal = ({ setIsOpen, feedback }) => {
  return (
    <div className="fixed inset-0 bg-black h-screen bg-opacity-50   z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-3xl mx-auto my-6">
        <div className="relative md:left-40 p-16 flex-col w-full bg-white border border-gray-300 shadow-lg rounded-lg outline-none focus:outline-none">
          <p className="text-2xl">{feedback}</p>
          <button className="btn mt-3 w-2/3" onClick={() => setIsOpen(false)}>
            close
          </button>
        </div>
      </div>
      {/* <div className="fixed inset-0 z-40 bg-black opacity-50"></div> */}
    </div>
  );
};

export default FeedBackModal;
