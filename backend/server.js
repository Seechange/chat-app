
import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import connectToMonggoDB from './db/connectToMongoDB.js'
dotenv.config()
const PORT = process.env.PORT || 5000


const app = express()
// thay vi viết dài v tách sang routes
app.use('/api/auth', authRoutes)



app.listen(PORT, () => {
    connectToMonggoDB()
    console.log(`Server is running on port ${PORT}`)})