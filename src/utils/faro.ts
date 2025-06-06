import {
  EventAttributes,
  Faro,
  getWebInstrumentations,
} from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

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
          instrumentations: [
            ...getWebInstrumentations(),
            // Add the TracingInstrumentation
            new TracingInstrumentation(),
          ],
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

// New helper function to create a custom trace span
export const traceOperation = (name: string, fn: () => void) => {
  const otel = faro?.api?.getOTEL?.();
  if (otel) {
    const { trace } = otel;
    // You can name your tracer to distinguish it from others
    const tracer = trace.getTracer('custom-operations');
    tracer.startActiveSpan(name, (span) => {
      // Execute the function within the span
      fn();
      // End the span after the function has executed
      span.end();
    });
  } else {
    // If faro is not initialized, just run the function
    fn();
  }
};