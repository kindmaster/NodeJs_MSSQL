var Connection = require('tedious').Connection;  

    var config = {  
        server: 'db.vilac.co.kr',  //update me
        authentication: {
            type: 'default',
            options: {
                userName: 'edps', //update me
                password: 'vilac_^$$&!&!6447171'  //update me
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: false,
            port:7273,
            database: 'vilacdb_Test'  //update me
        }
    };  
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.
        console.log("Connected");  
       // executeStatement1();  
        executeStatement();  
    });
    
    connection.connect();

    

    var Request = require('tedious').Request;  
    var TYPES = require('tedious').TYPES;  

  
    function executeStatement() {  
        var request = new Request("SELECT id, name, price from test;", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        var result = "";  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                result+= column.value + " ";  
              }  
            });  
            console.log(result);  
            result ="";  
        });  
  
        request.on('done', function(rowCount, more) {  
        console.log(rowCount + ' rows returned');  
        });  
        
        // Close the connection after the final event emitted by the request, after the callback passes
        request.on("requestCompleted", function (rowCount, more) {
            connection.close();
        });
        connection.execSql(request);  
    }      


    function executeStatement1() {  
        var request = new Request(" Insert test (name,price) Values(@name,@price);", function(err) {  
         if (err) {  
            console.log(err);}  
        });  
        request.addParameter('name', TYPES.NVarChar,'Banana');  
        request.addParameter('price', TYPES.Int,5000);  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                console.log("Product id of inserted item is " + column.value);  
              }  
            });  
        });

        // Close the connection after the final event emitted by the request, after the callback passes
        request.on("requestCompleted", function (rowCount, more) {
            connection.close();
        });
        connection.execSql(request);  
    }      
    /*
    app.listen(8080, function () {
        console.log('listening on 8080')
    })
    
    app.get('/', (req, res) => {
        executeStatement();  
    })
    */
