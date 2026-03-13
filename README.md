# Stock Management System API

Node.js + Express API for managing product inventory with MongoDB. The service provides CRUD endpoints for products and returns consistent JSON responses with pagination support.

## Project Overview

- Runtime: Node.js
- Framework: Express 5
- Database: MongoDB via Mongoose
- Validation: Joi
- Seed data: Inserts sample products at startup

## Installation

```bash
npm install
```

## Environment Configuration

Create a `.env` file at the project root:

```env
PORT=3000
CONNECTION_STRING=mongodb://localhost:27017/stock_management
```

- `PORT` (optional): HTTP port for the API (defaults to 3000)
- `CONNECTION_STRING` (optional): MongoDB connection string (defaults to local MongoDB)

## How To Run Locally

1. Start MongoDB (local or remote).
2. Run the API:

```bash
npm start
```

Server boot process:
- Loads environment variables
- Connects to MongoDB
- Registers the `Product` model
- Inserts seed data
- Mounts API routes under `/api/<route-file-name>`

## Folder Structure

```
src/
  controllers/   # Request handlers (business logic)
  data/          # Seed/initial data
  middlewares/   # Express middleware
  models/        # Mongoose schemas/models
  requests/      # Joi validation schemas
  resources/     # API response mappers
  routes/        # Express routers
  services/      # Services (e.g., DB connection)
  utils/         # Shared helpers
```

## API Endpoints

Base URL: `http://localhost:3000`

All routes below are mounted at `/api/product` because the route file is `src/routes/api/product.js`.

### Health Check

`GET /`

Response:
```json
"API is running..."
```

### List Products (search + pagination)

`GET /api/product`

Query params:
- `name` (optional): case-insensitive name search
- `page` (optional, default 1)
- `limit` (optional, default 10)

Example request:
```bash
curl "http://localhost:3000/api/product?name=cola&page=1&limit=5"
```

Example response:
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": {
    "items": [
      {
        "id": "65f0b7d9d5a89a0f7e5f1234",
        "name": "Coca Cola",
        "quantity": 10,
        "price_in": 50,
        "price_out": 120,
        "description": "This is coca cola",
        "image": "https://example.com/coke.png"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 5,
      "total_pages": 1
    }
  }
}
```

### Get Product By ID

`GET /api/product/:id`

Example:
```bash
curl "http://localhost:3000/api/product/65f0b7d9d5a89a0f7e5f1234"
```

Example response:
```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "id": "65f0b7d9d5a89a0f7e5f1234",
    "name": "Coca Cola",
    "quantity": 10,
    "price_in": 50,
    "price_out": 120,
    "description": "This is coca cola",
    "image": "https://example.com/coke.png"
  }
}
```

### Create Product

`POST /api/product`

Required body:
- `name` (string)
- `quantity` (number)
- `price_in` (number)
- `price_out` (number)
- `description` (string, optional)
- `image` (string, optional)

Example:
```bash
curl -X POST "http://localhost:3000/api/product" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fanta",
    "quantity": 20,
    "price_in": 40,
    "price_out": 100,
    "description": "This is Fanta orange",
    "image": "https://example.com/fanta.png"
  }'
```

Example response:
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "65f0b7d9d5a89a0f7e5f9999",
    "name": "Fanta",
    "quantity": 20,
    "price_in": 40,
    "price_out": 100,
    "description": "This is Fanta orange",
    "image": "https://example.com/fanta.png"
  }
}
```

### Update Product

`PUT /api/product/:id`

Example:
```bash
curl -X PUT "http://localhost:3000/api/product/65f0b7d9d5a89a0f7e5f9999" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fanta Updated",
    "quantity": 22,
    "price_in": 42,
    "price_out": 105,
    "description": "Updated description",
    "image": "https://example.com/fanta-updated.png"
  }'
```

Example response:
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": "65f0b7d9d5a89a0f7e5f9999",
    "name": "Fanta Updated",
    "quantity": 22,
    "price_in": 42,
    "price_out": 105,
    "description": "Updated description",
    "image": "https://example.com/fanta-updated.png"
  }
}
```

### Delete Product

`DELETE /api/product/:id`

Example:
```bash
curl -X DELETE "http://localhost:3000/api/product/65f0b7d9d5a89a0f7e5f9999"
```

Example response:
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": null
}
```

## Important Development Notes

- Seed data runs on every startup and can insert duplicate products if not cleared.
- Route validation middleware is registered after the controller in `src/routes/api/product.js`, so request validation does not run as expected.
- `ProductResource` maps `price_in` and `price_out` using `product.price` instead of `product.price_in` and `product.price_out`, which can produce incorrect values (often `null` or `NaN`) in responses.

