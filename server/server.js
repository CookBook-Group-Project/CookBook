const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser')
require('dotenv').config()
require('./config/mongoose.config');

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


require('./routes/recipe.routes')(app);
require('./routes/user.routes')(app)


app.listen(PORT, ( ) => {
    console.log(`Server is up on port ${PORT}`)
})

