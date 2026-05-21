# KonbiniSystema.01

A modern semi-automatic konbini (convenience store) cashier system with real-time inventory management, barcode scanning, and payment processing.

## Features

- **Point of Sale (POS)** - Fast and intuitive checkout interface
- **Barcode Scanning** - Quick product lookup and pricing
- **Inventory Management** - Real-time stock tracking
- **Transaction History** - Complete sales records and reporting
- **Payment Processing** - Multiple payment method support
- **Receipt Generation** - Print or digital receipts
- **Product Management** - Add, update, and manage store items

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL
- **Real-time**: WebSocket support
- **Payment**: Integration-ready architecture

## Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mamerdn/KonbiniSystema.01.git
cd KonbiniSystema.01

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Initialize database
npm run db:init

# Start the server
npm start
```

## Project Structure

```
KonbiniSystema.01/
├── server/          # Backend Express.js application
├── client/          # Frontend React application
├── database/        # Database schemas and migrations
├── docs/            # Documentation
└── config/          # Configuration files
```

## License

MIT

## Author

mamerdn
