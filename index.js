let imageUpload = document.getElementById('imageUpload');
let selectedImage = document.getElementById('selectedImage');
let captionResult = document.getElementById('captionResult');
let imageCaptioning;

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
    };
    reader.readAsDataURL(file);
    logMessage('Image selected.');
});

function setup() {
    noCanvas();
    imageCaptioning = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/v_slVpIa/model.json', modelReady);
}

function modelReady() {
    logMessage('Model Loaded!');
}

document.getElementById('generateCaptionButton').addEventListener('click', () => {
    if (selectedImage.src && imageCaptioning) {
        imageCaptioning.classify(selectedImage, (error, results) => {
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
