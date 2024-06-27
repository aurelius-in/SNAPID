let imageUpload = document.getElementById('imageUpload');
let selectedImage = document.getElementById('selectedImage');
let captionResult = document.getElementById('captionResult');

imageUpload.addEventListener('change', (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        selectedImage.src = e.target.result;
        captionResult.textContent = '';
    };
    reader.readAsDataURL(file);
});

async function loadModel() {
    const model = await tf.loadGraphModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v2_140_224/model.json');
    return model;
}

document.getElementById('generateCaptionButton').addEventListener('click', async () => {
    if (selectedImage.src) {
        const model = await loadModel();
        const img = tf.browser.fromPixels(selectedImage).expandDims(0);
        const predictions = await model.predict(img).data();
        const top5 = Array.from(predictions)
            .map((p, i) => ({ probability: p, className: IMAGENET_CLASSES[i] }))
            .sort((a, b) => b.probability - a.probability)
            .slice(0, 5);
        captionResult.textContent = top5[0].className;
    } else {
        captionResult.textContent = 'No image selected or model not loaded.';
    }
});

const IMAGENET_CLASSES = {
    0: 'tench, Tinca tinca',
    1: 'goldfish, Carassius auratus',
    2: 'great white shark, white shark, man-eater, man-eating shark, Carcharodon carcharias',
    //... Add the rest of the ImageNet classes here.
};
