import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(`Prediction: ${data.prediction}`);
        // Navigate to /predict with the result
        setTimeout(() => {
          window.location.href = '/predict';
        }, 1000); // Redirect after 1 second
      } else {
        console.error('Prediction failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <h1>Customer Churn Prediction</h1>
              <form onSubmit={handleSubmit}>
                <input name="CreditScore" placeholder="Credit Score" onChange={handleChange} required />
                <input name="Geography" placeholder="Geography" onChange={handleChange} required />
                <input name="Gender" placeholder="Gender" onChange={handleChange} required />
                <input name="Age" placeholder="Age" onChange={handleChange} required />
                <input name="Tenure" placeholder="Tenure" onChange={handleChange} required />
                <input name="Balance" placeholder="Balance" onChange={handleChange} required />
                <input name="NumOfProducts" placeholder="Num of Products" onChange={handleChange} required />
                <input name="HasCrCard" placeholder="Has Credit Card (1 or 0)" onChange={handleChange} required />
                <input name="IsActiveMember" placeholder="Is Active Member (1 or 0)" onChange={handleChange} required />
                <input name="EstimatedSalary" placeholder="Estimated Salary" onChange={handleChange} required />
                <button type="submit">Predict</button>
              </form>
              {result && <h2>{result}</h2>}
            </div>
          }
        />
        <Route
          path="/predict"
          element={
            <div>
              <h1>Prediction Result</h1>
              {result ? <p>{result}</p> : <p>No prediction result available.</p>}
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
