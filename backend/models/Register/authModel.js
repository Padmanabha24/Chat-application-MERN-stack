const mongoose=require("mongoose")

const registerSchema=new mongoose.Schema(
    {
 
   first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone_number:{
        type:Number,
        required:true

    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
}

)

const user=mongoose.model('user',registerSchema);

module.exports=user;