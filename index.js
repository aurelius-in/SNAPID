let imageUpload = document.getElementById('imageUpload');
let selectedImage = document.getElementById('selectedImage');
let captionResult = document.getElementById('captionResult');
let imageClassifier;

function logMessage(message) {
    console.log(message);
}

function logError(message) {
    console.error(message);
    captionResult.textContent = message;
}

imageUpload.addEventListener('change', (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        selectedImage.src = e.target.result;
        logMessage('Image selected.');
    };
    reader.readAsDataURL(file);
});

function setup() {
    noCanvas();
    imageClassifier = ml5.imageClassifier('MobileNet', modelReady);
}

function modelReady() {
    logMessage('Model Loaded!');
}

document.getElementById('generateCaptionButton').addEventListener('click', () => {
    if (selectedImage.src && imageClassifier) {
        imageClassifier.classify(selectedImage, (error, results) => {
            if (error) {
                logError('Error generating caption: ' + error);
                return;
            }
            logMessage('Caption generated successfully.');
            captionResult.textContent = results[0].label;
        });
    } else {
        logError('No image selected or model not loaded.');
    }
});

window.onload = setup;
