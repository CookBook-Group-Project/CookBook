import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import './config/mongoose.config.js'
import recipeRoutes from './routes/recipe.routes.js'
import userRoutes from './routes/user.routes.js'

const app = express()

const PORT = process.env.PORT || 8000

if (!process.env.CORS_ORIGINS) {
    throw new Error('CORS_ORIGINS environment variable is required (comma-separated list of allowed origins)')
}
const allowedOrigins = process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser())

app.use(cors({
    origin: allowedOrigins, credentials:true
})
);


recipeRoutes(app);
userRoutes(app)


app.listen(PORT, ( ) => {
    console.log(`Server is up on port ${PORT}`)
})
