const express = require('express');

const parser = require('body-parser');
const app = express();


// middlewares 
app.use(parser.json());


// db connection
const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'test'
});

con.connect((err) => {
    if(!err){
        console.log('Connected');
    }else{
        console.log('Connection err: ' + JSON.stringify(err,undefined,2));
    }
})


// api
const port = 4000;
app.listen(port, function(){
    console.log('Express server is running at port', port)
})


// get all users
app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    con.query(sql, function( err, rows ){
        if(!err){
            res.send(rows)
        }else{
            res.send(err)
        }
    })
})

// get users by id 
app.get('/get/:id', (req, res) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    con.query(sql, [ req.params.id ] , function( err, rows ){
        if(!err){
            res.send(rows)
        }else{
            res.send(err)
        } 
    })
})

// delete users by id 
app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM users WHERE id = ?";
    con.query(sql, [ req.params.id ] , function( err, rows ){
        if(!err){
            res.send("DELETE success")
        }else{
            res.send(err)
        }
    })
})
// insert users
app.post('/create', (req, res) => {
    let emp = req.body;
    const sql = "INSERT INTO users(fname,lname) VALUES(?,?)";
    con.query(sql, [ emp.fname, emp.lname ] , function( err, rows ){
        if(!err){
            res.send("Insert success")
        }else{
            res.send(err)
        }
    })
})
// update users by id 
app.put('/update', (req, res) => {
    let emp = req.body;
    const sql = "UPDATE users SET fname=?, lname=? WHERE id=?";
    con.query(sql, [ emp.fname, emp.lname, emp.id ] , function( err, rows ){
        if(!err){
            res.send("Update success")
        }else{
            res.send(err)
        }
    })
})
