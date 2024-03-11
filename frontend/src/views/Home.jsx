import React from "react";
import NavbarHome from "../components/NavbarHome";
import FooterHome from "../components/FooterHome";
import { Link } from "react-router-dom";
import FormAccessSignUp from "../components/FormAccessSignUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import FeatureCard from "../components/FeatureCard";

function Home() {
  return (
    <div className="flex flex-col">
      <NavbarHome className="shadow-md" />
      <div className="flex  mb-16 flex-col md:flex-row justify-around  ml-4 items-center">
        <div className="-translate-y-8 mr-12">
          {" "}
          <img
            className="h-auto md:ml-6  w-full md:w-[800px] mt-5 md:mt-0"
            alt="image"
            src="/img2.png"
          />{" "}
        </div>
        <div className="text-white md:w-1/2 px-8 py-16 flex flex-col justify-center">
          <h1 className="text-4xl font-bold leading-tight">
            Empower Your Projects
          </h1>
          <p className="text-2xl font-medium mt-4">
            with{" "}
            <span className="text-4xl font-bold text-indigo-400">
              TacticFlow
            </span>
          </p>
          <p className="text-xl mt-4 text-gray-200">
            Organize, collaborate, and track your projects with ease.
          </p>
          <div>
            <button className="bg-white mr-4   text-indigo-500 hover:text-white  hover:shadow-lg  ease-in-ou hover:bg-indigo-700 font-bold py-2 mt-6 px-4 rounded-full transition duration-300 focus:ring-4 focus:ring-indigo-300 focus:outline-none">
              Boost Your Project Success{" "}
            </button>{" "}
            <Link to="/login">
              <FontAwesomeIcon icon={faArrowRight} ml-1 />
              {/* Replace with your desired icon */}
              <button className="bg-indigo-500 ml-2    hover:shadow-lg  ease-in-ou hover:bg-indigo-700 text-white font-bold py-2 mt-6 px-4 rounded-full transition duration-300 focus:ring-4 focus:ring-indigo-300 focus:outline-none">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>

      <FormAccessSignUp />
      <div className="features flex flex-wrap justify-center items-center my-40">
        <FeatureCard
          title="Project Organization Hub"
          description="A visual and intuitive platform for organizing tasks into boards, lists, and cards."
          icon="fas fa-tasks"
          image="/consumer-1@2x.png" // Replace with the path to your image
        />

        <FeatureCard
          title="Real-time Project Dashboard"
          description="A comprehensive dashboard that provides real-time insights into the progress of each project."
          icon="fas fa-chart-line"
          image="/graphic-1@2x.png" // Replace with the path to your image
        />

        <FeatureCard
          title="Team Collaboration Hub"
          description="A comprehensive dashboard that provides real-time insights into the progress."
          icon="fas fa-users"
          image="/network-1@2x.png" // Replace with the path to your image
        />
      </div>

      <FooterHome />
    </div>
  );
}

export default Home;
