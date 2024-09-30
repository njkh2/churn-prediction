function makePrediction() {
    const data = {
        creditscore: document.getElementById('CreditScore').value,
        geography: document.getElementById('Geography').value,
        gender: document.getElementById('Gender').value,
        age: document.getElementById('Age').value,
        tenure: document.getElementById('Tenure').value,
        balance: document.getElementById('Balance').value,
        numofproducts: document.getElementById('NumOfProducts').value,
        hascrcard: document.getElementById('HasCrCard').value,
        isactivemember: document.getElementById('IsActiveMember').value,
        estimatedsalary: document.getElementById('EstimatedSalary').value,
    };

    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = 'Prediction: ' + data.prediction;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
