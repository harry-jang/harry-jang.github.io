const images = [
    "a.jpg",
    "b.jpg",
    "c.jpg",
    "d.jpg"
]


const chosenImage = images[Math.floor(Math.random() * images.length)];
const bgImage = document.createElement("img");

bgImage.src = `img/${chosenImage}`;

document.body.appendChild(bgImage);