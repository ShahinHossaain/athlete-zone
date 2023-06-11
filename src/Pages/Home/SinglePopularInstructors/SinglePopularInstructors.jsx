const SinglePopularInstructors = ({ instructor }) => {
  const { imageUrl, instructorName, email, numClasses, classes } = instructor;
  return (
    // <div className="relative first-letter:mx-auto bg-gray-200 shadow-md rounded-md overflow-hidden">
    //   <div className="p-4">
    //     <div className="flex justify-center">
    //       <img
    //         src={imageUrl}
    //         alt="Instructor Image"
    //         className="w-52 h-52 rounded-full"
    //       />
    //     </div>
    //     <div className="text-center mt-4">
    //       <h2 className="text-xl font-bold">Instructor: {instructorName}</h2>
    //       <p className="mt-2 text-gray-600">Email: {email}</p>
    //     </div>
    //     <div className="mt-4">
    //       <p className="font-semibold">Number of Classes: {numClasses}</p>
    //     </div>
    //     <div className="mt-4">
    //       <p className="font-semibold">Classes Taken:</p>
    //       <ul className="list-disc ml-8 mt-2">
    //         {classes.map((className, index) => (
    //           <li key={index}>{className}</li>
    //         ))}
    //       </ul>
    //     </div>
    //     <div className="absolute bottom-4 left-4 right-4 flex justify-center">
    //       <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
    //         See Classes
    //       </button>
    //     </div>
    //   </div>
    // </div>
    // <div className="card bg-gray-400 shadow-xl">
    //   <figure className="px-10 h-64 w-5/6 pt-10">
    //     <img src={imageUrl} alt="" className="object-cover" />
    //   </figure>
    //   <div className="card-body items-center text-center">
    //     <h2 className="card-title">Instructor: {instructorName}</h2>
    //     <p>Email: {email}</p>
    //     <div className="mt-4">
    //       <p className="font-semibold">Classes Taken:</p>
    //       <ul className="list-disc ml-8 mt-2">
    //         {classes.map((className, index) => (
    //           <li key={index}>{className}</li>
    //         ))}
    //       </ul>
    //     </div>

    //     <div className="mt-4">
    //       <p className="font-semibold">Number of Classes: {numClasses}</p>
    //     </div>
    //     <div className="card-actions">
    //       <button className="btn btn-primary">See Classes</button>
    //     </div>
    //   </div>
    // </div>

    <div className="flex flex-col md:flex-row  items-center justify-around mx-auto gap-1  md:gap-8 h-full w-full rounded-md shadow-md p-4 transition-transform ease-in-out duration-300 bg-black text-green-500">
      {/* Left side - chef photo */}
      <div className="md:w-1/2 w-5/6 mt-5 md:mt-0 h-64 md:h-full">
        <img src={imageUrl} alt="Chef" className="w-full rounded-md h-full" />
      </div>

      {/* Right side - chef information */}
      <div className="md:w-1/2 px-1 md:px-4 mt-3 md:mt-0">
        <h2 className="text-lg font-bold mb-2">{instructorName}</h2>
        <p>Email: {email}</p>
        {/* <div className="mt-4">
          <p className="font-semibold">Classes Taken:</p>
          <ul className="list-disc ml-8 mt-2">
            {classes.map((className, index) => (
              <li key={index}>{className}</li>
            ))}
          </ul>
        </div> */}

        <div className=" flex justify-start">
          <div className="dropdown dropdown-bottom ">
            <label tabIndex={0} className=" btn">
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

        <p className="font-semibold">Number of Classes: {numClasses}</p>
        <button className="btn btn-primary">See Classes</button>
      </div>
    </div>
  );
};

export default SinglePopularInstructors;
