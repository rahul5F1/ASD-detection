from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the trained model
model = joblib.load('model/best_model.pkl')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    print("Received Data:", data)  # Debug print

    try:
        # Fetch input fields
        a1 = int(data['a1'])
        a2 = int(data['a2'])
        a3 = int(data['a3'])
        a4 = int(data['a4'])
        a5 = int(data['a5'])
        a6 = int(data['a6'])
        a7 = int(data['a7'])
        a8 = int(data['a8'])
        a9 = int(data['a9'])
        a10 = int(data['a10'])
        age = int(data['age'])
        qchart = int(data['qchart'])

        gender = 1 if data['gender'] == 'Male' else 0
        ethnicity = hash(data['ethnicity']) % 1000  # Temporary simple encoding
        jaundice = 1 if data['jaundice'] == 'Yes' else 0
        family_asd = 1 if data['family_asd'] == 'Yes' else 0
        test_by = hash(data['test_by']) % 1000  # Temporary simple encoding

        # Arrange features in the same order as model expects
        features = np.array([[a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, age, gender, ethnicity, jaundice, family_asd, test_by, qchart,0]])
        
        # Predict
        prediction = model.predict(features)[0]

        result_text = "Positive for ASD" if prediction == 1 else "Negative for ASD"

        return jsonify({'result': result_text})
    
    except Exception as e:
        print("Error:", e)
        return jsonify({'result': 'Error occurred during prediction'})

if __name__ == '__main__':
    app.run(debug=True)
