import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/Background.png";
import { FaArrowAltCircleRight, FaArrowDown } from "react-icons/fa";
import why from "../assets/images/why.png";
import picking from "../assets/images/picking.png";
import finalized from "../assets/images/finalized.png";
import { MdDateRange } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

// Import the DatePicker components
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import {eventCategoryApi} from "../api/event"
import { AlertContext } from "../contexts/AlertContext";
import "../assets/css/homePage.css"
import {TextField} from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  const images = [backgroundImage, why, picking, finalized];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [eventCategories, setEventCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const { addAlert } = useContext(AlertContext);
  const dropdownRef = useRef(null);
  const tooltipTimeoutRef = useRef(null);
  const minDate = dayjs().add(14, 'day');

  const today = dayjs();
  const maxDate = today.add(14, 'day');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await eventCategoryApi.getAllCategories();
        if (result.type === "success") {

          const categoriesWithDescriptions = result.data.map(category => ({
            ...category,
            description: category.description || `This is a ${category.id.toLowerCase()} event category. Perfect for organizing professional and memorable ${category.id.toLowerCase()} events.`
          }));
          setEventCategories(categoriesWithDescriptions);
        } else {
          console.error(result.message);
          addAlert(result.message,"error");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        addAlert("Failed to load categories", "error");
      }
    };
    fetchCategories();
  }, []);

  const handleNavigation = () => {
    if (selectedCategory && selectedDate) {
      navigate("/event-planning", {
        state: {
          category: selectedCategory,
          date: selectedDate
        }
      });
    } else {
      addAlert("Please select both a category and date", "warning");
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
    setHoveredCategory(null);
    setShowTooltip(false);
  };

  // Handle clicking outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setHoveredCategory(null);
        setShowTooltip(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, []);

  const handleItemMouseEnter = (category) => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    setHoveredCategory(category);
    setShowTooltip(true);
  };

  const handleItemMouseLeave = () => {
    tooltipTimeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
      setHoveredCategory(null);
    }, 200);
  };

  const handleTooltipMouseEnter = () => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
  };

  const handleTooltipMouseLeave = () => {
    setShowTooltip(false);
    setHoveredCategory(null);
  };


  return (
      <div className="min-h-screen">
        {/* Custom styles for better tooltip positioning */}
        <style jsx>{`
        .dropdown-container {
          position: relative;
          z-index: 1000;
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 8px;
          min-width: 250px;
          max-height: 300px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border: 1px solid #e5e7eb;
          overflow-y: auto;
          z-index: 1001;
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid #f3f4f6;
          transition: background-color 0.15s ease;
          position: relative;
        }
        .dropdown-item:last-child {
          border-bottom: none;
        }
        .dropdown-item:hover {
          background-color: #fef9c3;
        }
        .dropdown-item.selected {
          background-color: #fef3c7;
        }
        .tooltip {
          position: fixed;
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          padding: 16px;
          width: 280px;
          z-index: 1002;
          pointer-events: auto;
        }
        .tooltip-arrow {
          position: absolute;  
          width: 0;
          height: 0;
          border-style: solid;
        }
        .tooltip-arrow.left {
          right: 100%;
          top: 20px;
          border-width: 8px 8px 8px 0;
          border-color: transparent white transparent transparent;
        }
      `}</style>

        {/* Carousel section */}
        <div className="relative h-screen w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
            >
              <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${images[currentIndex]})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-dark-purple/50 via-black/70 to-black/80" />
              </div>
            </motion.div>
          </AnimatePresence>

          <Header />
          <div className="relative pt-16 container mx-auto px-4 flex flex-col justify-center max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-wrap gap-4"
              >
                {/* Category Dropdown */}
                <div className="dropdown-container" ref={dropdownRef}>
                  <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="group relative px-6 py-3 bg-transparent border-2 border-white rounded-lg overflow-hidden"
                  >
                    <span className="absolute inset-0 w-0 bg-yellow-500 transition-all duration-[400ms] ease-out group-hover:w-full" />
                    <span className="relative flex items-center gap-2 text-white font-semibold group-hover:text-black">
                    {selectedCategory ? selectedCategory.id : "Select Event Category"}
                      <FaArrowDown className={`group-hover:translate-y-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </span>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                      <div className="dropdown-menu">
                        {eventCategories.map((category, index) => (
                            <button
                                key={category.id || index}
                                onClick={() => handleCategorySelect(category)}
                                onMouseEnter={() => handleItemMouseEnter(category)}
                                onMouseLeave={handleItemMouseLeave}
                                className={`dropdown-item ${selectedCategory?.id === category.id ? 'selected' : ''}`}
                            >
                        <span style={{ fontWeight: '500', color: '#1f2937' }}>
                          {category.id}
                        </span>
                              {selectedCategory?.id === category.id && (
                                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
                              )}
                            </button>
                        ))}
                      </div>
                  )}

                  {/* Tooltip */}
                  {showTooltip && hoveredCategory && (
                      <div
                          className="tooltip"
                          style={{
                            left: dropdownRef.current ? dropdownRef.current.getBoundingClientRect().right + 12 : 0,
                            top: dropdownRef.current ? dropdownRef.current.getBoundingClientRect().top + 60 : 0,
                          }}
                          onMouseEnter={handleTooltipMouseEnter}
                          onMouseLeave={handleTooltipMouseLeave}
                      >
                        <div className="tooltip-arrow left"></div>
                        <h4 style={{
                          fontWeight: 'bold',
                          color: '#d97706',
                          marginBottom: '8px',
                          fontSize: '16px'
                        }}>
                          {hoveredCategory.id}
                        </h4>
                        <p style={{
                          fontSize: '14px',
                          color: '#4b5563',
                          lineHeight: '1.5',
                          margin: 0
                        }}>
                          {hoveredCategory.description}
                        </p>
                      </div>
                  )}
                </div>

                <div className="relative group">
                  <TextField
                      type="date"
                      label="Event Date"
                      InputLabelProps={{ shrink: true }}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      inputProps={{
                        min: minDate.format('YYYY-MM-DD')
                      }}
                      fullWidth
                  />
                </div>

                {/* Get Started Button */}
                <button
                    onClick={handleNavigation}
                    className="group px-6 py-3 flex items-center gap-2 text-white font-semibold hover:text-yellow-500 transition-colors duration-300"
                >
                  Get Started
                  <FaArrowAltCircleRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentIndex === index ? "w-8 bg-yellow-500" : "bg-white/50"
                    }`}
                />
            ))}
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
                <div className="w-full lg:w-1/2 order-2 md:order-1">
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
                <div className="w-full lg:w-1/2 relative  order-1 md:order-2">
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

          {/* Finalized Section */}
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