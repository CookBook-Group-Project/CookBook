const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;
const cookieParser = require('cookie-parser')
require('dotenv').config()
require('./config/mongoose.config');


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser())

app.use(cors({
    origin:'http://localhost:3000', credentials:true
})
);


require('./routes/recipe.routes')(app);
require('./routes/user.routes')(app)


app.listen(PORT, ( ) => {
    console.log(`Server is up on port ${PORT}`)
})