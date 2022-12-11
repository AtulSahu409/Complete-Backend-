const express =require("express")

const {NoteModel}=require("../models/Note.module")

const notesRouter =express.Router()


notesRouter.get("/",async(req,res)=>{
    try{
        const notes=await NoteModel.find()
        res.send(notes)
    }
    catch(err){
        console.log(err)
        res.send("something wrong")
    }
    
})


notesRouter.post("/create",async (req,res)=>{
    const payload=req.body
    console.log(payload)
    try{
        // await NoteModel.insertMany(payload)
        const new_note=new NoteModel(payload)
        await new_note.save()
        res.send({"mesg":"Notes create successfully"})
    }

    catch(err)
    {
        console.log(err)
        res.send({"err":"something wrong"})
    }
})

notesRouter.patch("/update/:noteid",async(req,res)=>{
    const userID=req.body.NoteID
    const payload=req.body;
    const noteID=req.params.noteid
    const note=await NoteModel.findOne({_id:noteID})
    console.log("not",note.NoteID,"use",userID)

    if(userID!==note.NoteID){
        res.send("not authorised")

    }

    // const userIDinNote=await NoteModel.findOne({_id:noteid})
    
    
    else{
        
        try{
            await NoteModel.findByIdAndUpdate({_id:noteID},payload)
             res.send("Notes update")
        }
        catch(err){
            console.log(err)

        }

    }
    
})


notesRouter.delete("/delete/:noteid",async (req,res)=>{
    const userID=req.body.NoteID
    // const payload=req.body;
    const noteID=req.params.noteid
    const note=await NoteModel.findOne({_id:noteID})
    console.log("not",note.NoteID,"use",userID)

    if(userID!==note.NoteID){
        res.send("not authorised")

    }
    else{
        try{
            await NoteModel.findByIdAndDelete({_id:noteID})
            res.send({"meg":"one note delete successfully"})
        }
        catch(err){
            console.log(err)
            res.send("something wrong in deleting the note")
        }

    }
    
    
    res.send("wellcome back")
})


module.exports={notesRouter}