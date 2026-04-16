import pickle
import numpy as np
import sys
import json

model = pickle.load(open("model.pkl", "rb"))

# Read input from Node
data = json.loads(sys.argv[1])

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

features = np.array([features])
prediction = model.predict(features)

print(json.dumps({"prediction": int(prediction[0])}))