# Stock Management System API

Node.js + Express API for managing product inventory with MongoDB. The service provides CRUD endpoints for products, search + pagination, and consistent JSON responses.

**Project Overview**
- Purpose: Manage product inventory (create, read, update, delete).
- Main features: Product CRUD, search by name, pagination, seed data insertion on startup, standardized API responses.

**Technology Stack**
- Runtime: Node.js
- Framework: Express 5
- Database: MongoDB
- ODM: Mongoose
- Validation: Joi
- Config: dotenv
- Middleware: cors

**Installation**
1. Clone the repository:
```bash
git clone <repo-url>
cd stock_management_sytem_api
```
2. Install dependencies:
```bash
npm install
```

**Environment Configuration**
Create a `.env` file at the project root:
```env
PORT=3000
CONNECTION_STRING=mongodb://localhost:27017/stock_management
DB_NAME=stock_management
```
- `PORT` (optional): HTTP port for the API (defaults to `3000`).
- `CONNECTION_STRING` (optional): MongoDB connection string (defaults to `mongodb://localhost:27017/stock_management`).
- `DB_NAME` (optional): Present in `.env` but currently unused by the code.

**Project Structure**
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
  utils/         # Shared helpers (empty currently)
```

**API Documentation**
Base URL: `http://localhost:3000`

All routes below are mounted at `/api/product` because the route file is `src/routes/api/product.js` and the server mounts route files as `/api/<file-name>`.

**1) Health Check**
- Endpoint: `/`
- Method: `GET`
- Description: Simple health check
- Request parameters: None
- Request body: None
- Success response:
```json
"API is running..."
```
- Error responses: None

**2) List Products (search + pagination)**
- Endpoint: `/api/product`
- Method: `GET`
- Description: Returns a list of products with optional name search and pagination
- Request parameters:
  - `name` (optional, query): case-insensitive search by product name
  - `page` (optional, query, default `1`)
  - `limit` (optional, query, default `10`)
- Request body: None
- Example request:
```bash
curl "http://localhost:3000/api/product?name=cola&page=1&limit=5"
```
- Success response:
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
- Error responses:
  - `500` Internal server error

**3) Get Product By ID**
- Endpoint: `/api/product/:id`
- Method: `GET`
- Description: Returns a single product by MongoDB ObjectId
- Request parameters:
  - `id` (required, path): product ObjectId
- Request body: None
- Example request:
```bash
curl "http://localhost:3000/api/product/65f0b7d9d5a89a0f7e5f1234"
```
- Success response:
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
- Error responses:
  - `400` Invalid product ID
  - `404` Product not found
  - `500` Internal server error

**4) Create Product**
- Endpoint: `/api/product`
- Method: `POST`
- Description: Creates a new product
- Request parameters: None
- Request body example:
```json
{
  "name": "Fanta",
  "quantity": 20,
  "price_in": 40,
  "price_out": 100,
  "description": "This is Fanta orange",
  "image": "https://example.com/fanta.png"
}
```
- Success response:
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
- Error responses:
  - `422` Validation failed
  - `500` Internal server error

**5) Update Product**
- Endpoint: `/api/product/:id`
- Method: `PUT`
- Description: Updates an existing product
- Request parameters:
  - `id` (required, path): product ObjectId
- Request body example:
```json
{
  "name": "Fanta Updated",
  "quantity": 22,
  "price_in": 42,
  "price_out": 105,
  "description": "Updated description",
  "image": "https://example.com/fanta-updated.png"
}
```
- Success response:
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
- Error responses:
  - `400` Invalid product ID
  - `404` Product not found
  - `422` Validation failed
  - `500` Internal server error

**6) Delete Product**
- Endpoint: `/api/product/:id`
- Method: `DELETE`
- Description: Deletes a product by ID
- Request parameters:
  - `id` (required, path): product ObjectId
- Request body: None
- Example request:
```bash
curl -X DELETE "http://localhost:3000/api/product/65f0b7d9d5a89a0f7e5f9999"
```
- Success response:
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": null
}
```
- Error responses:
  - `400` Invalid product ID
  - `404` Product not found
  - `500` Internal server error

**Running the Project**
- Development mode:
```bash
npm start
```
- Production mode:
```bash
npm start
```
There is no separate dev script (e.g., `nodemon`) in `package.json`.

**Best Practices and Notes**
- The validation middleware writes sanitized data to `req.validated`, but controllers currently read from `req.body`.
