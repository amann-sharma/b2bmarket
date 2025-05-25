# B2B Marketplace

A modern B2B marketplace built with Next.js 14, MongoDB, and Tailwind CSS. This application provides a flexible data model for product listings with faceted search capabilities.

## Features

- 🚀 Next.js 14 with App Router
- 🔍 Full-text search with faceted filtering
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- 🔄 Real-time search updates
- 🗃️ MongoDB with Mongoose
- 📊 Sample data with 30+ listings across 2 categories

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS
- **Development**: TypeScript

## Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

## MongoDB Setup

### Option 1: Local MongoDB Installation

1. Install MongoDB Community Edition:
   - **macOS** (using Homebrew):
     ```bash
     brew tap mongodb/brew
     brew install mongodb-community
     ```
   - **Windows**: Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - **Linux** (Ubuntu):
     ```bash
     sudo apt-get update
     sudo apt-get install mongodb
     ```

2. Start MongoDB service:
   - **macOS**:
     ```bash
     brew services start mongodb-community
     ```
   - **Windows**: MongoDB runs as a service automatically
   - **Linux**:
     ```bash
     sudo systemctl start mongodb
     ```

3. Verify installation:
   ```bash
   mongosh
   ```

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier is sufficient)
3. Set up database access:
   - Create a database user with password
   - Add your IP address to the IP whitelist
4. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

### Connection String Format

For local MongoDB:
```
MONGODB_URI=mongodb://localhost:27017/b2bmarket
```

For MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/b2bmarket?retryWrites=true&w=majority
```

Replace `<username>`, `<password>`, and `<cluster>` with your actual MongoDB Atlas credentials.

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/amansharma/b2bmarket.git
cd b2bmarket
```

2. Set up git configuration (if not already done):
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

3. Install dependencies:
```bash
npm install
```

4. Create a `.env.local` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
```

5. Seed the database with sample data:
```bash
npm run seed
```

6. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000/search`

## Project Structure

```
b2bmarket/
├── app/
│   ├── api/
│   │   └── search/
│   │       └── route.ts
│   │   
│   ├── search/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── db.ts
│   └── models.ts
├── scripts/
│   └── seed.ts
├── public/
├── .env.local
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## API Documentation

### Search API

**Endpoint**: `GET /api/search`

Query parameters:
- `q`: Search query (optional)
- `category`: Category slug (optional)
- `minPrice`: Minimum price (optional)
- `maxPrice`: Maximum price (optional)
- `attributes`: JSON string of attribute filters (optional)

Example request:
```
GET /api/search?q=4k&category=electronics&minPrice=500&maxPrice=1000
```

Response:
```json
{
  "results": [
    {
      "title": "Bulk Samsung 4K TVs",
      "description": "New Samsung 55\" 4K Smart TVs...",
      "price": 499.99,
      "location": "New York, NY",
      "attributes": {
        "brand": "Samsung",
        "condition": "New",
        "warranty": "2 years",
        "model": "QN55Q80B",
        "screenSize": "55\"",
        "resolution": "4K UHD"
      }
    }
  ],
  "facets": {
    "brand": ["Samsung", "LG", "Sony"],
    "condition": ["New", "Refurbished"],
    "price": {
      "min": 499.99,
      "max": 2499.99
    }
  }
}
```

## Data Model

### Category Schema
```typescript
{
  name: string;
  slug: string;
  attributeSchema: Map<string, string>;
}
```

### Listing Schema
```typescript
{
  title: string;
  description: string;
  price: number;
  location: string;
  categoryId: ObjectId;
  attributes: Map<string, string | number>;
  createdAt: Date;
  updatedAt: Date;
}
```

## Sample Data

The seed script includes 30+ listings across two categories:

### Electronics (15 listings)
- TVs (3)
- Computers (3)
- Monitors (2)
- Networking (2)
- Printers (2)
- Audio (2)
- Security (1)

### Fashion (15 listings)
- Sneakers (3)
- Business Shoes (2)
- Casual Shoes (2)
- Boots (2)
- Athletic Shoes (2)
- Sandals (2)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the flexible database
- Tailwind CSS for the utility-first CSS framework