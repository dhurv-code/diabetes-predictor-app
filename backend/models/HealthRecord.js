const mongoose=require("mongoose")

const healthSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    inputData:Object,
    prediction:Number,
    createdAt:{
        type:Date,
        default:Date.now()
    }
});


module.exports=mongoose.model("HealthRecord",healthSchema)