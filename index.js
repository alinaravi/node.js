const express = require('express')
const app = express();
const movies = require('./routes/movies')
const home = require('./routes/home')

app.use('/api/movies', movies)
app.use('/', home)

//middleware
app.use(express.json())


//PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))


