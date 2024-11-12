import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const SITEMAP = [
  {
    title: "Company",
    links: [
      { text: "About Us", href: "/about-us" },
      { text: "Services", href: "/services" },
      { text: "Contact Us", href: "/contact-us" },
      { text: "Company", href: "/company" },
    ],
  },
  {
    title: "Resources",
    links: [
      { text: "Terms of Use", href: "/terms-of-use" },
      { text: "Privacy", href: "/privacy" },
      { text: "Site Map", href: "/sitemap" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="pt-20  bg-gradient-to-t from-transparent to-primary-purple">
      <div className="footer-top container mx-auto">
        <div className="flex flex-col md:flex-row item-start md:item-center justify-start md:justify-around gap-10 md:gap-0">
          <div className="flex-1 basis-1/2 px-4">
            <div className="logo flex md:flex-col gap-y-3">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                quos recusandae sequi quaerat sit quod sint laborum vero
                tenetur?
              </p>
              <ul className="hidden md:flex space-x-4 mt-4">
                {/* Social Media Icons */}
                {[
                  [<FaFacebookF />, "https://facebook.com"],
                  [<FaInstagram />, "https://instagram.com"],
                  [<FaTwitter />, "https://twitter.com"],
                ].map(([icon, url], index) => (
                  <li key={index}>
                    <Link
                      to={url}
                      className="text-dark-purple hover:text-blue-500"
                    >
                      {icon}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex basis-1/3 justify-evenly md:justify-around px-8">
            {SITEMAP.map(({ title, links }, key) => (
              <div key={key}>
                <div className="footer-nav-section sm:mb-0 mb-6">
                  <h4 className=" text-dark-purple text-2xl">{title}</h4>
                  <nav>
                    {links.map(({ text, href }, index) => (
                      <div
                        className="footer-nav-link text-base my-3"
                        key={index}
                      >
                        <Link
                          className="text-gray-900 hover:text-black hover:underline"
                          to={href}
                        >
                          {text}
                        </Link>
                      </div>
                    ))}
                  </nav>
                </div>
              </div>
            ))}
          </div>

          <div className="flex-1 flex flex-col gap-y-3 basis-1/2 px-4">
            <h3 className="text-dark-purple text-2xl">Get in touch</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum quos
              recusandae sequi quaerat sit quod sint laborum vero tenetur?
            </p>
            <form className="inline-flex">
              <input
                className="rounded-full w-full bg-gray-100 mr-5"
                type="email"
                placeholder="Email"
              />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer-bottom py-5">
        <h3 className="text-center font-bold text-xs md:text-base">
          Copyright &#169; 2024 Genius 
        </h3>
      </div>
    </footer>
  );
}
