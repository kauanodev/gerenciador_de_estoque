import express from 'express'   
import router from './routes/publicRoutes.js'
const app = express()
const port = 3000

app.use(express.json())
app.use('/cadastro', router)
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Aperte CTRL+C para parar o sevidor`)
})