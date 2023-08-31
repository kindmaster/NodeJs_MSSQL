const express = require('express')
const app = express()
const port = 3001
const mysql = require('mysql')

const db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '5632',
  database : 'gdb'
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/insert', (req, res) => {
  const sqlInsert = "insert into company (Name, Symbol) Values ('TigerMan','TIGER');"
  db.query(sqlInsert,(err,result)=>{
    res.send('입력완료')
  })  
})

app.get('/select', (req, res) => {
 // res.header("Access-Control-Allow-Origin", "*");
  const sqlInsert = "Select * From company;"
  db.query(sqlInsert,(err,result)=>{
    res.send(result);
  })  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})