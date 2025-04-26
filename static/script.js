
document.getElementById('asdForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = {
        a1: document.getElementById('a1').value,
        a2: document.getElementById('a2').value,
        a3: document.getElementById('a3').value,
        a4: document.getElementById('a4').value,
        a5: document.getElementById('a5').value,
        a6: document.getElementById('a6').value,
        a7: document.getElementById('a7').value,
        a8: document.getElementById('a8').value,
        a9: document.getElementById('a9').value,
        a10: document.getElementById('a10').value,
        age: document.getElementById('age').value,
        qchart: document.getElementById('qchart').value,
        gender: document.getElementById('gender').value,
        ethnicity: document.getElementById('ethnicity').value,
        jaundice: document.getElementById('jaundice').value,
        family_asd: document.getElementById('family_asd').value,
        test_by: document.getElementById('test_by').value
    };
    console.log('Form Data:', formData);
    displayResults(formData);
});

function displayResults(formData) {
    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    
        const diagnosisResult = document.getElementById('diagnosisResult');
        diagnosisResult.textContent = data.result;
    
        diagnosisResult.className = data.result.includes('Positive') 
            ? 'text-2xl font-bold asd-positive'
            : 'text-2xl font-bold asd-negative';
    
        const formDataDisplay = document.getElementById('formDataDisplay');
        formDataDisplay.innerHTML = '';
        for (const [key, value] of Object.entries(formData)) {
            const dataItem = document.createElement('div');
            dataItem.className = 'data-item';
    
            const keyElement = document.createElement('div');
            keyElement.className = 'text-xs text-gray-400';
            keyElement.textContent = key;
    
            const valueElement = document.createElement('div');
            valueElement.className = 'text-sm font-medium text-white';
            valueElement.textContent = value;
    
            dataItem.appendChild(keyElement);
            dataItem.appendChild(valueElement);
            formDataDisplay.appendChild(dataItem);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
}

document.getElementById('resetBtn').addEventListener('click', function () {
    document.getElementById('asdForm').reset();
    document.getElementById('resultsContainer').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
