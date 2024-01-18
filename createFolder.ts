const fs = require('fs');

fs.mkdir('myFolder',(err)=>{
    if (err){
        console.log('Error creating', err.message)
    }else{
        console.log('Created')
    }
})

fs.mkdir('myFolderd/test', {recursive:true}, err=>{
    if (err){
        console.log('Error creating')
    }else{
        console.log('Created')
    }
})

