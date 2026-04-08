from flask import Flask, jsonify, request 
import pickle
import numpy as np
import os

app=Flask(__name__)
model = pickle.load(open("model.pkl", "rb"))

@app.route("/")
def home():
    return "Welcome to self Clinic"
@app.route("/predict",methods=["POST"])
def predict():
    try:
        data=request.json
        features = [
    data.get("age", 25),
    data.get("gender", 1),
    data.get("bmi", 24),
    data.get("blood_pressure", 120),
    data.get("glucose", 100),
    data.get("physical_activity", 3),
    data.get("family_history", 0),
    data.get("smoking", 0),
    data.get("alcohol", 0),
    data.get("sleep_hours", 7),
    data.get("stress_level", 5),
    data.get("junk_food", 1)
]
        features=np.array([features])
        prediction=model.predict(features)
        return jsonify({
            "prediction":int (prediction[0])
            
        })
    except Exception as e:
        return jsonify({"error":str(e)})
    
    
if __name__=="__main__":
    port=int(os.environ.get("PORT",5000))
    app.run(host="0.0.0.0",port=port,debug=False)





