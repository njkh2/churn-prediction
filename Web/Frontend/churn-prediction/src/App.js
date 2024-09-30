import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function App() {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

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

        // Redirect to the /predict page after the form is submitted
        navigate('/predict');
      } else {
        console.error('Prediction failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Customer Churn Prediction</h1>
      <form onSubmit={handleSubmit}>
        <input name="CreditScore" placeholder="Credit Score" onChange={handleChange} />
        <input name="Geography" placeholder="Geography" onChange={handleChange} />
        <input name="Gender" placeholder="Gender" onChange={handleChange} />
        <input name="Age" placeholder="Age" onChange={handleChange} />
        <input name="Tenure" placeholder="Tenure" onChange={handleChange} />
        <input name="Balance" placeholder="Balance" onChange={handleChange} />
        <input name="NumOfProducts" placeholder="Num of Products" onChange={handleChange} />
        <input name="HasCrCard" placeholder="Has Credit Card (1 or 0)" onChange={handleChange} />
        <input name="IsActiveMember" placeholder="Is Active Member (1 or 0)" onChange={handleChange} />
        <input name="EstimatedSalary" placeholder="Estimated Salary" onChange={handleChange} />
        <button type="submit">Predict</button>
      </form>
      {result && <h2>{result}</h2>}
    </div>
  );
}

export default App;
