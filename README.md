# EcoTrackr - Base MiniApp

Track your carbon footprint, earn rewards, and carbon-offset guilt.

## Features

- **Automated Data Logging**: Connect data sources or use conversational AI to log transport, energy, and food consumption
- **Personalized Reduction Insights**: Get tailored recommendations and challenges based on your consumption patterns
- **Carbon Rewards Hub**: Earn tokens and badges for verified carbon reduction milestones
- **Community Impact**: Participate in challenges and view leaderboards for collective action

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- MiniKit (Base integration)
- OnchainKit (Coinbase components)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Add your OnchainKit API key from https://portal.cdp.coinbase.com/

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                 # Next.js App Router
├── components/          # Reusable UI components
├── lib/                # Utilities, types, and constants
└── public/             # Static assets
```

## Key Components

- **MetricCard**: Display carbon footprint metrics with trends
- **ActionBanner**: Show tips, challenges, and rewards
- **ChatAgentInterface**: Conversational data input
- **ProgressBar**: Track achievements and challenge progress

## Environment Variables

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Required for OnchainKit integration
- `NEXT_PUBLIC_BASE_RPC_URL`: Optional Base RPC endpoint

## Deployment

This app is designed to run as a Base MiniApp within the Base ecosystem. Follow the Base MiniApp deployment guidelines for production deployment.
