import express from "express";

const app = express()
const PORT = 3004

function meuMiddleware(req, res, next) {
    console.log('passou pelo meu middleware');
    next()
}

function secretInfo(req, res, next) {
    req.secretInfo = 'Amanhã é domingo'
    next()
}

const blockRequest = (req, res, next) => {
    if(req.body.username === 'felipe') {
        return res.status(401).json({message: 'Sai fora!'})
    }
    next()
}

//middleware que permite POSTs com body json
app.use(express.json())
app.use(meuMiddleware)
app.use(blockRequest)
 
app.get('/', (req, res, next) => {
    console.log(req.secretInfo)
    return res.send('Example API')
})

app.post('/register', secretInfo, (req, res, next) => {
    const { username, email } = req.body
    console.log(req.secretInfo)
    return res.status(200).json({message: "user created"})
})

app.listen(PORT, () => console.log('Server listening on port ', PORT))