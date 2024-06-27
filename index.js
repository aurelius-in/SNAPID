let mobilenet;
let imageElement;

async function setup() {
    // Load the MobileNet model
    mobilenet = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
    console.log('Model loaded');

    // Setup event listener for file input
    const fileInput = document.getElementById('file-input');
    fileInput.addEventListener('change', (event) => loadFile(event.target.files[0]));

    // Setup event listener for the button
    const button = document.getElementById('generate-caption');
    button.addEventListener('click', generateCaption);
}

async function loadFile(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
        imageElement = document.getElementById('selected-image');
        imageElement.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

async function generateCaption() {
    if (!imageElement) {
        alert('Please select an image first.');
        return;
    }

    const image = tf.browser.fromPixels(imageElement);
    const resizedImage = tf.image.resizeBilinear(image, [224, 224]);
    const normalizedImage = resizedImage.div(255.0);
    const batchedImage = normalizedImage.expandDims(0);

    const predictions = await mobilenet.predict(batchedImage).data();
    const topPrediction = Array.from(predictions)
        .map((p, i) => ({ probability: p, className: IMAGENET_CLASSES[i] }))
        .sort((a, b) => b.probability - a.probability)[0];

    const captionElement = document.getElementById('caption');
    captionElement.innerText = `Prediction: ${topPrediction.className} (Probability: ${topPrediction.probability.toFixed(2)})`;
}

document.addEventListener('DOMContentLoaded', setup);
