const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");
const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

const images = [
  { filename: "pic1.jpg", alt: "Closeup of a human eye" },
  { filename: "pic2.jpg", alt: "Rock that looks like a wave" },
  { filename: "pic3.jpg", alt: "Purple and white pansies" },
  { filename: "pic4.jpg", alt: "Section of wall from a pharaoh's tomb" },
  { filename: "pic5.jpg", alt: "Large moth on a leaf" }
];

const baseURL =
  "https://mdn.github.io/shared-assets/images/examples/learn/gallery/";


for (const image of images) {
  const newImage = document.createElement("img");
  newImage.src = `${baseURL}${image.filename}`;
  newImage.alt = image.alt;
  newImage.tabIndex = 0;

  thumbBar.appendChild(newImage);

  newImage.addEventListener("click", updateDisplayedImage);
  newImage.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      updateDisplayedImage(e);
    }
  });
}


const caption = document.createElement("p");
caption.classList.add("caption");
document.body.appendChild(caption);


const indexDisplay = document.createElement("p");
indexDisplay.classList.add("index-display");
document.body.appendChild(indexDisplay);

function updateDisplayedImage(e) {
  displayedImage.src = e.target.src;
  displayedImage.alt = e.target.alt;

  updateCaption();
  updateIndexDisplay();
}

function updateCaption() {
  caption.textContent = displayedImage.alt;
}

function updateIndexDisplay() {
  const currentFile = displayedImage.src.split("/").pop();
  const index = images.findIndex(
    (image) => image.filename === currentFile
  );

  indexDisplay.textContent = `Image ${index + 1} of ${images.length}`;
}


btn.addEventListener("click", () => {
  if (btn.classList.contains("dark")) {
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgba(0 0 0 / 0.5)";
  } else {
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgba(0 0 0 / 0)";
  }
  btn.classList.toggle("dark");
});


updateCaption();
updateIndexDisplay();
