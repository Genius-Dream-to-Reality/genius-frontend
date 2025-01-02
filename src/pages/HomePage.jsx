import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/Background.png";
import { FaArrowAltCircleRight, FaArrowDown } from "react-icons/fa";
import why from "../assets/images/why.png";
import picking from "../assets/images/picking.png";
import finalized from "../assets/images/finalized.png";
import { MdArrowDownward, MdDateRange } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/event-planning");
  };

  return (
    <div className=" min-h-screen ">

      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-dark-purple/50 via-black/70 to-black/80" />
        </div>

        <Header />
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center max-w-4xl ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className=" "
          >
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex items-center space-x-4 mb-8"
            >
              <div className="h-0.5 w-24 bg-yellow-500" />
              <span className="text-yellow-500 font-semibold text-2xl tracking-wide">
                Dream to Reality
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-6xl md:text-8xl font-bold mb-8 text-white leading-tight"
            >
              Your Hub For{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Seamless
              </span>{" "}
              Event Planning!
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4 mb-12"
            >
              <span className="text-white font-semibold text-2xl">
                Scroll Down
              </span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <MdArrowDownward className="text-3xl text-yellow-500" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <button className="group relative px-6 py-3 bg-transparent border-2 border-white rounded-lg overflow-hidden">
                <span className="absolute inset-0 w-0 bg-yellow-500 transition-all duration-[400ms] ease-out group-hover:w-full" />
                <span className="relative flex items-center gap-2 text-white font-semibold group-hover:text-black">
                  Select Event Type
                  <FaArrowDown className="group-hover:translate-y-1 transition-transform duration-300" />
                </span>
              </button>

              <button className="group relative px-6 py-3 bg-transparent border-2 border-white rounded-lg overflow-hidden">
                <span className="absolute inset-0 w-0 bg-yellow-500 transition-all duration-[400ms] ease-out group-hover:w-full" />
                <span className="relative flex items-center gap-2 text-white font-semibold group-hover:text-black">
                  Select Date
                  <MdDateRange className="group-hover:scale-110 transition-transform duration-300" />
                </span>
              </button>

              <button
                onClick={handleNavigation}
                className="group px-6 py-3 flex items-center gap-2 text-white font-semibold hover:text-yellow-500 transition-colors duration-300">
                Get Started
                <FaArrowAltCircleRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Who are you? Section */}
      <div className="bg-gradient-to-br from-dark-purple to-black">
        <div className=" text-white py-24 overflow-hidden ">
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

                  <div className="relative rounded overflow-hidden shadow-2xl">
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

        {/* Plan your event Section */}
        <div className=" text-white py-24 overflow-hidden ">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="w-full lg:w-1/2">
                <div className="relative">
                  <div className="absolute -z-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

                  <div className="relative rounded overflow-hidden shadow-2xl">
                    <img
                      src={picking}
                      alt="Welcome"
                      className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 relative">
                <div className="absolute -left-8 -top-40 text-[200px] font-bold text-yellow-500/10">
                  02
                </div>

                <div className="flex items-center space-x-4 mb-8">
                  <span className="text-yellow-500 font-semibold text-lg">
                    Plan your event
                  </span>
                  <div className="h-0.5 w-24 bg-yellow-500"></div>
                </div>
                <h1 className="text-5xl font-bold mb-6 mx-10 leading-tight bg-gradient-to-r from-white to-gray-800 bg-clip-text text-transparent">
                  Picking the right service for you!
                </h1>

                <p className="text-gray-300 text-lg mb-8 leading-relaxed mx-10">
                  After successfully registered to the account as an event
                  organizer you can seamlessly plan your dream through Genius
                  platform by creating perfect package just for you.
                </p>

                <button className="group relative inline-flex items-center justify-center gap-2 mx-10 px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-medium rounded-lg transition-all duration-200 transform hover:-translate-y-1">
                  read more
                  <BsArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Who are you? Section */}
        <div className=" text-white py-24 overflow-hidden ">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="w-full lg:w-1/2 relative">
                <div className="absolute -left-8 -top-40 text-[200px] font-bold text-yellow-500/10">
                  03
                </div>

                <div className="flex items-center space-x-4 mb-8">
                  <span className="text-yellow-500 font-semibold text-lg">
                    where you go is the key
                  </span>
                  <div className="h-0.5 w-24 bg-yellow-500"></div>
                </div>
                <h1 className="text-5xl font-bold mb-6 mx-10 leading-tight bg-gradient-to-r from-white to-gray-800 bg-clip-text text-transparent">
                  Finalized the plan & Enjoy your day
                </h1>

                <p className="text-gray-300 text-lg mb-8 leading-relaxed mx-10">
                  After successfully picking all your needs to your customized
                  package, you can finalize it by submitting. Genius will
                  contact all the vendors for you and notify to along the wey
                  until the event day.
                </p>

                <button className="group relative inline-flex items-center justify-center gap-2 mx-10 px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-medium rounded-lg transition-all duration-200 transform hover:-translate-y-1">
                  read more
                  <BsArrowRight />
                </button>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="relative">
                  <div className="absolute -z-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

                  <div className="relative rounded overflow-hidden shadow-2xl">
                    <img
                      src={finalized}
                      alt="Welcome"
                      className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
