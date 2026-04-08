const express=require("express")
const router= express.Router()
const {predict}=require("../controllers/healthController")
const auth= require("../middleware/authMiddleware")
const HealthRecord = require("../models/HealthRecord");

router.post("/predict",auth,predict)
router.get("/history",auth,async(req,res)=>{
    const records=await HealthRecord.find({
        userId:req.user.id
    }).sort({createdAt:-1});
    res.json(records)
})

module.exports=router;