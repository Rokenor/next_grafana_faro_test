import {
  EventAttributes,
  Faro,
  getWebInstrumentations,
} from "@grafana/faro-web-sdk";

let faro: Faro | null = null;

// Initialize Faro only on the client side
if (typeof window !== "undefined") {
  import("@grafana/faro-web-sdk").then(({ initializeFaro }) => {
    import("@grafana/faro-transport-otlp-http").then(
      ({ OtlpHttpTransport }) => {
        const baseUrl =
          process.env.NEXT_PUBLIC_FARO_URL || "http://localhost:4318";
        faro = initializeFaro({
          app: {
            name: "nextjs-monitoring-demo",
            version: "1.0.0",
          },
          instrumentations: getWebInstrumentations(),
          transports: [
            new OtlpHttpTransport({
              apiKey: process.env.NEXT_PUBLIC_FARO_API_KEY,
              logsURL: `${baseUrl}/v1/logs`,
              tracesURL: `${baseUrl}/v1/traces`,
            }),
          ],
        });
      }
    );
  });
}

// Helper function to log errors
export const logError = (error: Error, context?: Record<string, unknown>) => {
  if (faro) {
    faro.api.pushError(error, context);
  }
};

// Helper function to log custom events
export const logEvent = (name: string, attributes?: EventAttributes) => {
  if (faro) {
    faro.api.pushEvent(name, attributes);
  }
};
