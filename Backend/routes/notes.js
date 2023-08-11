
let express= require('express')
let router= express.Router();
let {body,validationResult}=require('express-validator');

const Notes=require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');

router.post('/addnote',fetchuser,
    (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.send({errors:errors.array()})
        }

        try {
            // let {title,description,tag,user}=req.body;

            let note= new Notes({
                user:req.user.id,
                title:req.body.title,
                description:req.body.description,
                tag :req.body.tag,
            })
            // console.log(note)

            note.save()
           return res.json(note);
            
        } catch (error) {
        res.status(400).json({error:error.message});
            
        }
});

router.get('/fetchnotes',fetchuser,async(req,res)=>{
    
    try {
        let notes=await Notes.find({user:req.user.id})
        return res.json(notes)
    } catch (error) {
        res.status(400).json({error:error.message});
        
    }
});
        // to delete a note request//
router.post('/deletenote',async(req,res)=>{
    
    try {
        let id=req.body.id;
        await Notes.findByIdAndDelete(id)
        // console.log(id)
        return res.json("Deleted Successfully")
    } catch (error) {
        res.status(400).json({error:error.message});
        
    }
});

    /// post request to update or edit a specific Note //

router.post('/updateNote',async(req,res)=>{
    try {
        let id=req.body.id;
        let {title,description,tag}=req.body
        let update=await Notes.findOneAndUpdate({_id:id},{title,description,tag})
        // console.log(update)
        if(update)
        return res.json("Updated Successfully")
        else
        return res.json("Not Find this Note!")

    } catch (error) {
        res.status(400).json({error:error.message});
        
    }
})

module.exports=router