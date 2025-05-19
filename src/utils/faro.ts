import { initializeFaro, EventAttributes } from "@grafana/faro-web-sdk";
import { OtlpHttpTransport } from "@grafana/faro-transport-otlp-http";

// Initialize Faro with OTLP HTTP transport
export const faro = initializeFaro({
  url: process.env.NEXT_PUBLIC_FARO_URL || "http://localhost:4318", // Default to localhost if not configured
  app: {
    name: "nextjs-monitoring-demo",
    version: "1.0.0",
  },
  transports: [
    new OtlpHttpTransport({
      // You can configure additional transport options here
      apiKey: process.env.NEXT_PUBLIC_FARO_API_KEY, // Optional: Add your API key if required
    }),
  ],
});

// Helper function to log errors
export const logError = (error: Error, context?: Record<string, unknown>) => {
  faro.api.pushError(error, context);
};

// Helper function to log custom events
export const logEvent = (name: string, attributes?: EventAttributes) => {
  faro.api.pushEvent(name, attributes);
};
