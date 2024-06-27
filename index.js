document.addEventListener('DOMContentLoaded', function () {
    const imgElement = document.getElementById('image');
    const uploadButton = document.getElementById('upload-button');
    const generateButton = document.getElementById('generate-caption');
    const captionElement = document.getElementById('caption');

    // Load the MobileNet model
    let model;
    tf.loadGraphModel('https://tfhub.dev/google/imagenet/mobilenet_v2_140_224/classification/4').then(m => {
        model = m;
        console.log('Model loaded.');
    }).catch(err => {
        console.error('Failed to load model:', err);
        captionElement.innerText = 'Failed to load model.';
    });

    // Handle file upload
    uploadButton.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imgElement.src = e.target.result;
                captionElement.innerText = '';
            };
            reader.readAsDataURL(file);
        }
    });

    // Generate caption
    generateButton.addEventListener('click', async function () {
        if (!model) {
            captionElement.innerText = 'Model not loaded.';
            return;
        }

        const image = tf.browser.fromPixels(imgElement).toFloat().expandDims();
        const predictions = await model.predict(image).data();
        const topPrediction = Array.from(predictions)
            .map((p, i) => ({ probability: p, className: IMAGENET_CLASSES[i] }))
            .sort((a, b) => b.probability - a.probability)[0];

        captionElement.innerText = `Caption: ${topPrediction.className}`;
    });
});

// Import the IMAGENET_CLASSES from a separate file
import { IMAGENET_CLASSES } from './imagenet.js';
