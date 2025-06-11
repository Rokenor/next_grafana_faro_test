# Next.js Frontend Monitoring Demo

This project demonstrates how to integrate Grafana Faro for frontend application monitoring in a Next.js 15 application. It includes real-time error tracking, performance monitoring, and custom event logging, with a complete observability stack using Docker.

## Features

- Real-time error tracking and reporting
- Performance monitoring with Web Vitals metrics:
  - LCP (Largest Contentful Paint)
  - FID (First Input Delay)
  - CLS (Cumulative Layout Shift)
  - FCP (First Contentful Paint)
- User session tracking
- Custom event logging
- Resource usage metrics
- Interactive demo page with monitoring examples
- Complete observability stack with:
  - OpenTelemetry Collector for data collection
  - Loki for log aggregation
  - Grafana for visualization

## Recent Updates

### Dashboard Improvements

- Updated Web Vitals panels to use `avg_over_time` with `unwrap` for more accurate metrics
- Improved query structure for all Web Vitals measurements:
  ```logql
  avg_over_time({exporter="OTLP", job="nextjs-monitoring-demo"} |
    json |
    __error__="" |
    attributes_measurement_type="web-vitals" |
    attributes_measurement_name="[metric]" |
    attributes_measurement_value >= 0 |
    unwrap attributes_measurement_value
    [$__auto])
  ```
- Added proper error handling and logging for CLS testing
- Configured Next.js image optimization for external images (picsum.photos)

### CLS Testing

Added a dedicated CLS test section that:

- Dynamically loads images to provoke layout shifts
- Includes placeholder content that changes on image load
- Provides real-time CLS measurements
- Logs CLS-related events and errors

### Configuration Updates

- Added Next.js image domain configuration for external images
- Updated OpenTelemetry Collector configuration for Web Vitals
- Improved error handling and logging in the frontend application

## Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Docker and Docker Compose
- Git

## Getting Started

1. Clone the repository:

```bash
git clone <your-repo-url>
cd next_grafana_faro_test
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following configuration:

```env
# Grafana Faro Configuration
NEXT_PUBLIC_FARO_URL=http://localhost:4318  # OpenTelemetry Collector HTTP endpoint
NEXT_PUBLIC_FARO_API_KEY=your-api-key-here  # Optional: Replace with your API key if required
```

4. Start the monitoring stack:

```bash
docker compose up -d
```

This will start:

- OpenTelemetry Collector (port 4318 for HTTP, 4317 for gRPC)
- Loki (port 3100)
- Grafana (port 3001)

5. Start the Next.js development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Monitoring Stack Architecture

### OpenTelemetry Collector

- Receives telemetry data from the frontend application
- Processes and exports logs to Loki
- Runs on port 4318 (HTTP) and 4317 (gRPC)
- Configuration: `otel-collector-config.yaml`
- Web Vitals processing:
  ```yaml
  transform:
    trace_statements:
      - context: span
        statements:
          - set(attributes["measurement.type"], "web-vitals")
          - set(attributes["measurement.name"], attributes["name"])
          - set(attributes["measurement.value"], attributes["value"])
          - set(attributes["measurement.rating"], attributes["rating"])
  ```

### Loki

- Log aggregation system
- Stores and indexes logs
- Accessible at `http://localhost:3100`
- Configuration: `loki-config.yaml`
- Web Vitals query structure:
  - Uses `avg_over_time` for stable metrics
  - Proper value extraction with `unwrap`
  - Automatic interval selection with `[$__auto]`

### Grafana

- Visualization platform
- Accessible at `http://localhost:3001`
- Default credentials:
  - Username: `admin`
  - Password: `admin`
- Pre-configured with Loki data source
- Custom dashboard for Next.js monitoring
- Web Vitals panels with thresholds:
  - LCP: green < 2500ms, yellow 2500-4000ms, red > 4000ms
  - FID: green < 100ms, yellow 100-300ms, red > 300ms
  - CLS: green < 0.1, yellow 0.1-0.25, red > 0.25
  - FCP: green < 1800ms, yellow 1800-3000ms, red > 3000ms

