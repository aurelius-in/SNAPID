const imageUpload = document.getElementById('imageUpload');
const selectedImage = document.getElementById('selectedImage');
const logElement = document.getElementById('console-log');

function logMessage(message) {
    logElement.textContent += message + '\n';
    console.log(message);
}

imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        selectedImage.src = e.target.result;
        logMessage('Image loaded.');
    };
    reader.readAsDataURL(file);
    logMessage('Image selected.');
});

logMessage('Initial setup complete.');
