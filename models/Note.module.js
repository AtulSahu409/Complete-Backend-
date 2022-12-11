const mongoose=require("mongoose")


const NoteSchema=mongoose.Schema({
    title:String,
    note:String,
    tag:String,
    NoteID:String,

})

const NoteModel=mongoose.model("Notes",NoteSchema)

module.exports={NoteModel}