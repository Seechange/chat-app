
import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/messages.routes.js'
import userRoutes from './routes/user.routes.js'
import connectToMonggoDB from './db/connectToMongoDB.js'
import cookieParser from 'cookie-parser'
import { app, server } from './socket/socket.js'
const PORT = process.env.PORT || 5000

dotenv.config()

app.use(express.json())
app.use(cookieParser())

// thay vi viết dài v tách sang routes
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)



server.listen(PORT, () => {
    connectToMonggoDB()
    console.log(`Server is running on port ${PORT}`)
})