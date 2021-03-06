require('dotenv').config()
const express = require('express')
const app = express();
const db = require('./models')
// const bodyParser = require('body-parser')

db.sequelize.sync({ }); 

//Routes
const tweetRoute = require('./routes/tweet.routes')
const userRoute = require('./routes/user.routes')
const errorHandler = require('./utils/errorHandler')

//body parser
app.use(express.json())
app.use(express.urlencoded( {extended:false}))

// defining route
app.use('/tweet',tweetRoute)
app.use('/user',userRoute)
app.use(errorHandler)

app.use('/', (req, res) => {
    res.send({
        message: "Our apps is running smoothly"
    })
})

const PORT = process.env.APP_PORT || 4000
app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`)
})