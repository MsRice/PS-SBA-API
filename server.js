require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const PORT = process.env.PORT
const URI = process.env.MONGO_URI
const app = express()

app.use(express.json())

mongoose.connect(URI)
    .then(() => console.log('Yep youre connected to the MDB!'))
    .catch(error => console.error('Naw bro you got issues --->>>' ,error))



app.listen(PORT, () =>{
    console.log(`Server is live. Coffee is pending, and port is live @  http://localhost:${PORT} ....Probably`)
})

