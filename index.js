const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/book', require('./routes/book'))

app.listen(port, () => {
    console.log(`App listening on at http://localhost:${port}`)
})