import express from 'express'
import { initAPIs } from './routes/api.js'

const app = express()


app.use(express.urlencoded({extended: true}))
app.use(express.json())


initAPIs(app)


const port = 8017
app.listen(port, () => {
  console.log(`I'm running at localhost:${port}/`)
}) 
