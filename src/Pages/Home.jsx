import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../images/Background.png";
import personIcon from "../images/Background.png";
import serviceIcon from "../images/Background.png";
import finalizeIcon from "../images/Background.png";
import Typography from "../components/shared/Typograpy";
import { FaArrowAltCircleRight, FaArrowDown } from "react-icons/fa";
import why from "../images/why.png";
import { FaArrowDownAZ } from "react-icons/fa6";
import { SiDatefns } from "react-icons/si";
import { MdDateRange } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";

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
              className="hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded border-2 border-white flex items-center gap-2"
            >
              Select Event type
              <FaArrowDown />
            </Link>
            <Link
              to="/select-event"
              className="hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded border-2 border-white flex items-center gap-2"
            >
              Select Date
              <MdDateRange />
            </Link>
            <button className="hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2">
              Get Started
              <FaArrowAltCircleRight />
            </button>
          </div>
        </div>
      </div>

      {/* Who are you? Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-24 overflow-hidden ">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -left-8 -top-40 text-[200px] font-bold text-yellow-500/10">
                01
              </div>

              <div className="flex items-center space-x-4 mb-8">
                <span className="text-yellow-500 font-semibold text-lg">
                  Get Started
                </span>
                <div className="h-0.5 w-24 bg-yellow-500"></div>
              </div>
              <h1 className="text-5xl font-bold mb-6 mx-10 leading-tight bg-gradient-to-r from-white to-gray-800 bg-clip-text text-transparent">
                Who are you?
              </h1>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed mx-10">
                Whether you're an event organizer or service provider, getting
                started is simple. Register on our platform with just a few
                essential details - no complexity, just a seamless experience
                designed to get you up and running quickly.
              </p>

              <button className="group relative inline-flex items-center justify-center gap-2 mx-10 px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-medium rounded-lg transition-all duration-200 transform hover:-translate-y-1">
                Register Now
                <BsArrowRight />
              </button>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute -z-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={why}
                    alt="Welcome"
                    className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
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
