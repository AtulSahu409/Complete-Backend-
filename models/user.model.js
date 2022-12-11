const mongoose=require("mongoose")


const Userschema=mongoose.Schema({
    email:String,
    password:String,
    name:String,
    age:Number

})

const Usermodel=mongoose.model("user",Userschema)

module.exports={Usermodel}
