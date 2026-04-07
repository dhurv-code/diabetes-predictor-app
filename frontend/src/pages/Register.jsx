import { useState } from "react";
import API from "../services/Api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await API.post("/auth/register", form);
            alert("Registered successfully");
            navigate("/");
        } catch (err) {
            // console.log(err.response?.data || err.message);
            alert("Registration failed", err);
        }
    };

    return (
        
            <div className="min-h-screen bg-blue-900 flex items-center justify-center">

                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

                    <h2 className="text-3xl font-bold text-center mb-6">
                        Register
                    </h2>

                    {/* IMPORTANT: flex-col */}
                    <div className="flex-col gap-8">

                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />

                        <button onClick={handleRegister} className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
                            Register
                        </button>

                        <p className="text-center text-sm">
                            Already have an account?{" "}
                            <span className="text-blue-500 cursor-pointer">Login</span>
                        </p>

                    </div>
                </div>
            </div>
    );
}

export default Register;