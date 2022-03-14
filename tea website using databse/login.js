
var mysql = require('mysql');
var express = require('express');
var app = express();
//var express = require('express');
//var app = express();
//cors = require('cors');
//const app = express();
//app.use(cors());
var TABLE = 'log';

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mdb',
    password: 'Srushti@1175'
})
/*
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
}

app.use(allowCrossDomain);

app.options('*', cors()); */
con.connect((err)=>{
    if (err){
        console.log(err);
        res.send("Error in connecting to DB");
    }
    console.log("Connected!");

    app.use(express.urlencoded({extended:true}));
    app.use(express.json());

    app.get('/',(req, res)=>{
        res.sendFile(__dirname + '/login.html')
    });

    app.post('/',(req,res)=>{
        // console.log(req.body);

       
        var Fname = req.body.Fname;
        var Lname = req.body.Lname;
        var Addr = req.body.Addr;
        var Cno = req.body.Cno;
        var Eid = req.body.Eid;
        var Tno = req.body.Tno;
        

        var sql = "insert into " +TABLE+ "(Fname,Lname,Addr,Cno,Eid,Tno) values ('"+Fname+"','"+Lname+"','"+Addr+"',"+Cno+",'"+Eid+"',"+Tno+");";
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
app.listen(8080,function(){ console.log("Server listening on port ",this.address().port)});