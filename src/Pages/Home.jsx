import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../images/Background.png";
import personIcon from "../images/Background.png";
import serviceIcon from "../images/Background.png";
import finalizeIcon from "../images/Background.png";
import Typography from "../components/shared/Typograpy";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Home = () => {
  return (
    <div className=" min-h-screen">
      {/* Hero Section */}
      <div
        className="bg-center bg-cover h-screen flex flex-col justify-center items-center relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-purple to-black opacity-50"></div>

        <div className="relative z-10 text-white container  max-w-2xl">
          <Typography variant={"display-5"} className="text-5xl mb-4">
            Your Hub For Seamless Event Planning!
          </Typography>
          <div className="flex space-x-4 mt-8 items-start">
            <Link
              to="/select-event"
              className="hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded border-2 border-white"
            >
              Select Event type
            </Link>
            <Link
              to="/select-event"
              className="hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded border-2 border-white"
            >
              Select Date
            </Link>
            <button className="hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2">
              Get Started
              <FaArrowAltCircleRight />
            </button>
          </div>
        </div>
      </div>

      {/* Who are you? Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <img src={personIcon} alt="Person Icon" className="w-16 h-16 mr-4" />
          <div>
            <h2 className="text-3xl font-bold mb-4">Who are you?</h2>
            <p className="mb-8">
              Every event planner is a unique individual, and we want to provide
              a platform that caters to your specific needs.
            </p>
            <Link
              to="/register"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* Picking the right service for you! Section */}
      <div className="bg-gray-800 text-white py-16">
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="mr-4">
            <img
              src={serviceIcon}
              alt="Service Icon"
              className="w-16 h-16 mb-4"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Picking the right service for you!
            </h2>
            <p className="mb-8">
              After successfully registering on the platform, you can seamlessly
              plan your dream event by creating perfect matches for you.
            </p>
            <Link
              to="/services"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>

      {/* Finalized the plan & Enjoy your day Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="mr-4">
            <img
              src={finalizeIcon}
              alt="Finalize Icon"
              className="w-16 h-16 mb-4"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Finalized the plan & Enjoy your day
            </h2>
            <p className="mb-8">
              After finalizing all the details, you can focus on enjoying the
              moment with your guests.
            </p>
            <Link
              to="/finalized-plan"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
