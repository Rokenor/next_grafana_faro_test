"use client";

import { useState, useEffect } from "react";
import { logError, logEvent, traceOperation } from "@/utils/faro";

export default function Home() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // (Optional) Log a test error on mount (or on a timer) so that the “Errors” panel shows data.
    console.error("Test error (generated) – (via useEffect)");
  }, []);

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

  // New handler for sending a custom trace
  const handleCustomTrace = () => {
    traceOperation("simulate-user-task", () => {
      // This is the parent span
      logEvent("custom-trace-started");
      console.log("Starting custom trace for a user task.");

      // Simulate the first sub-task
      setTimeout(() => {
        traceOperation("sub-task:fetch-data", () => {
          console.log("Sub-task: Fetching data complete.");
        });
      }, 300);

      // Simulate the second sub-task
      setTimeout(() => {
        traceOperation("sub-task:process-data", () => {
          console.log("Sub-task: Processing data complete.");
        });
      }, 600);
    });
  };

  const handleTestError = () => {
    console.error("Test error (generated) – (via button click)");
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-blue-950">
      {/* ... (rest of your component code is unchanged) ... */}

      {/* Interactive Demo Section */}
      <section className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8 border border-blue-800/30">
        <h2 className="text-2xl font-semibold text-white mb-4">Try it out!</h2>
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
            {/* NEW BUTTON */}
            <button
              onClick={handleCustomTrace}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors border border-green-500/30"
            >
              Send Custom Trace
            </button>
            <button
              onClick={handleTestError}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors border border-yellow-500/30"
            >
              Generate Test Error (for “Errors” Panel)
            </button>
          </div>
          <p className="text-sm text-gray-400">
            Click the buttons above to generate events and errors that will be
            sent to Grafana Faro. Check your Grafana dashboard to see the data
            in real-time!
          </p>
        </div>
      </section>

      {/* ... (rest of your component code is unchanged) ... */}
    </main>
  );
}
