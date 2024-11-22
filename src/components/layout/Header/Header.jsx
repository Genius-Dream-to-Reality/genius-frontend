import React from "react";
import { FaCartPlus } from "react-icons/fa";
import AppLogo from "../../shared/AppLogo";
import Button from "../../shared/Button";

const Header = () => {
  return (
    <header className=" flex justify-between items-center sm:h-40 max-h-24 z-20 bg-gradient-to-tr from-dark-purple to-black px-4 shadow-2xl sticky shadow-black   ">
      <div className="flex items-center space-x-4 ml-4 sm:ml-0 ">
        <AppLogo className={"w-36 "} />
      </div>
      <div className="flex items-center space-x-4 ">
        <nav className="hidden sm:block">
          <ul className="flex space-x-9 text-xl">
            <li>
              <a
                href="#"
                className="text-light-purple hover:text-primary-purple"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-light-purple hover:text-primary-purple"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-light-purple hover:text-primary-purple"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center space-x-4 mr-24 ">
        <FaCartPlus className="text-2xl text-white" />
        <Button variant="primary">Login</Button>
      </div>
    </header>
  );
};

export default Header;
