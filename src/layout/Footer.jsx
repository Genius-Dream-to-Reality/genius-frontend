import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../components/shared/Button";
import AppLogo from "../components/shared/AppLogo";

const SITEMAP = [
  {
    title: "More on The Blog",
    links: [
      { text: "About Genius", href: "/" },
      { text: "Contributors & Writers", href: "/" },
      { text: "Write For Us", href: "/" },
      { text: "Contact Us", href: "/" },
      { text: "Privacy Policy", href: "/" },
    ],
  },
  {
    title: "More on Genius",
    links: [
      { text: "The Team", href: "/" },
      { text: "Jobs", href: "/" },
      { text: "Press", href: "/" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="pt-20  bg-gradient-to-tr from-dark-purple to-black">
      <div className="footer-top container mx-auto">
        <div className="flex flex-col md:flex-row item-start md:item-center justify-start md:justify-around gap-10 md:gap-0">
          <div className="flex-1 basis-1/4 px-4">
            <div className="logo flex md:flex-col gap-y-3 text-purple space-x-4">
              <AppLogo size="lg" />
              <ul className="hidden md:flex space-x-8 mt-4">
                {/* Social Media Icons */}
                {[
                  [<FaFacebookF />, "https://facebook.com"],
                  [<FaInstagram />, "https://instagram.com"],
                  [<FaTwitter />, "https://twitter.com"],
                ].map(([icon, url], index) => (
                  <li key={index}>
                    <Link to={url} className="text-white hover:text-blue-500">
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
                  <h4 className=" text-purple text-2xl">{title}</h4>
                  <nav>
                    {links.map(({ text, href }, index) => (
                      <div
                        className="footer-nav-link text-base my-3"
                        key={index}
                      >
                        <Link
                          className="text-gray-300 hover:text-gray-400 hover:underline"
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

          <div className="flex-1 flex flex-col gap-y-3 basis-1/4 px-4">
            <h3 className="text-purple text-2xl">Get in touch</h3>
            <p className="text-purple">
              Stay updated on the latest event planning tips, industry trends,
              and exclusive offers. Subscribe now and unlock a world of
              inspiration for your next event!
            </p>
            <form className="inline-flex">
              <input
                className="rounded w-full bg-gray-100 mr-5"
                type="email"
                placeholder="  Email"
              />
              <Button
                type="submit"
                variant={"primary"}
                className="rounded py-3"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer-bottom py-5">
        <h3 className="text-center font-bold text-gray-200 text-xs md:text-base">
          Copyright &#169; 2024 Genius, Inc. Terms & Privacy
        </h3>
      </div>
    </footer>
  );
}
