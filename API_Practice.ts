const http = require('http');
const mysql = require('mysql');
const port = 3000;

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'mydb'
})

con.connect(err => {
    if (err) {
        console.log(err.message);
        return null;
    }
})

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        const query = 'SELECT * FROM students';
        con.query(query, (err, result) => {
            if (err) {
                console.log(err.message);
                return null;
            }
            res.statusCode= 200;
            res.end(JSON.stringify(result))
        })
    }
    if(req.url === '/' && req.method === 'POST') {
        let data = '';
        req.on('data', chunk=>{
            data += chunk
        })

        req.on('end', ()=>{
            try{
                const record = JSON.parse(data);
                const query = 'INSERT INTO students (name, class) VALUES (? , ?)'
                con.query(query, [record.name, record.class], (err, result) => {
                    if (err) {
                        res.end(JSON.stringify({message: err.message}))
                    }
                    res.end(JSON.stringify({message: 'Inserted Successfully'}))
                })
            }catch (err) {
                res.end(JSON.stringify({message: 'Invalid JSON data!'}))
            }
        })
    }
    if(req.url.startsWith('/delete') && req.method === 'DELETE'){
        const id = parseInt(req.url.split('/')[2]);
        const query = 'DELETE FROM students WHERE id=?';
        con.query(query, [id], (err, result) => {
            if (err) {
                res.end(JSON.stringify({message: err.message}))
            }
            if(result.affectedRows === 0){
                res.end(JSON.stringify({ message: 'Invalid ID or record not found' }));
            }
            res.end(JSON.stringify({message:'record deleted'}))
        })
    }

    if (req.url.startsWith('/update') && req.method === 'PUT') {
        let data = '';

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {

            try {
                const record = JSON.parse(data);

                const id = parseInt(req.url.split('/')[2]);
                const query = 'UPDATE students SET name=?, class=? WHERE id=?';
                con.query(query, [record.name, record.class, id], (err, result) => {
                    console.log(query);

                    if (err) {
                        res.end(JSON.stringify({ message: err.message }));
                        return;
                    }

                    if (result.affectedRows === 0) {
                        res.end(JSON.stringify({ message: 'Invalid ID or record not found' }));
                    } else {
                        res.end(JSON.stringify({ message: 'Record updated successfully' }));
                    }
                });
            } catch (err) {
                res.end(JSON.stringify({ message: 'Invalid JSON data!' }));
            }
        });
    }


})

server.listen(port)

server.on('close', () => {
    console.log('Server is shutting down');

    con.end(err => {
        if (err) {
            console.log(err.message);
        }
        console.log('MySQL connection closed');
        process.exit(0);
    });
});