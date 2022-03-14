var mysql = require('mysql');
var express = require('express');
var app = express();

var TABLE = 'ord';

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
        res.sendFile(__dirname + '/order.html')
    });

    app.post('/',(req,res)=>{
        // console.log(req.body);

       
        var Name = req.body.Name;
        var Tno = req.body.Tno;
        var Oditem = req.body.Oditem;
        var Quant = req.body.Quant;

        var sql = "insert into " +TABLE+ "(Name,Tno,Oditem,Quant) values ('"+Name+"',"+Tno+",'"+Oditem+"',"+Quant+");";
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
app.listen(1111,function(){ console.log("Server listening on port ",this.address().port)});