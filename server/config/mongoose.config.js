const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/CookBook', {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(( ) => {
    console.log('Connected to CookBook DB')
}).catch((err) => {
    console.log(err)
})