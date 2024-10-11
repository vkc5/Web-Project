// Function to set a random background image every 7 seconds 
function changeBackgroundImage() {
    const images = [
        '../image/HomepageImages/HomepagePhoto1.jpg',
        '../image/HomepageImages/HomepagePhoto2.jpg',
        '../image/HomepageImages/HomepagePhoto3.jpg'
    ];
    let currentIndex = 0;

    function setBackgroundImage(index) {
        document.body.style.transition = 'background-image 1s ease-in-out'; 
        document.body.style.backgroundImage = `url('${images[index]}')`;
        currentIndex = index;
        updateActiveDot();
    }

    function updateActiveDot() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
                dot.style.boxShadow = '0 0 10px 5px rgba(0, 0, 0, 0.5)'; 
            } else {
                dot.classList.remove('active');
                dot.style.boxShadow = 'none'; 
            }
        });
    }

    function setBackgroundAutomatically() {
        setBackgroundImage(currentIndex);
        currentIndex = (currentIndex + 1) % images.length;
    }

    setBackgroundImage(currentIndex); 
    let interval = setInterval(setBackgroundAutomatically, 7000); // Change background every 7 seconds

    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.style.cursor = 'pointer'; 
        dot.addEventListener('click', () => {
            clearInterval(interval); 
            setBackgroundImage(index); 
            interval = setInterval(setBackgroundAutomatically, 7000); 
        });
    });
}

window.onload = changeBackgroundImage;
