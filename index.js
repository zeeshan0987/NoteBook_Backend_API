const connectDB = require("./db")
const express = require('express')
var cors = require('cors')

connectDB()
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())


// app.get('/', (req, res) => {
//     res.send('Hello World ')
// })
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Notebook app listening on port ${port}`)
})