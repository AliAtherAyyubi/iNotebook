
let mongoose= require('mongoose')

let UserSchema= mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    mobile:{
        type:Number,
        default:'0000'
    },
    address:{
        type:String,
        default:"ABC"
    }
});

const user=mongoose.model('user',UserSchema);
// to avoid from duplicate values;
user.createIndexes();
module.exports= user;