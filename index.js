const connectToMongo = require("./config/db");
const app = require('express')();
const port = 8000

const bodyParser = require('express').json
app.use(bodyParser())
const userApi = require('./api/user')
const cors = require('cors');

connectToMongo();

// Sử dụng cors với cấu hình mặc định
app.use(cors());

app.use('/user', userApi)
app.listen(port, () => {
    console.log(`TRUY CẬP ĐẾN PORT ${port}`)
})
