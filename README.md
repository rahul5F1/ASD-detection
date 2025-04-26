## ASD Prediction Flask App
This is a simple Flask web application that predicts the likelihood of Autism Spectrum Disorder (ASD) based on user inputs.

It loads a pre-trained machine learning model and returns the prediction through a web interface.

### Features
Accepts input from users through a web form.
Sends data to the Flask backend for prediction.
Returns a diagnosis: Positive for ASD or Negative for ASD.

### Requirements
Before running the app, make sure you have the following installed:
Python 3.7+
Flask
NumPy
joblib

#### You can install the required packages using:
pip install -r requirements.txt

### How to Run
Clone or download this repository.
Ensure the model/best_model.pkl file exists.
Navigate to the project directory in your terminal.
#### Run the Flask app:
python app.py

#### Open your browser and visit:
http://127.0.0.1:5000/

You should see the web form for ASD prediction.

## License
This project is for educational and research purposes
