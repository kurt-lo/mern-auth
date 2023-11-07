import path from 'path'
import express, { response } from "express";
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const port = process.env.PORT;

connectDB();

const app = express();
// npm run server para mag run
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use('/api/users', userRoutes)

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'frontend/dist')));

    app.get('*', (request, response) => response.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')))
} else {
    app.get('/', (request, response) => response.send('Server is ready!'))
}

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server listening to port: ${port}`))