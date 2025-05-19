"use client";

import { useState } from "react";
import { logError, logEvent } from "@/utils/faro";

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
    <main className="min-h-screen p-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Frontend Application Monitoring with Grafana Faro
        </h1>

        <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Real-time Monitoring Features
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Error tracking and reporting</li>
            <li>Performance monitoring</li>
            <li>User session tracking</li>
            <li>Custom event logging</li>
            <li>Resource usage metrics</li>
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Try it out!
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleIncrement}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Increment Counter ({counter})
              </button>
              <button
                onClick={handleError}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Trigger Demo Error
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Click the buttons above to generate events and errors that will be
              sent to Grafana Faro. Check your Grafana dashboard to see the data
              in real-time!
            </p>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Benefits of Frontend Monitoring
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">
                Improved User Experience
              </h3>
              <p className="text-gray-600">
                Monitor real user interactions and identify pain points in your
                application.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">
                Proactive Error Detection
              </h3>
              <p className="text-gray-600">
                Catch and fix issues before they impact a large number of users.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">
                Performance Optimization
              </h3>
              <p className="text-gray-600">
                Track and improve application performance based on real user
                data.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Business Insights</h3>
              <p className="text-gray-600">
                Understand user behavior and make data-driven decisions.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
