import express from 'express'   
import router from './routes/itemRoutes.js'

const app = express()
const port = 3000

app.use(express.json())
app.use('/', router)
app.listen(port, () => {
  console.log(`Aperte CTRL+C para parar o sevidor`)
})