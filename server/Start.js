const express = require('express')
const dotenv = require('dotenv')

const app = express();
const cors = require('cors');

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('?? Teaming up with NodeJS and SQL Server');
});

app.use('/api/employees', require('./api/employees'));


app.listen(process.env.PORT, () => {
    console.log(`Server started running on ${process.env.SQL_PORT} for ${process.env.NODE_ENV}`);
});