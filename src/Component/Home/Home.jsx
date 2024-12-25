import axios from "axios";
import React, { useRef, useState } from "react";
import bgimg from "../../assets/bgimage.webp";
import Result from "../Result/Result";

const Home = () => {
  const [showResult, setShowResult] = useState(false);
  const [scanData, setScanData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // To track the progress percentage
  const resultRef = useRef(null);
  const [emptyInput, setEmptyInput] = useState(false);
  const handleScreen = async () => {
    const siteUrl = document.querySelector("input").value;

    if (!siteUrl || !/^https?:\/\/[^\s]+$/.test(siteUrl)) {
      setEmptyInput(true);
      return;
    }

    setLoading(true); // Start loading
    setProgress(0); // Reset progress
    setShowResult(false);

    // Simulate progress increment
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 99 ? prev + 1 : prev));
    }, 600);

    try {
      const response = await axios.post("http://localhost:5000/Singup/scan", {
        url: siteUrl,
      });

      clearInterval(progressInterval); // Stop progress simulation
      setProgress(100); // Set progress to 100% on success

      if (response.data) {
        setScanData(response.data);
        console.log(response.data);
        setShowResult(true);
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 0);
      } else {
        alert("No results returned from the scan.");
      }
    } catch (error) {
      console.error("Error during scanning:", error);
      alert("An error occurred while scanning.");
      clearInterval(progressInterval);
      setProgress(0); // Reset progress on error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${bgimg})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Web-Based Vulnerability Scanning Platform
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Ensure the security of your website with our advanced scanning
            tools.
          </p>
          <div className="flex flex-col items-center gap-4 w-full px-4">
            <div className="flex flex-col w-full max-w-md">
              <input
                type="text"
                placeholder="Enter your site URL"
                className={`p-3 rounded-md text-gray-700 focus:outline-none w-full border ${
                  emptyInput === true ? "border-red-500" : "border-gray-300"
                }`}
              />
              {emptyInput === true && (
                <p className="text-red-500 text-sm mt-2">
                  Please enter a valid URL.
                </p>
              )}
            </div>

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium w-full max-w-md"
              onClick={handleScreen}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Scanning..." : "Scan Now"}
            </button>
          </div>

          {/* Loading Progress */}
          {loading && (
            <div className="mt-4 w-full max-w-md mx-auto">
              <div className="relative h-4 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-blue-600"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-white mt-2">{progress}%</p>
            </div>
          )}
        </div>
      </section>

      {showResult ? (
        <div ref={resultRef} className="py-16">
          <Result data={scanData} />
        </div>
      ) : (
        <>
          {/* Features Section */}
          <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="container mx-auto px-6 lg:px-20">
              <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-12">
                Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Feature 1 */}
                <div className="text-center p-8 shadow-md rounded-lg bg-white transition-transform transform hover:scale-105">
                  <div className="mb-4 text-blue-600">
                    <svg
                      className="w-12 h-12 mx-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 13V16M16 13V16M4 8H20M4 16H16M8 8V13M12 8V13M16 8V13M20 8V13"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Fast Scanning</h3>
                  <p className="text-gray-600">
                    Quickly scan your website for vulnerabilities in real-time.
                  </p>
                </div>
                {/* Feature 2 */}
                <div className="text-center p-8 shadow-md rounded-lg bg-white transition-transform transform hover:scale-105">
                  <div className="mb-4 text-green-600">
                    <svg
                      className="w-12 h-12 mx-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14H10V21L20 10H14"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Detailed Reports</h3>
                  <p className="text-gray-600">
                    Receive comprehensive reports with actionable insights.
                  </p>
                </div>
                {/* Feature 3 */}
                <div className="text-center p-8 shadow-md rounded-lg bg-white transition-transform transform hover:scale-105">
                  <div className="mb-4 text-yellow-600">
                    <svg
                      className="w-12 h-12 mx-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.75 19L7 16L3.75 21H20.25L17 16L14.25 19M10 10H14M12 2V10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Continuous Monitoring
                  </h3>
                  <p className="text-gray-600">
                    Stay updated with regular scans and vulnerability tracking.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
            <div className="container mx-auto px-6 lg:px-20 text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                Why Choose Us?
              </h2>
              <p className="text-lg md:text-xl mb-8">
                Our platform combines cutting-edge technology with user-friendly
                features to deliver unparalleled security solutions.
              </p>
              <button className="bg-white text-blue-600 py-3 px-8 rounded-md font-medium hover:bg-gray-100">
                Learn More
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
