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
    let interval = setInterval(setBackgroundAutomatically, 6000); // Change background every 6 seconds

    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.style.cursor = 'pointer'; 
        dot.addEventListener('click', () => {
            clearInterval(interval); 
            setBackgroundImage(index); 
            interval = setInterval(setBackgroundAutomatically, 6000); 
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const showRegistration = document.getElementById("showRegistration");
    const registrationForm = document.getElementById("registrationForm");
    const form = document.getElementById("registrationForm");
    const messageDiv = document.getElementById("message"); 
  
    showRegistration.addEventListener("click", function (event) {
      event.preventDefault();
      registrationForm.style.display =
        registrationForm.style.display === "none" ? "block" : "none";
    });
  
    form.addEventListener("submit", function (event) {
      event.preventDefault(); 
      messageDiv.textContent = ""; 
  
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const phoneNumber = document.getElementById("phoneNumber").value;
      const email = document.getElementById("email").value;
  
      // Validation
      let isValid = true;
      if (firstName.length < 3 || lastName.length < 3) {
        isValid = false;
        messageDiv.textContent += "First Name and Last Name must have at least 3 characters.\n";
        submitButton.style.backgroundColor = 'red';
      }
      if (phoneNumber.length !== 8 || !/^\d+$/.test(phoneNumber)) {
        isValid = false;
        messageDiv.textContent += "Phone number must contain exactly 8 digits.\n";
        submitButton.style.backgroundColor = 'red';
      }
  
      //Handle Email Validation 
      if (email === "" || !email.includes("@")) {
        isValid = false;
        messageDiv.textContent += "Please enter a valid email address.\n";
        submitButton.style.backgroundColor = 'red';
      }
  
      // Submission
      if (isValid) {
          messageDiv.textContent = 'Registration successful!';
          const submitButton = form.querySelector('button[type="submit"]');
          submitButton.style.backgroundColor = 'lightgreen'; // Example styling, remove if not needed
          form.reset(); // Reset the form
      } else {
          messageDiv.style.color = 'red';
      }
  });
});

window.onload = changeBackgroundImage;
