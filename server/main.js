const express = require('express');
const app = express();


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.listen(8080, function () {
    console.log('listening on 8080')
})

// mssql 연동
var sql = require('mssql');
var config = {
    user:  "edps",
    password: "vilac_^$$&!&!6447171",
    server: "db.vilac.co.kr",
    database: "vilacdb_Test",
    port: 7273,
    options: {
        "enableArithAbort": true,
        "encrypt":false
    }
};

sql.connect(config, function(err){
    if(err){
        return console.error('error : ', err);
    }
    console.log('MSSQL 연결 완료')
})

app.get('/list', (req, res) => {
    var request = new sql.Request();
    request.stream = true;
    
    q = 'select cust_id, cust_nm, ceo_nm from tb_ml001 Where cust_id < 20';

    request.query(q, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
    });
    
    var result = [];
    request.on('error', function(err){
        console.log(err); 
    })
    .on('row', (row) => {
        result.push(row)
    })
    .on
    ('done', () => { // 마지막에 실행되는 부분
      //  console.log('result :', result)
      res.json(result);
     //   res.render('list.ejs',{'posts' : result})
    });
});

app.get('/write', function(req, res){
    res.sendFile(__dirname + '/write.html')
})

app.get('/test', function(req, res){
   console.log(req.query.title, req.query.date)
  
  // console.log(req.query.title);
});


// DB data 조회
app.get('/Select', function(req, res){
    const cust_id = req.query.cust_id;

    var request = new sql.Request();
    request.stream = true;
    
    q = `select cust_id, cust_nm, ceo_nm from tb_ml001 Where cust_id = ${cust_id}`;

    request.query(q, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
    });
    
    var result = [];
    request.on('error', function(err){
        console.log(err); 
    })
    .on('row', (row) => {
        result.push(row)
    })
    .on
    ('done', () => { // 마지막에 실행되는 부분
      //  console.log('result :', result)
      res.json(result);
     //   res.render('list.ejs',{'posts' : result})
    });   
   // console.log(req.query.title);
 });


 // DB data 조회
app.get('/Select1', function(req, res){
    const cust_id = req.query.cust_id;

    var request = new sql.Request();
    request.stream = true;
    
    q = `select cust_id, cust_nm, ceo_nm from tb_ml001 Where cust_id = ${cust_id}`;

    request.query(q, (err, recordset) => {
        if(err){
            return console.log('query error :',err)
        }
        res.send(recordset);
    });

 });

app.post('/ptest', function(req, res){
    console.log(req.body.title, req.body.date)
   // console.log(req.query.title);
 });