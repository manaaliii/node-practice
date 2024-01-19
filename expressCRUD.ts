const express = require('express');
const app = express();
const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'mydb',
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

con.connect(err=>{
    if(err) throw err;
    console.log('Connected to MySQL server');
})

app.get('/', (req, res) => {
    const query = 'SELECT * FROM students';
    con.query(query, (err, result) => {
        if(err){
            res.send({message: err.message})
        }
        res.send({result});
    })
})

app.post('/', (req, res) => {
    const query = 'INSERT INTO students (name, class) VALUES (?, ?)';
    const values = [req.body.name, req.body.class];
    
    con.query(query, values,(err, result) => {
        if(err){
            res.send({message: err.message})
        }
        res.send({result});
    })
})

app.delete('/delete/:id', (req, res) => {
    const query = 'DELETE FROM students WHERE id = ?';
    const values = [req.params.id];
    con.query(query, values,(err, result) => {
        if(err){
            res.send({message: err.message})
        }
        res.send({result});
    })
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const values = [req.body.name, req.body.class,id]
    const query = 'UPDATE students set name = ?, class = ? WHERE id = ?';
    con.query(query, values,(err, result) => {
        if(err){
            res.send({message: err.message})
        }
        res.send({result})
    });
})


app.listen(3000);

app.on('close', () => {
    console.log('Server is shutting down');

    con.end(err => {
        if (err) {
            console.log(err.message);
        }
        console.log('MySQL connection closed');
        process.exit(0);
    });
});