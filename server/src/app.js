import express from 'express'
import cors from 'cors'
import authRouter from './modules/auth/auth.routes.js'

const app = express()

app.use(cors())
app.use(express.json())


app.get('/api/health',(req, res)=>{
    res.json({status: 'ok'})
})

app.use('/auth', authRouter);

export default app