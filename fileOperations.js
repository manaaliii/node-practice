const port = 4040;


const fs = require('fs')

fs.open('fileText.txt', 'w',(err, file)=>{
    const content = Buffer.from('trying to be kind')
    try{
        fs.write(file, 'trying to be kind', 5,(err)=>{
            if(!err){
                console.log('added');

            }
        })
    }catch(e){
        console.log(e.message);
    }

    fs.close(file, (err)=>{
        if(!err){
            console.log('file closed');
        }
    });
})


// append content to file
fs.appendFile('file.txt', 'i m added ! ', (err)=>{
    if (err) {
        console.log(err)
    }
    console.log('saved')
})

fs.open('file.txt', 'w', (err)=>{
    if (err) {
        console.log(err)
    }
    console.log('opened')
})

// read file, throws error if file does not exist!
fs.readFile('file.txt', (err, data)=>{
    if (err) {
        console.log(err)
    }
    console.log(data.toString())
})

// overwrites file and create if does not exist!

fs.writeFile('file2.txt', 'I am file2.txt ! ', (err)=>{
    if (err) {
        console.log(err)
    }
    console.log('file is saved')
})

// delete file, throws error if file does not exist!
fs.unlink('file.txt', function (err) {
    if (err) throw err;
    console.log('File deleted!');
  });

// const app = http.createServer((req, res) => {
//     fs.readFile('hola.html', (err, data) => {
//         res.writeHead(200, {'Content-Type': 'text/html'})
//         res.write(data)
//         return res.end()
//     })
//
// }).listen(port)


// const url = require('url');
// const app = http.createServer((req, res)=>{
//     res.writeHead(200, {'Content-Type': 'text/html'})
//     let q = url.parse(req.url, true).query;
//     res.write(JSON.stringify(q))
//     res.end(typeof q);
// })
//
// app.listen(port);

// const app = http.createServer((req,res)=>{
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(req.url)
//     res.end()
// }).listen(port);

// const app = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write('<h1>Welcome</h1>');
//     res.end()
// }).listen(port);

// const my = require('./Lmao')

// const app = http.createServer((req, res) => {
//     // res.writeHead(200, {'Content-Type': 'text/plain'});
//     console.log(`http://localhost:${port}/`);
//     setTimeout(()=>{
//         res.write(`listening on ${port}`);
//         my.Fun1(res);
//         console.log(my.val)
//     }, 3000)
// })
//
// app.listen(port)
