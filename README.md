# RedOps Threat Intelligence Platform

A modern cybersecurity platform for threat analysis and intelligence gathering.

## Features

- File scanning and analysis
- URL threat detection
- Hash lookups
- Network trace visualization
- Encryption and decryption tools

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yesh00008/redops-threat-frontend.git
cd redops-threat-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Configuration

Create a `.env` file in the root directory with the following content:

```
VITE_API_URL=http://localhost:5000/api
```

For production, create a `.env.production` file:

```
VITE_API_URL=https://redops-threat-backend.onrender.com/api
```

## Backend API

The backend API is available at: https://github.com/yesh00008/redops-threat-backend

## Deployment

This frontend is deployed on Netlify: https://redops-threat.netlify.app/