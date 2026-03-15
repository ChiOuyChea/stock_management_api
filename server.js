require('dotenv').config()

const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const connectDB = require('./src/services/db')
// ❌ Remove: const Product = require('./src/models/Product') ← Not needed here

const port = process.env.PORT || 3000
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to Database
connectDB()
// ✅ Removed: Product() ← This was causing the crash!

// Root route
app.get('/', (req, res) => res.send('API is running...'))

// ✅ Mount API routes BEFORE app.listen()
const apiDir = path.join(__dirname, 'src/routes', 'api')
fs.readdirSync(apiDir).forEach((file) => {
    if (file.endsWith('.js')) {
        const route = require(path.join(apiDir, file))
        // Routes like product.js should define paths like GET /, POST /, etc.
        // So mounting at /api/product will create: /api/product, /api/product/:id
        app.use('/api/' + path.parse(file).name, route)
    }
})

// ✅ Start server AFTER all routes are registered
app.listen(port, () => {
    console.log(`\n Server running on http://localhost:${port}`)
    console.log(` API Endpoint: http://localhost:${port}/api/product\n`)
})