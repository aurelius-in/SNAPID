// Include TensorFlow.js
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>

// Load the model
let model;
const loadModel = async () => {
    model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/imdb_mlp/model.json');
    console.log("Model loaded successfully");
};

loadModel();

document.getElementById("generate-caption").addEventListener("click", async () => {
    const fileInput = document.getElementById("file-input");
    const file = fileInput.files[0];
    if (!file) {
        document.getElementById("caption").innerText = "No image selected or model not loaded.";
        return;
    }

    // Read the image file
    const reader = new FileReader();
    reader.onload = async (event) => {
        const imageSrc = event.target.result;
        const imageElement = document.createElement("img");
        imageElement.src = imageSrc;
        imageElement.onload = async () => {
            // Preprocess the image
            const tensor = tf.browser.fromPixels(imageElement)
                .resizeNearestNeighbor([224, 224])
                .toFloat()
                .expandDims();
            
            // Predict the caption
            const prediction = await model.predict(tensor).data();
            const caption = IMAGENET_CLASSES[prediction.indexOf(Math.max(...prediction))];
            document.getElementById("caption").innerText = `Caption: ${caption}`;
        };
    };
    reader.readAsDataURL(file);
});
