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

        const formattedData = {
            age: Number(req.body.age),
            gender: req.body.gender === "Male" ? 1 : 0,
            bmi: Number(req.body.bmi),
            blood_pressure: Number(req.body.blood_pressure),
            glucose: Number(req.body.glucose),
            physical_activity: Number(req.body.physical_activity),
            family_history: req.body.family_history === "Yes" ? 1 : 0,
            smoking: req.body.smoking === "Yes" ? 1 : 0,
            alcohol: req.body.alcohol === "Yes" ? 1 : 0,
            sleep_hours: Number(req.body.sleep_hours),
            stress_level: Number(req.body.stress_level),
            junk_food: req.body.junk_food === "High" ? 1 : 0
        };

        console.log("👉 Sending to ML:", formattedData);

        const response = await axios.post(
            "https://diabetes-predictor-app-pnmk.onrender.com/predict",
            formattedData,
            { timeout: 5000 }
        );

        console.log("👉 ML RESPONSE:", response.data);

        if (!response.data || response.data.prediction === undefined) {
            return res.status(400).json({
                error: "Invalid ML response",
                details: response.data
            });
        }

        const record = await HealthRecord.create({
            userId: req.user?.id,
            inputData: req.body,
            prediction: response.data.prediction
        });

        return res.json({
            prediction: response.data.prediction,
            record
        });

    } catch (err) {
        console.log("❌ FULL ERROR:", err.response?.data || err);
        res.status(500).json({
            error: err.message,
            details: err.response?.data
        });
    }
};