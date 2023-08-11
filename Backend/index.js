const express= require('express');
const app=express();
let connectToMongo=require('./db')

connectToMongo();

        // using cors to fetch data ..//
var cors = require('cors') 
app.use(cors())
app.use(express.json());

        // mongodb connection ....//
const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/iNotebook')
        // API Calls //
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/',(req,res)=>{
    res.send('Hello its a iNotebook')
})


let port=5000
app.listen(port,()=>{
    console.log('Site has been started on port 5000')
})