let imageClassifier;
let imgElement;

document.addEventListener('DOMContentLoaded', () => {
    // Load the pre-trained image classifier model
    imageClassifier = ml5.imageClassifier('MobileNet', () => {
        console.log('Model Loaded');
    });

    const fileInput = document.getElementById('file-input');
    const generateCaptionButton = document.getElementById('generate-caption');
    imgElement = document.getElementById('selected-image');

    // Handle image file selection
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imgElement.src = e.target.result;
                imgElement.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle caption generation
    generateCaptionButton.addEventListener('click', () => {
        if (imgElement.src) {
            imageClassifier.classify(imgElement, (error, results) => {
                if (error) {
                    console.error(error);
                    document.getElementById('caption').innerText = 'Error generating caption';
                    return;
                }
                document.getElementById('caption').innerText = `Caption: ${results[0].label}`;
            });
        } else {
            document.getElementById('caption').innerText = 'No image selected or model not loaded.';
        }
    });
});
