from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

# Load your pre-trained model
model = joblib.load('model.pkl')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON data from the request
    json_data = request.json
    
    # Convert JSON to DataFrame
    df = pd.DataFrame([json_data])
    
    # Make prediction
    prediction = model.predict(df)
    
    # Return the prediction result as JSON
    return jsonify({'prediction': int(prediction[0])})

@app.errorhandler(404)
def page_not_found(e):
    return jsonify({'error': 'Endpoint not found'}), 404


if __name__ == '__main__':
    app.run(debug=True)