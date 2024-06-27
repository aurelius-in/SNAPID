const imageUpload = document.getElementById('imageUpload');
const selectedImage = document.getElementById('selectedImage');
const captionResult = document.getElementById('captionResult');

function logMessage(message) {
    const log = document.getElementById('console-log');
    log.textContent += message + '\n';
    console.log(message);
}

function logError(message) {
    const log = document.getElementById('console-log');
    log.textContent += '[ERROR] ' + message + '\n';
    console.error(message);
}

console.log = logMessage;
console.error = logError;

imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        selectedImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
    logMessage('Image selected.');
});

document.getElementById('generateCaptionButton').addEventListener('click', () => {
    if (selectedImage.src) {
        logMessage('Generating caption...');
        // Placeholder for actual caption generation logic
        const caption = 'This is a sample caption.';
        captionResult.textContent = caption;
        logMessage('Caption generated successfully.');
    } else {
        logError('No image selected.');
    }
});

logMessage('Initial setup complete.');
