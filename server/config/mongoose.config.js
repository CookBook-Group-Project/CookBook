import mongoose from 'mongoose'

if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable is required')
}

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGO_URI)
.then(( ) => {
    console.log('Connected to CookBook DB')
}).catch((err) => {
    console.log(err)
})
