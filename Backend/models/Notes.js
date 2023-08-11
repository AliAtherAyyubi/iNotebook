
let mongoose= require('mongoose')

let NotesSchema= mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    tag:String,
    Date:{
        type:Date,
        default:Date.now
    }
});

const note=mongoose.model('Note',NotesSchema);

module.exports= note;