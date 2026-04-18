// import { useState } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/Api";

function Dashboard() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);

  const handlePredict = async () => {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined" || token === "null") {
      navigate("/login");
      return;
    }

    try {
      const res = await API.post("/health/predict", form);
      setResult(res.data.prediction);

    } catch (err) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const getRiskLabel = (value) => {
    if (value === 0) return { text: "Low Risk", color: "green" };
    if (value === 1) return { text: "Medium Risk", color: "yellow" };
    if (value === 2) return { text: "High Risk", color: "red" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-black flex items-center justify-center p-4">

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl">

        <h2 className="text-3xl font-bold text-center mb-8">
          Health Risk Predictor
        </h2>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT SIDE */}
          <div className="space-y-4">

            <input type="number" placeholder="Age" className="input"
              onChange={(e) => setForm({ ...form, age: Number(e.target.value) })} />

            <select className="input"
              onChange={(e) => setForm({ ...form, gender: Number(e.target.value) })}>
              <option>Select Gender</option>
              <option value="1">Male</option>
              <option value="0">Female</option>
            </select>

            <input type="number" placeholder="BMI" className="input"
              onChange={(e) => setForm({ ...form, bmi: Number(e.target.value) })} />

            <input type="number" placeholder="Blood Pressure" className="input"
              onChange={(e) => setForm({ ...form, blood_pressure: Number(e.target.value) })} />

            <input type="number" placeholder="Glucose" className="input"
              onChange={(e) => setForm({ ...form, glucose: Number(e.target.value) })} />

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-4 ">

            <input type="number" placeholder="Physical Activity (hrs/week)" className="input"
              onChange={(e) => setForm({ ...form, physical_activity: Number(e.target.value) })} />

            <select className="input"
              onChange={(e) => setForm({ ...form, family_history: Number(e.target.value) })}>
              <option>Family History</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>

            <select className="input"
              onChange={(e) => setForm({ ...form, smoking: Number(e.target.value) })}>
              <option>Smoking</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>

            <select className="input"
              onChange={(e) => setForm({ ...form, alcohol: Number(e.target.value) })}>
              <option>Alcohol</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>

            <input type="number" placeholder="Sleep Hours" className="input"
              onChange={(e) => setForm({ ...form, sleep_hours: Number(e.target.value) })} />

            <input type="number" placeholder="Stress Level (1-10)" className="input"
              onChange={(e) => setForm({ ...form, stress_level: Number(e.target.value) })} />

            <select className="input"
              onChange={(e) => setForm({ ...form, junk_food: Number(e.target.value) })}>
              <option>Junk Food</option>
              <option value="0">Low</option>
              <option value="1">Medium</option>
              <option value="2">High</option>
            </select>

          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={handlePredict} type="button"
          className="w-full mt-8 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Predict
        </button>

        {/* RESULT CARD */}
        {result !== null && (
          <div className="mt-8 text-center bg-gray-50 p-6 rounded-xl border">

            <p className="text-lg font-semibold text-gray-700">Health Risk</p>

            <p className={`text-3xl font-bold mt-2 ${getRiskLabel(result).color === "green"
              ? "text-green-600"
              : getRiskLabel(result).color === "yellow"
                ? "text-yellow-500"
                : "text-red-600"
              }`}>
              {getRiskLabel(result).text}
            </p>

            <p className="mt-2 text-sm text-gray-600">
              {result === 0 && "Your health indicators are in a safe range. Keep maintaining a healthy lifestyle."}
              {result === 1 && "Some risk factors detected. Improve diet and activity."}
              {result === 2 && "High risk detected. Please consult a doctor."}
            </p>

          </div>
        )}


      </div>
    </div>
  )
}

export default Dashboard; 