# Next.js Frontend Monitoring Demo

This project demonstrates how to integrate Grafana Faro for frontend application monitoring in a Next.js 15 application. It includes real-time error tracking, performance monitoring, and custom event logging, with a complete observability stack using Docker.

## Features

- Real-time error tracking and reporting
- Performance monitoring
- User session tracking
- Custom event logging
- Resource usage metrics
- Interactive demo page with monitoring examples
- Complete observability stack with:
  - OpenTelemetry Collector for data collection
  - Loki for log aggregation
  - Grafana for visualization

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

### Loki

- Log aggregation system
- Stores and indexes logs
- Accessible at `http://localhost:3100`
- Configuration: `loki-config.yaml`

### Grafana

- Visualization platform
- Accessible at `http://localhost:3001`
- Default credentials:
  - Username: `admin`
  - Password: `admin`
- Pre-configured with Loki data source

## Testing the Monitoring

The demo page includes interactive elements to test the monitoring:

1. **Increment Counter**: Clicking this button will:

   - Increment a counter
   - Send a custom event to Grafana Faro
   - Log the event in Loki
   - Display the event in Grafana

2. **Trigger Demo Error**: Clicking this button will:
   - Generate a sample error
   - Send the error details to Grafana Faro
   - Log the error in Loki
   - Display the error in Grafana

## Grafana Dashboard Setup

1. Log in to Grafana at `http://localhost:3001`
2. Navigate to the Explore section
3. Select the Loki data source
4. Create queries to view:
   - Application logs
   - Error events
   - Custom events
   - Performance metrics

## Project Structure

```
├── src/
│   ├── app/
│   │   └── page.tsx          # Main landing page with monitoring demo
│   └── utils/
│       └── faro.ts           # Grafana Faro configuration and utilities
├── docker-compose.yml        # Docker services configuration
├── otel-collector-config.yaml # OpenTelemetry Collector configuration
├── loki-config.yaml         # Loki configuration
├── grafana/
│   └── provisioning/        # Grafana provisioning (data sources, etc.)
├── .env.local              # Environment configuration (create this file)
├── package.json
└── README.md
```

## Recent Changes

- Updated OpenTelemetry Collector configuration:
  - Added proper CORS support for browser requests
  - Configured endpoints to bind to all interfaces (0.0.0.0)
  - Added health check and zpages extensions
  - Improved logging configuration
- Added Docker Compose setup for complete observability stack
- Integrated Loki for log aggregation
- Pre-configured Grafana with Loki data source

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

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Grafana Faro Documentation](https://grafana.com/docs/faro/)
- [Grafana Faro Web SDK](https://grafana.com/docs/faro/latest/web-sdk/)
- [OpenTelemetry Collector Documentation](https://opentelemetry.io/docs/collector/)
- [Loki Documentation](https://grafana.com/docs/loki/latest/)
- [Grafana Documentation](https://grafana.com/docs/)
