import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import fse from 'fs-extra'
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import UploadRoute from './Routes/UploadRoute.js'

// when the app first launches, make sure the public/uploaded-photos exists.
fse.ensureDirSync(path.join('public','images'));

// Routes



const app = express()

// to serve images for public
app.use(express.static('public'))
app.use('/images', express.static('images'))

// Middleware
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

dotenv.config()

mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(process.env.PORT, () => console.log(`Listening at ${process.env.PORT}..`)))
    .catch((err) => console.log(err))


// usage of routes
app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/post', PostRoute)
//app.use('/upload', UploadRoute)
app.use('/upload', UploadRoute)

