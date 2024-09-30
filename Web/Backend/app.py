from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import pandas as pd
import joblib

app = Flask(__name__)

# Enable CORS for requests coming from 'http://localhost:3000'
CORS(app, origins=['http://localhost:3000'])

# Load the saved model and pipeline
model_pipeline = joblib.load('model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON data from the request
    json_data = request.json
    
    # Convert JSON to DataFrame
    df = pd.DataFrame([json_data])
    
    # Make prediction
    prediction = model_pipeline.predict(df)
    
    # Return the prediction result as JSON
    return jsonify({'prediction': int(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True)
