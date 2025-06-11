"use client";

import { useState, useEffect } from "react";
import { logError, logEvent, traceOperation } from "@/utils/faro";
import Image from "next/image";

export default function Home() {
  const [counter, setCounter] = useState(0);
  const [showClsContent, setShowClsContent] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize CLS test section
    try {
      // Any initialization logic can go here
      logEvent("cls_test_section_initialized", {
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to initialize CLS test section"
      );
      logError(err as Error, { source: "cls_test_initialization" });
    }
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

  const handleToggleClsContent = () => {
    try {
      setShowClsContent((prev) => !prev);
      setImageLoaded(false);
      logEvent("cls_content_toggled", {
        action: showClsContent ? "hide" : "show",
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to toggle CLS content"
      );
      logError(err as Error, { source: "cls_content_toggle" });
    }
  };

  const handleImageLoad = () => {
    try {
      setImageLoaded(true);
      logEvent("cls_test_image_loaded", {
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to handle image load"
      );
      logError(err as Error, { source: "cls_image_load" });
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-blue-950">
      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-900/50 border border-red-500 rounded-lg">
          <p className="text-red-200">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-sm text-red-300 hover:text-red-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* CLS Test Section */}
      <section className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8 border border-blue-800/30">
        <h2 className="text-2xl font-semibold text-white mb-4">
          CLS Test Section
        </h2>
        <div className="space-y-4">
          <button
            onClick={handleToggleClsContent}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors border border-purple-500/30"
          >
            {showClsContent ? "Hide CLS Content" : "Show CLS Content"}
          </button>

          {showClsContent && (
            <div className="mt-4 space-y-4">
              {/* Placeholder that will cause layout shift when image loads */}
              <div
                className={`transition-all duration-300 ${
                  imageLoaded ? "h-auto" : "h-48 bg-gray-700 animate-pulse"
                }`}
              >
                {showClsContent && (
                  <Image
                    src="https://picsum.photos/800/400"
                    alt="Random image that will cause CLS"
                    width={800}
                    height={400}
                    className="rounded-lg"
                    onLoad={handleImageLoad}
                    onError={(e) => {
                      setError("Failed to load CLS test image");
                      logError(new Error("Image load failed"), {
                        source: "cls_image_load",
                      });
                    }}
                  />
                )}
              </div>

              {/* Dynamic text content that will cause layout shift */}
              <div className="space-y-2">
                <p className="text-white">
                  This is some initial text that will be pushed down when more
                  content appears.
                </p>
                {imageLoaded && (
                  <>
                    <p className="text-gray-300">
                      Additional text that appears after image loads, causing
                      layout shift.
                    </p>
                    <p className="text-gray-300">
                      More text content that will push the layout further down.
                    </p>
                    <div className="h-20 bg-blue-900/30 rounded-lg animate-pulse"></div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

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
              Generate Test Error (for "Errors" Panel)
            </button>
          </div>
          <p className="text-sm text-gray-400">
            Click the buttons above to generate events and errors that will be
            sent to Grafana Faro. Check your Grafana dashboard to see the data
            in real-time!
          </p>
        </div>
      </section>
    </main>
  );
}
