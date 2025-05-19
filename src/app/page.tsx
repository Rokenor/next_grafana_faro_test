"use client";

import { useState } from "react";
import { logError, logEvent } from "@/utils/faro";
import Image from "next/image";

export default function Home() {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter((prev) => prev + 1);
    logEvent("button_click", {
      action: "increment",
      newValue: String(counter + 1),
    });
  };

  const handleError = () => {
    try {
      throw new Error("Demo error for monitoring");
    } catch (error) {
      logError(error as Error, { source: "demo_button" });
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-blue-950">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          Frontend Application Monitoring with Grafana Faro
        </h1>

        {/* Hero Section with Dashboard Preview */}
        <section className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8 overflow-hidden border border-blue-800/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Real-time Frontend Monitoring
              </h2>
              <p className="text-gray-300 mb-4">
                Grafana Faro provides comprehensive monitoring for your frontend
                applications, giving you insights into user experience,
                performance, and errors in real-time.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">
                    Real-time error tracking
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Performance monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300">User session analytics</span>
                </div>
              </div>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-xl border border-blue-800/30">
              <Image
                src="/dashboard-preview.png"
                alt="Grafana Faro Dashboard Preview"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Features Section with Icons */}
        <section className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8 border border-blue-800/30">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Key Monitoring Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-900/50 rounded-lg border border-blue-800/30">
              <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">
                Error Tracking
              </h3>
              <p className="text-gray-300">
                Catch and analyze JavaScript errors, network failures, and
                console errors in real-time.
              </p>
            </div>
            <div className="p-6 bg-gray-900/50 rounded-lg border border-blue-800/30">
              <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">
                Performance Metrics
              </h3>
              <p className="text-gray-300">
                Monitor page load times, resource timing, and user interaction
                performance.
              </p>
            </div>
            <div className="p-6 bg-gray-900/50 rounded-lg border border-blue-800/30">
              <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">
                User Analytics
              </h3>
              <p className="text-gray-300">
                Track user sessions, behavior patterns, and application usage
                metrics.
              </p>
            </div>
          </div>
        </section>

        {/* Dashboard Examples Section */}
        <section className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8 border border-blue-800/30">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Dashboard Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="relative h-[200px] rounded-lg overflow-hidden shadow-lg border border-blue-800/30">
                <Image
                  src="/error-dashboard.png"
                  alt="Error Tracking Dashboard"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg text-white">
                Error Tracking Dashboard
              </h3>
              <p className="text-gray-300">
                Monitor JavaScript errors, network failures, and console errors
                with detailed stack traces and error context.
              </p>
            </div>
            <div className="space-y-4">
              <div className="relative h-[200px] rounded-lg overflow-hidden shadow-lg border border-blue-800/30">
                <Image
                  src="/performance-dashboard.png"
                  alt="Performance Dashboard"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg text-white">
                Performance Dashboard
              </h3>
              <p className="text-gray-300">
                Track page load times, resource timing, and user interaction
                performance metrics.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8 border border-blue-800/30">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Try it out!
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleIncrement}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors border border-blue-500/30"
              >
                Increment Counter ({counter})
              </button>
              <button
                onClick={handleError}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors border border-red-500/30"
              >
                Trigger Demo Error
              </button>
            </div>
            <p className="text-sm text-gray-400">
              Click the buttons above to generate events and errors that will be
              sent to Grafana Faro. Check your Grafana dashboard to see the data
              in real-time!
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-blue-800/30">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Benefits of Frontend Monitoring
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-900/50 rounded-lg border border-blue-800/30">
              <h3 className="font-semibold text-lg mb-2 text-white">
                Improved User Experience
              </h3>
              <p className="text-gray-300">
                Monitor real user interactions and identify pain points in your
                application.
              </p>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-lg border border-blue-800/30">
              <h3 className="font-semibold text-lg mb-2 text-white">
                Proactive Error Detection
              </h3>
              <p className="text-gray-300">
                Catch and fix issues before they impact a large number of users.
              </p>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-lg border border-blue-800/30">
              <h3 className="font-semibold text-lg mb-2 text-white">
                Performance Optimization
              </h3>
              <p className="text-gray-300">
                Track and improve application performance based on real user
                data.
              </p>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-lg border border-blue-800/30">
              <h3 className="font-semibold text-lg mb-2 text-white">
                Business Insights
              </h3>
              <p className="text-gray-300">
                Understand user behavior and make data-driven decisions.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
