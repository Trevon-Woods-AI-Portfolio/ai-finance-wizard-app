import React from "react";
import Orb from "../utils/orb";
import Navbar from "../components/Navbar";

const Landing = () => {
  return (
    <div
      style={{ width: "100%", height: "100vh", position: "relative" }}
      className="min-h-screen overflow-hidden"
    >
      <div>
        <Navbar />
        <div className="absolute w-full h-full flex flex-col justify-center items-center gap-4 sm:gap-6 lg:gap-8 px-4 mt-[-50px]">
          <div className="flex flex-col justify-center items-center gap-2 sm:gap-3">
            <img
              src="../assets/rising_stock_logo.png"
              alt="Finance Wizard Logo"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mt-[-20px] sm:mt-[-30px] lg:mt-[-50px]"
            />
            <h1 className="flex flex-col text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-amber-400 text-center px-2">
              <p>Your Gateway to Real-Time</p>
              <p>Financial Insights</p>
            </h1>
            <h3 className="text-base sm:text-md md:text-lg lg:text-xl xl:text-2xl font-bold text-amber-100 text-center">
              Live Stock Quotes & Market Analysis
            </h3>
          </div>
          <div className="flex flex-row justify-center items-center gap-3 sm:gap-4 lg:gap-6 w-full sm:w-auto px-14 max-w-md sm:max-w-2xl">
            <button className="flex-1 sm:flex-initial sm:w-auto px-4 py-2 sm:px-8 sm:py-3 md:px-10 md:py-4 text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl bg-amber-400 text-white rounded-full hover:bg-amber-500 transition whitespace-nowrap cursor-pointer">
              Log in
            </button>
            <button className="flex-1 sm:flex-initial sm:w-auto px-4 py-2 sm:px-8 sm:py-3 md:px-10 md:py-4 text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl bg-amber-400 text-white rounded-full hover:bg-amber-500 transition whitespace-nowrap cursor-pointer">
              Sign up
            </button>
          </div>
        </div>
      </div>

      <Orb
        hoverIntensity={0.8}
        rotateOnHover={true}
        hue={200}
        forceHoverState={false}
      />
    </div>
  );
};

export default Landing;
