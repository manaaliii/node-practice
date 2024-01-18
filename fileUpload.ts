


// FORMIDABLE

// const fs = require('fs');
// const formidable = require('formidable');
// const http = require('http');
// const path = require('path');
//
// const server = http.createServer((req, res) => {
//     if (req.method === 'POST' && req.url === '/uploads') {
//         const form = new formidable.IncomingForm();
//         const uploadDir = path.resolve(__dirname, 'uploads', 'images');
//
//         form.parse(req, (err, fields, files) => {
//             if (err) {
//                 res.writeHead(500, {'Content-Type': 'text/plain'});
//                 res.end('Internal Server Error');
//                 return;
//             }
//             const oldPath = files.file[0].filepath;
//             const newPath = path.join(uploadDir, files.file[0].originalFilename);
//             fs.rename(oldPath, newPath, (err) => {
//                 if (err) {
//                     res.writeHead(500, {'Content-Type': 'text/plain'});
//                     res.end('Error moving file');
//                 } else {
//                     res.writeHead(200, {'Content-Type': 'text/plain'});
//                     res.end('File uploaded successfully!');
//                 }
//             });
//         });
//
//     } else {
//         const htmlFile = path.join(__dirname, 'HTML', 'fileUpload.html');
//         fs.readFile(htmlFile, 'utf8', (err, data) => {
//             if (err) {
//                 console.log(err);
//                 res.writeHead(500, {'Content-Type': 'text/plain'});
//                 res.end('Internal Server Error');
//             } else {
//                 res.writeHead(200, {'Content-Type': 'text/html'});
//                 res.end(data);
//             }
//         })
//     }
// })




const http = require('http');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === 'image')
            cb(null, path.join(__dirname, 'uploads', 'images'));
        if(file.fieldname === 'resume')
            cb(null, path.join(__dirname, 'uploads', 'files'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'resume' && !file.originalname.match(/\.(pdf)$/)) {
        console.log('lmao dead')
        return cb(new Error('File must be a PDF'), false);
    } else if (file.fieldname === 'image' && !file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {

        return cb(new Error('File must be an image'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter});

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url == '/uploads') {
        upload.fields([{name:'image',maxCount:1},{name:'resume',maxCount:1}])(req, res, (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error uploading files !');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Files uploaded successfully!');
            }

        });
    } else {
        const htmlFile = path.join(__dirname, 'HTML', 'fileUpload.html');
        fs.readFile(htmlFile, 'utf8', (err, data) => {
            if (!err) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
