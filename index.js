const { connectToMongo } = require("./db/config/main");
const app = require('express')();
const port = 8000

const bodyParser = require('express').json
app.use(bodyParser())
const userApi = require('./api/user')
const songApi = require('./api/song')

const cors = require('cors');

connectToMongo();

app.use(cors());

app.use('/user', userApi)
app.use('/song', songApi)

app.listen(port, () => {
    console.log(`TRUY CẬP ĐẾN PORT ${port}`)
})
