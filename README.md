# Next.js Frontend Monitoring Demo

This project demonstrates how to integrate Grafana Faro for frontend application monitoring in a Next.js 15 application. It includes real-time error tracking, performance monitoring, and custom event logging.

## Features

- Real-time error tracking and reporting
- Performance monitoring
- User session tracking
- Custom event logging
- Resource usage metrics
- Interactive demo page with monitoring examples

## Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Grafana instance with Faro configured

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:
   Create a `.env.local` file in the root directory with the following configuration:

```env
# Grafana Faro Configuration
NEXT_PUBLIC_FARO_URL=http://localhost:4318  # Replace with your Grafana Faro endpoint
NEXT_PUBLIC_FARO_API_KEY=your-api-key-here  # Replace with your API key if required
```

> **Note**: Make sure to replace the placeholder values with your actual Grafana Faro configuration. The `NEXT_PUBLIC_FARO_URL` should point to your Grafana Faro endpoint, and if your setup requires authentication, provide the appropriate API key in `NEXT_PUBLIC_FARO_API_KEY`.

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Testing the Monitoring

The demo page includes interactive elements to test the monitoring:

1. **Increment Counter**: Clicking this button will:

   - Increment a counter
   - Send a custom event to Grafana Faro with the new counter value
   - You can track these events in your Grafana dashboard

2. **Trigger Demo Error**: Clicking this button will:
   - Generate a sample error
   - Send the error details to Grafana Faro
   - You can view the error in your Grafana error tracking dashboard

## Grafana Dashboard Setup

To view the monitoring data:

1. Log in to your Grafana instance
2. Navigate to the Faro dashboard
3. Configure the following panels:
   - Error tracking panel to view application errors
   - Custom events panel to view button clicks and other events
   - Performance metrics panel to view application performance data

## Project Structure

```
├── src/
│   ├── app/
│   │   └── page.tsx          # Main landing page with monitoring demo
│   └── utils/
│       └── faro.ts           # Grafana Faro configuration and utilities
├── .env.local                # Environment configuration (create this file)
├── package.json
└── README.md
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Grafana Faro Documentation](https://grafana.com/docs/faro/)
- [Grafana Faro Web SDK](https://grafana.com/docs/faro/latest/web-sdk/)
