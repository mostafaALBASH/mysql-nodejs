var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var mysql = require('mysql');
var db = mysql.createConnection({
    host:'localhost',
    user:'mydb',
    password:'12345678',
    database:'mynodesqldb'
});

db.connect(function(err){
    if(err) throw err
    console.log('connected')
})

app.set('view engine', 'ejs')


app.get('/', function(req, res){
    res.render('index');
})



app.get('/addstudent', function(req, res){
    res.render('addstudent');
})

// POST /login gets urlencoded bodies

app.post('/addstudent', urlencodedParser, function (req, res) {
    console.log(req.body);
    db.query(`INSERT INTO students (f_name, l_name, math_grade, english_grade) VALUES ('${req.body.f_name}', '${req.body.l_name}', '${req.body.math_grade}', '${req.body.english_grade}')`,function(err, resaults){
        if(err) throw err
        db.query(`SELECT * FROM students`, function(err, resaults){
        if(err) throw err
        res.render('students', {students:resaults});
        
    })
    })
})


app.get('/students',function(req, res){
    
    db.query(`SELECT * FROM students`, function(err, resaults){
        if(err) throw err
        res.render('students', {students:resaults});
        
    })
})
app.listen('3000');
