const { PythonShell } = require("python-shell");

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

        const result = await new Promise((resolve, reject) => {
            PythonShell.run(
                "ml_model.py",
                {
                    args: [JSON.stringify(formattedData)]
                },
                (err, results) => {
                    if (err) reject(err);
                    else resolve(JSON.parse(results[0]));
                }
            );
        });

        const record = await HealthRecord.create({
            userId: req.user?.id,
            inputData: req.body,
            prediction: result.prediction
        });

        return res.json({
            prediction: result.prediction,
            record
        });

    } catch (err) {
        console.log("❌ ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};

// const axios = require("axios");
// const HealthRecord = require("../models/HealthRecord");

// const ML_URL = "https://diabetes-predictor-app-1.onrender.com";

// exports.predict = async (req, res) => {
//     try {

//         const formattedData = {
//             age: Number(req.body.age),
//             gender: req.body.gender === "Male" ? 1 : 0,
//             bmi: Number(req.body.bmi),
//             blood_pressure: Number(req.body.blood_pressure),
//             glucose: Number(req.body.glucose),
//             physical_activity: Number(req.body.physical_activity),
//             family_history: req.body.family_history === "Yes" ? 1 : 0,
//             smoking: req.body.smoking === "Yes" ? 1 : 0,
//             alcohol: req.body.alcohol === "Yes" ? 1 : 0,
//             sleep_hours: Number(req.body.sleep_hours),
//             stress_level: Number(req.body.stress_level),
//             junk_food: req.body.junk_food === "High" ? 1 : 0
//         };

//         console.log("👉 Sending to ML:", formattedData);

//         // 🔥 STEP 1: WAKE UP ML SERVER
//         try {
//             await axios.get(ML_URL, { timeout: 5000 });
//             console.log("✅ ML server awake");
//         } catch {
//             console.log("⚠️ ML wake-up failed (might be sleeping)");
//         }

//         // 🔥 STEP 2: RETRY LOGIC
//         let response;
//         let lastError;

//         for (let i = 0; i < 2; i++) {
//             try {
//                 response = await axios.post(
//                     `${ML_URL}/predict`,
//                     formattedData,
//                     { timeout: 20000 } // ⬅️ increased timeout
//                 );
//                 break;
//             } catch (err) {
//                 lastError = err;
//                 console.log(`⚠️ Attempt ${i + 1} failed`);

//                 // wait before retry
//                 await new Promise((resolve) => setTimeout(resolve, 3000));
//             }
//         }

//         // ❌ If still failed after retries
//         if (!response) {
//             throw lastError;
//         }

//         console.log("👉 ML RESPONSE:", response.data);

//         if (!response.data || response.data.prediction === undefined) {
//             return res.status(400).json({
//                 error: "Invalid ML response",
//                 details: response.data
//             });
//         }

//         const record = await HealthRecord.create({
//             userId: req.user?.id,
//             inputData: req.body,
//             prediction: response.data.prediction
//         });

//         return res.json({
//             prediction: response.data.prediction,
//             record
//         });

//     } catch (err) {
//         console.log("❌ FULL ERROR:", err.response?.data || err.message);

//         return res.status(200).json({
//             prediction: null,
//             message: "Server is waking up, please try again in a few seconds"
//         });
//     }
// };