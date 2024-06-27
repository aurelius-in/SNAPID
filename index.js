async function setup() {
    const net = await mobilenet.load();
    console.log('Model loaded successfully');
    
    document.getElementById('status').innerText = 'Model loaded successfully.';

    const imgElement = document.getElementById('image');

    document.getElementById('file-input').addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            imgElement.src = reader.result;
            imgElement.onload = async () => {
                const predictions = await net.classify(imgElement);
                displayPredictions(predictions);
            };
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    });
}

function displayPredictions(predictions) {
    const captionElement = document.getElementById('caption');
    captionElement.innerHTML = ''; // Clear previous results
    predictions.forEach((prediction) => {
        const p = document.createElement('p');
        p.innerText = `Class: ${prediction.className}, Probability: ${(prediction.probability * 100).toFixed(2)}%`;
        captionElement.appendChild(p);
    });
}

setup();
