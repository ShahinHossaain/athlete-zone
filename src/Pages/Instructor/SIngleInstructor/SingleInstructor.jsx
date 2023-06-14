const Instructors = ({ instructor }) => {
  const { imageUrl, name, email, numClasses, classes } = instructor;
  console.log("insss", instructor);
  return (
    <div className="flex  w-full bg-gray-700 border border-gray-200 rounded-lg shadow md:flex-row  mx-auto hover:bg-gray-500">
      <div className="flex w-[70%]   h-60 gap-y-10 items-center ">
        <div className="w-[40%] mt-5 md:mt-0 h-64 md:h-full">
          <img
            src={imageUrl}
            alt="Chef"
            className="w-full  rounded-md h-full"
          />
        </div>
        <div className="grid grid-cols-1 text-center w-[60%] p-4 leading-normal text-white">
          <p>Name : {name} </p>

          <p>Email : {email}</p>

          <p>Number offf Classes : ${numClasses}</p>
        </div>
      </div>

      {/* dropdown  */}

      <div className="flex w-[40%] justify-center items-center">
        <div className="w-[50%] flex justify-center">
          <div className="dropdown dropdown-bottom ">
            <label tabIndex={0} className="mx-auto btn btn-primary">
              Classes Taken:
            </label>
            <ul
              tabIndex={0}
              className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
            >
              {classes.map((className, index) => (
                <li key={index}>
                  <a className="text-black">{className}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-[50%] mx-auto">
          <button className="btn btn-primary">see classes</button>
        </div>
      </div>
    </div>
  );
};

export default Instructors;
