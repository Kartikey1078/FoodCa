"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#38754E] w-full py-8 mt-24 px-4 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-1 text-center lg:text-left lg:grid-cols-4 gap-8">
        {/* Section 1: Logo and Company Name */}
        <div className="flex flex-row justify-center items-center lg:flex-row lg:items-start lg:justify-start space-x-2 lg:space-x-3">
          <img
            src="/logo/BalancedMealLogo.png"
            alt="Company Logo"
            className="h-[80px] w-auto mb-2 lg:mb-0"
          />
        </div>

        {/* Section 2: Company Links */}
        <div>
          <h2 className="text-[16px] font-normal text-[#ffffff] font-redHatDisplay mb-4 hidden lg:block">
            Company
          </h2>
          <ul className="flex flex-wrap justify-center lg:flex-col gap-4 w-full space-x-10 lg:space-x-0 md:space-x-44">
            <li>
              <a
                href="/plans/about"
                className="text-sm tracking-wide text-[#ffffff] font-redHatDisplay font-normal"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/blogs"
                className="text-sm tracking-wide text-[#ffffff] font-redHatDisplay font-normal"
              >
                Blogs
              </a>
            </li>
            <li>
              <a
                href="/plans/Plan"
                className="text-sm tracking-wide text-[#ffffff] font-redHatDisplay font-normal"
              >
                Plans
              </a>
            </li>
          </ul>
          <div className="block lg:hidden border-b-2 my-6"></div>
        </div>

        {/* Section 3: Social Links */}
        <div className="hidden lg:block">
          <h2 className="text-[16px] tracking-wide text-[#FFFFFF] font-normal font-redHatDisplay mb-4">
            Social Links
          </h2>
          <div className="flex space-x-6">
            <a
              href="https://www.instagram.com/nutritionbox.official/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/insta.svg"
                alt="Instagram"
                className="h-[20px] w-[20px]"
              />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61553161297273"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/facebook.svg"
                alt="Facebook"
                className="h-[18px] w-[18px]"
              />
            </a>
          </div>
        </div>

        {/* Section 4: Newsletter Subscription */}
        <div>
          <h2 className="text-[16px] tracking-wide text-[#FFFFFF] font-normal font-redHatDisplay mb-4">
            Subscribe to our Newsletter
          </h2>
          <input
            type="email"
            placeholder="Enter your Email Id"
            className="p-2 mb-4 bg-[#F0F0F0] rounded-xl text-[#808080] w-full font-redHatDisplay font-medium tracking-wide"
          />
          <button className="border border-[#FFFFFF] text-[#FFFFFF] text-sm font-normal rounded-xl lg:rounded-2xl w-[100px] h-[43px] px-4 py-2 hover:bg-green-600 hover:text-white">
            Subscribe
          </button>
        </div>
      </div>

      {/* Social Links for Small Screens */}
      <div className="block lg:hidden mt-8">
        <h2 className="text-[16px] tracking-wide text-center text-[#FFFFFF] font-normal font-redHatDisplay mb-4">
          Social Links
        </h2>
        <div className="flex justify-center space-x-8">
          <a
            href="https://www.instagram.com/nutritionbox.official/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/insta.svg"
              alt="Instagram"
              className="h-[20px] w-[20px]"
            />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61553161297273"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/facebook.svg"
              alt="Facebook"
              className="h-[18px] w-[18px]"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
