require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(
    express.urlencoded({
        extended: true, 
    }),
)

app.use(express.json())

const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.neuzbqc.mongodb.net/`)
.then(() => {
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
})
.catch((err) => console.log(err))
