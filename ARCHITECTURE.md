# KonbiniSystema.01 Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      POS Client (React)                      │
│              - Cashier Interface                             │
│              - Barcode Scanning                              │
│              - Transaction Display                           │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/WebSocket
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  Express.js API Server                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Routes & Controllers                                │   │
│  │  - Auth Endpoints                                    │   │
│  │  - Product Management                               │   │
│  │  - Transaction Processing                           │   │
│  │  - Inventory Management                             │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Business Logic Layer                               │   │
│  │  - Price Calculation                                │   │
│  │  - Discount Processing                              │   │
│  │  - Receipt Generation                               │   │
│  │  - Payment Handling                                 │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                       │
│  - Users (Cashiers/Staff)                                   │
│  - Products & Inventory                                     │
│  - Transactions & Items                                     │
│  - Audit Logs                                               │
└─────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### 1. Frontend (React)
- **POS Interface**: Main cashier display
- **Barcode Scanner Integration**: Real-time product lookup
- **Cart Management**: Add/remove items, apply discounts
- **Payment Interface**: Multiple payment methods
- **Receipt Preview**: Before printing

### 2. Backend (Express.js)
- **Authentication**: JWT-based user sessions
- **Product Service**: Barcode lookup, pricing
- **Transaction Service**: Processing and recording sales
- **Inventory Service**: Real-time stock updates
- **Report Service**: Sales analytics and reporting

### 3. Database (PostgreSQL)
- **Users**: Cashier authentication and roles
- **Products**: Item master data with SKU/barcode
- **Transactions**: Sales records with timestamp
- **Transaction Items**: Line-by-line breakdown
- **Inventory Log**: Stock movements and history

## Key Features

### Real-time Inventory
- Automatic stock updates on each sale
- Low stock alerts
- Reorder level tracking

### Transaction Processing
1. User logs in
2. Scans/searches products
3. Items added to cart
4. Apply discounts/promotions
5. Select payment method
6. Complete transaction
7. Generate receipt

### Security
- Password hashing (bcrypt)
- JWT authentication
- Role-based access control
- Audit logging of all transactions

## Future Enhancements
- Payment gateway integration (Stripe, Square)
- Barcode generation
- Multi-store support
- Advanced analytics dashboard
- Mobile cashier app
- Cloud synchronization
