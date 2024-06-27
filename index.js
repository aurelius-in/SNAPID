let model;
const fileInput = document.getElementById("file-input");
const imageContainer = document.getElementById("image-container");
const generateCaptionButton = document.getElementById("generate-caption");
const captionContainer = document.getElementById("caption-container");

async function loadModel() {
  console.log("Loading model...");
  model = await mobilenet.load();
  console.log("Model loaded.");
}

loadModel();

fileInput.addEventListener("change", handleImageUpload);

generateCaptionButton.addEventListener("click", generateCaption);

function handleImageUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  
  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;
    img.onload = function () {
      imageContainer.innerHTML = "";
      imageContainer.appendChild(img);
      captionContainer.innerText = "Image loaded.";
    };
  };
  
  if (file) {
    reader.readAsDataURL(file);
  } else {
    imageContainer.innerHTML = "";
    captionContainer.innerText = "No image selected.";
  }
}

async function generateCaption() {
  if (!model) {
    captionContainer.innerText = "Model not loaded. Please wait...";
    return;
  }
  
  const img = imageContainer.querySelector("img");
  if (!img) {
    captionContainer.innerText = "No image selected or model not loaded.";
    return;
  }

  captionContainer.innerText = "Generating caption...";
  const predictions = await model.classify(img);
  captionContainer.innerText = `Caption: ${predictions.map(p => p.className).join(", ")}`;
}
