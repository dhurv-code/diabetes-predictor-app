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
            ...req.body,
            gender: req.body.gender === "Male" ? 1 : 0,
            family_history: req.body.family_history === "Yes" ? 1 : 0,
            smoking: req.body.smoking === "Yes" ? 1 : 0,
            alcohol: req.body.alcohol === "Yes" ? 1 : 0,
            junk_food: req.body.junk_food === "High" ? 1 : 0
        };

        console.log("Sending:", formattedData);

        const response = await axios.post(
            "https://diabetes-predictor-app-pnmk.onrender.com/predict",
            formattedData,
            { timeout: 5000 }
        );

        console.log("ML response:", response.data);

        if (!response.data.prediction) {
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
        console.log("FULL ERROR:", err.response?.data || err.message);
        res.status(500).json({
            error: err.message,
            details: err.response?.data
        });
    }
};