import express from 'express';
import cors from 'cors';
import Helper from './src/helper/helper';
import { SOCKET_IO } from './server';

const app = express()

app.use(cors())
app.use(express.json())

app.post('/execute', async (req, res) => {
    try {
        let params = req.body
        let { text, from } = params

        const data = await Helper.handleExecute({ data: text, ip: req.ip?.toString() })
        if (data) {
            SOCKET_IO.emit('ex-response', { socket_id: from, data })
        }

        return res.status(200).send({
            status: 200,
            msg: "success"
        })
    } catch (error) {
        return res.status(500).send({
            status: 500,
            msg: "Internal Server Error"
        })
    }
})

export default app