## Grafana Dashboard Setup

1. Log in to Grafana at `http://localhost:3001`
2. Navigate to Dashboards
3. Open the "Faro Dashboard" which includes:
   - Service Activity panel (full width)
   - Logs & Events (Timeline) panel showing log frequency over time
   - Errors (Timeline) panel with error frequency visualization
   - Logs & Events table panel with detailed log entries
   - Errors table panel showing error logs
   - Web Vitals panels for performance metrics
4. Each panel includes data links to open detailed queries in Loki

## Project Structure

```
├── src/
│   ├── app/
│   │   └── page.tsx          # Main landing page with monitoring demo and test error generation
│   └── utils/
│       └── faro.ts           # Grafana Faro configuration and utilities
├── docker-compose.yml        # Docker services configuration
├── otel-collector-config.yaml # OpenTelemetry Collector configuration
├── loki-config.yaml         # Loki configuration
├── grafana/
│   └── provisioning/        # Grafana provisioning (data sources, dashboards)
│       └── dashboards/
│           └── faro-dashboard.json # Pre-configured Grafana dashboard
├── .env.local              # Environment configuration (create this file)
├── package.json
└── README.md
```

## Testing the Monitoring

The demo page includes interactive elements to test the monitoring:

1. **Increment Counter**: Clicking this button will:

   - Increment a counter
   - Send a custom event to Grafana Faro
   - Log the event in Loki
   - Display the event in Grafana

2. **Trigger Test Error**: Clicking this button will:

   - Generate a test error
   - Send the error details to Grafana Faro
   - Log the error in Loki
   - Display the error in both timeline and table panels

3. **Automatic Error Generation**:
   - A test error is automatically generated when the page loads
   - This helps verify the monitoring setup is working correctly

## Testing Web Vitals

### CLS Testing

1. Navigate to the CLS test section
2. Click "Show CLS Content" to load dynamic content
3. Watch the layout shifts as images load
4. Monitor CLS values in the Grafana dashboard

### Other Web Vitals

- LCP: Monitored automatically on page load
- FID: Tested through button interactions
- FCP: Measured during initial page render

## Troubleshooting

### Common Issues

1. **"window is not defined" error**

   - This is normal during server-side rendering
   - Faro is configured to initialize only on the client side

2. **Connection refused to OpenTelemetry Collector**

   - Ensure Docker containers are running: `docker compose ps`
   - Check collector logs: `docker logs otel-collector`
   - Verify the collector is listening on port 4318

3. **No logs in Grafana**

   - Verify Loki is running: `docker logs loki`
   - Check if logs are reaching the collector
   - Ensure the Loki data source is configured in Grafana

4. **No Web Vitals Data**

   - Check browser console for Faro initialization
   - Verify OpenTelemetry Collector is receiving data
   - Ensure proper query structure in Grafana panels

5. **High CLS Values**

   - Review dynamic content loading
   - Check image dimensions and loading strategy
   - Monitor layout shifts in browser DevTools

6. **Dashboard Issues**

   - Verify Loki data source connection
   - Check query syntax in panel configurations
   - Ensure proper time range selection

7. **Image Loading Errors**
   - Verify Next.js image configuration
   - Check allowed domains in `next.config.ts`
   - Monitor network requests in browser DevTools

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Grafana Faro Documentation](https://grafana.com/docs/faro/)
- [Grafana Faro Web SDK](https://grafana.com/docs/faro/latest/web-sdk/)
- [OpenTelemetry Collector Documentation](https://opentelemetry.io/docs/collector/)
- [Loki Documentation](https://grafana.com/docs/loki/latest/)
- [Grafana Documentation](https://grafana.com/docs/)
