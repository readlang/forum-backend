const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const logger = require('./middlewares/logger')
const errorHandler = require('./middlewares/error')
const cookieParser = require('cookie-parser')
const fileupload = require('express-fileupload')
//const mongoSanitize = require('express-mongo-sanitize')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const hpp = require('hpp')
const xss = require('xss-clean')

// imports the various routes of the server
// const artist = require('./routes/artist')
const user = require('./routes/user')
const site = require('./routes/site')
const post = require('./routes/post')
const comment = require('./routes/comment')
const vote = require('./routes/vote')
const test = require('./routes/test')

const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: '*' // this is wildcard string, allowing any site
}))

// middleware to use for all routes go here:
app.use(cookieParser())
app.use(fileupload()) // allows grabbing data out of uploaded files
//app.use(mongoSanitize())
app.use(xss()) // sanitizes user input in post body, get queries, url params
app.use(hpp())
app.use(helmet({
    contentSecurityPolicy: false, //disables these features of helmet
    frameguard: false,
})) // sets various http headers for security including CORS and frames
app.use(logger)

// this is a pretty relaxed rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100 // max api calls in window
})
app.use(limiter)

// these are defining the routes
//app.use('/artist', artist)
app.use('/user', user)
app.use('/site', site)
app.use('/post', post)
app.use('/comment', comment)
app.use('/vote', vote)
app.use('/test', test)

const PORT = process.env.PORT || 5001

const server = app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
})

// the errorHandler must be below routes to catch errors
app.use(errorHandler)

process.on('unhandledRejection', (err, promise) => {
    console.log( `Source: 'server.js' file` )
    console.log( `Error: ${err.message}` ) 
    console.log( err.stack ) 
    server.close(() => process.exit(1)) // comment this line out to keep the server on
})
