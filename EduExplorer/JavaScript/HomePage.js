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
window.onload = changeBackgroundImage;

//RegistrationForm
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
  
      var firstName = document.getElementById("firstName").value;
      var lastName = document.getElementById("lastName").value;
      var phoneNumber = document.getElementById("phoneNumber").value;
      var email = document.getElementById("email").value;
  
      // Validation
      let isValid = true;
      if (firstName.length < 3 || lastName.length < 3) {
        isValid = false;
        messageDiv.textContent +=
          "First Name and Last Name must have at least 3 characters.\n";
        submitButton.style.backgroundColor = "red";
      }
      if (phoneNumber.length !== 8 || !/^\d+$/.test(phoneNumber)) {
        isValid = false;
        messageDiv.textContent += "Phone number must contain exactly 8 digits.\n";
        submitButton.style.backgroundColor = "red";
      }
  
      //Handle Email Validation
      if (email === "" || !email.includes("@")) {
        isValid = false;
        messageDiv.textContent += "Please enter a valid email address.\n";
        submitButton.style.backgroundColor = "red";
      }
  
      // Submission
      if (isValid) {
        messageDiv.textContent = "Registration successful!";
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.style.backgroundColor = "lightgreen";
        messageDiv.style.color = "darkgreen";
        // Form submitted successfully
        displayUserName(firstName, lastName);
  
        // Store user's name in local storage
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
  
        // Disable form fields after successful registration
        disableFormFields(form);
      } else {
        messageDiv.style.color = "red";
      }
    });
  });
  
  function displayUserName(firstName, lastName) {
    var userNameElement = document.getElementById("userName");
    userNameElement.textContent = `Welcome, Explorer ${firstName} ${lastName}!`;
    userNameElement.style.display = "inline";
}

  
  function disableFormFields(form) {
    const inputFields = form.querySelectorAll("input, select, textarea"); //select all form elements
    inputFields.forEach((field) => {
      field.disabled = true;
    });
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true; // Disable the submit button
  }


    //arrow dropdown
    document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');

    // Toggle the dropdown on click
    dropdownToggle.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default anchor click behavior
        dropdown.classList.toggle('open'); // Toggle the 'open' class to show or hide the dropdown menu
    });

    // Close the dropdown when clicking outside
    document.addEventListener('click', function (event) {
        if (!dropdown.contains(event.target) && dropdown.classList.contains('open')) {
            dropdown.classList.remove('open');
        }
    });
});
