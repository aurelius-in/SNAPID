let imgElement;
let model;

async function setup() {
    const imageUpload = document.getElementById('imageUpload');
    const captionButton = document.getElementById('captionButton');
    imgElement = document.getElementById('image');
    const captionResult = document.getElementById('captionResult');

    imageUpload.addEventListener('change', () => {
        const reader = new FileReader();
        reader.onload = (e) => {
            imgElement.src = e.target.result;
        };
        reader.readAsDataURL(imageUpload.files[0]);
    });

    captionButton.addEventListener('click', async () => {
        if (imgElement.src) {
            captionResult.innerText = "Loading model...";
            if (!model) {
                model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
            }
            captionResult.innerText = "Generating caption...";
            const tensor = tf.browser.fromPixels(imgElement)
                .resizeNearestNeighbor([224, 224])
                .toFloat()
                .expandDims();
            const predictions = await model.predict(tensor).data();
            const topPrediction = Array.from(predictions)
                .map((p, i) => ({ probability: p, className: IMAGENET_CLASSES[i] }))
                .sort((a, b) => b.probability - a.probability)[0];
            captionResult.innerText = `Caption: ${topPrediction.className}`;
        } else {
            captionResult.innerText = "No image selected or model not loaded.";
        }
    });
}

window.onload = setup;
