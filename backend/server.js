import express from "express";
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();
// npm run server para mag run
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use('/api/users', userRoutes)

app.get('/', (request, response) => response.send('Server is ready!'))

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server listening to port: ${port}`))