var mysql = require('mysql');
var express = require('express');
var app = express();

var TABLE = 'abc';

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mdb',
    password: 'Srushti@1175'
})

con.connect((err)=>{
    if (err){
        console.log(err);
        res.send("Error in connecting to DB");
    }
    console.log("Connected!");

    app.use(express.urlencoded({extended:true}));
    app.use(express.json());

    app.get('/',(req, res)=>{
        res.sendFile(__dirname + '/billing.html')
    });

    app.post('/',(req,res)=>{
        // console.log(req.body);

       
        var Sname = req.body.Sname;
        var Phnno = req.body.Phnno;
        var Od = req.body.Od;
        var Price = req.body.Price;
        var Famount = req.body.Famount;
        

        var sql = "insert into " +TABLE+ "(Sname,Phnno,Od,Price,Famount) values ('"+Sname+"',"+Phnno+",'"+Od+"',"+Price+","+Famount+");";
        con.query(sql,(err,result) =>{
            if(err){
                console.log(err);
                res.send("Error in saving");
            }
            else{
                console.log("Inserted Successfully");
                con.query("select * from " +TABLE, (err,result) => {
                    if(err){
                        console.log(err);       
                    }
                    res.send(result);                   
                })
            }
        })
    })
})
app.listen(3105,function(){ console.log("Server listening on port ",this.address().port)});