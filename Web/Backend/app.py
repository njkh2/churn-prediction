from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the pre-trained model
model = joblib.load('model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Get data from the frontend

    # Extract features from the request
    features = np.array([data['CreditScore'], data['Geography'], data['Gender'], data['Age'],
                         data['Tenure'], data['Balance'], data['NumOfProducts'],
                         data['HasCrCard'], data['IsActiveMember'], data['EstimatedSalary']])

    # Convert to 2D array for prediction
    features = features.reshape(1, -1)

    # Predict churn (0 = Not churn, 1 = Churn)
    prediction = model.predict(features)[0]

    # Send response back to frontend
    result = "Customer is likely to leave." if prediction == 1 else "Customer is likely to stay."
    return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(debug=True)
