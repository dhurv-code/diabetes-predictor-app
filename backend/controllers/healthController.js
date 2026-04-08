const axios=require("axios")
const HealthRecord=require("../models/HealthRecord")

// exports.predict=async(req,res)=>{
//     try{
//         console.log("🔥 Controller hit");
//         console.log("Step 2: Response from Flask:", response.data);
//         const response=await axios.post(
//             "http://127.0.0.1:5000/predict",req.body,{timeout:5000}
//         );
//         console.log("Step 2: Response from Flask:", response.data);

//         res.json(response.data)

//     }catch(err){
//         res.status(500).json({error:"ML API FAILED"})
//     }
// }

exports.predict = async (req, res) => {
    try {
        
        const response = await axios.post(
            "https://diabetes-predictor-app-1.onrender.com/",
            req.body,
            { timeout: 5000 }
        );
        const prediction = response.data.prediction;

        const record=await HealthRecord.create({
            userId:req.user.id,
            inputData:req.body,
            prediction
        })

        return res.json({prediction,record})

    } catch (err) {
        console.log("❌ ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
};