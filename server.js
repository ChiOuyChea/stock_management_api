require('dotenv').config()

const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const connectDB = require('./src/services/db')
const Product = require('./src/models/Product')
const insertData = require('./src/data/insertData')

const port = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())

connectDB()
Product()
insertData()

app.get('/', (req, res) => res.send('API is running...'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// Mount API routes explicitly
const apiDir = path.join(__dirname, 'src/routes', 'api');
fs.readdirSync(apiDir).forEach((file) => {
    if (file.endsWith('.js')) {
        const route = require(path.join(apiDir, file));
        // route files export a router; they define their own base paths
        app.use('/api/' + path.parse(file).name, route);
    }
});
