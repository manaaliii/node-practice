const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456'
})

con.connect((err)=>{
    if(err){
        console.log(err);
    }
    con.query('CREATE DATABASE IF NOT EXISTS mydb', (err, result)=>{
        if(err){
            console.log(err);

        }
        else
          console.log('Database created');
    });
})

// con.disconnect((err)=>{});