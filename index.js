document.getElementById('imageInput').addEventListener('change', loadImage);
document.getElementById('generateCaption').addEventListener('click', generateCaption);

const imageContainer = document.getElementById('imageContainer');
const captionDisplay = document.getElementById('captionDisplay');

let selectedImage = null;

async function loadImage(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    selectedImage = new Image();
    selectedImage.src = e.target.result;
    selectedImage.onload = function() {
      imageContainer.innerHTML = '';
      imageContainer.appendChild(selectedImage);
    };
  };

  reader.readAsDataURL(file);
}

async function generateCaption() {
  if (!selectedImage) {
    captionDisplay.innerText = 'No image selected or model not loaded.';
    return;
  }

  captionDisplay.innerText = 'Generating caption...';

  const img = document.createElement('img');
  img.src = selectedImage.src;
  
  img.onload = async function() {
    const net = await mobilenet.load();
    const result = await net.classify(img);
    const caption = result.map(r => r.className).join(', ');
    captionDisplay.innerText = `Caption: ${caption}`;
  };
}

console.log('Initial setup complete');
