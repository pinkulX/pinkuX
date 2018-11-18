var express = require("express");
var app     = express();
var mysql = require('mysql');
var path    = require("path");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "example1"
});

//con.connect(function(err) {
  //if (err) throw err;
  //console.log("Connected!");});

  app.get('/home',function(req,res,next){
    res.sendFile('form.html' , { root : __dirname});
});   
  app.post('/submit',function(req,res){
  
    var name=req.body.name;
    var email=req.body.email;
    var city=req.body.city;
    var pincode=req.body.pincode;
    res.write('You sent the name "' + req.body.name+'".\n');
    res.write('You sent the email "' + req.body.email+'".\n');
    res.write('You sent the city "' + req.body.city+'".\n');
    res.write('You sent the pincode "' + req.body.pincode+'".\n');
  
    con.connect(function(err) {
    if (err) throw err;
    var sql = "INSERT INTO users (name,email,city,pincode) VALUES ('"+name+"', '"+email+"','"+city+"','"+pincode+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
       res.end();
    });
    });
  })
  app.listen(3000);
console.log('Example app listening at port:3000');