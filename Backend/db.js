

const mongoose= require('mongoose');

let connectToMongo= ()=>{
    mongoose.connect('mongodb://localhost:27017/iNotebook')
} 

module.exports=connectToMongo;