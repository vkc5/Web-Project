// Function to set a random background image
function setRandomBackground() {
    const images = [
        '../image/HomepageImages/HomepagePhoto1.jpg',
        '../image/HomepageImages/HomepagePhoto2.jpg',
        '../image/HomepageImages/HomepagePhoto3.jpg'
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    document.body.style.backgroundImage = `url('${images[randomIndex]}')`;
}

// Call the function when the page loads
window.onload = setRandomBackground;