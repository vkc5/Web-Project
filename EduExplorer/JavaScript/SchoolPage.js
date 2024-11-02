document.addEventListener('DOMContentLoaded', function () {
    const readMoreLinks = document.querySelectorAll('.read-more');
    const popupModal = document.getElementById('popup-modal');
    const ratingModal = document.getElementById('rating-modal');
    const thankYouMessage = document.getElementById('thank-you-message');
    const popupInfo = document.getElementById('popup-info');
    const popupImage = document.getElementById('popup-image');
    const closeBtns = document.querySelectorAll('.close');
    const submitFeedback = document.getElementById('submit-feedback');
    const feedbackTextarea = document.getElementById('feedback');
    const stars = document.querySelectorAll('.rating-stars i');
    const feedbackError = document.getElementById('feedback-error'); // Error message element

    let hasRated = false; // To track if a star rating was made

    const SchoolData = {
        Noor: {
            name: "Al Noor International School",
            location: "Building 108, Road 1104, Block 611, Sitra",
            telephone: "17736773",
            fees: "738 BD",
            School: "Private",
            ages: "3 years to 18 years",
            workingHours: "Sunday to Thursday [7:00 am - 2:00 pm]",
            website: "https://alnoor.com.bh/",
            image: "../image/SchoolPageImages/Al Noor International School.jpg"
        },
        Hidd: {
            name: "Al-Hidd Intermediate School",
            location: "Building 263, Road 207, Block 102, Muharraq",
            telephone: "17671315",
            fees: "-",
            School: "Public",
            ages: "11 years to 15 years",
            workingHours: "Sunday to Thursday [6:00 am - 2:30 pm]",
            website: "https://moe.gov.bh/",
            image: "../image/SchoolPageImages/Al-Hidd Intermediate Primary Boys.jpg"
        },
        Kuldoon: {
            name: "Ibn Kuldoon National School",
            location: "Building 161, Road 4111, Block 841, Isa Town",
            telephone: "17780661",
            fees: "4980 BD",
            School: "Private",
            ages: "4 years to 18 years",
            workingHours: "Sunday to Thursday [7:00 am - 2:00 pm]",
            website: "https://www.ikns.edu.bh/",
            image: "../image/SchoolPageImages/Ibn Kuldoon National School.jpg"
        },
        Philippine: {
            name: "Philippine School",
            location: "Building 989, Road 3222, Block 732, A’ali",
            telephone: "17645451",
            fees: "1200 BD",
            School: "Private",
            ages: "3 years to 18 years",
            workingHours: "Sunday to Thursday [7:00 am - 3:00 pm]",
            website: "https://psb.edu.bh/",
            image: "../image/SchoolPageImages/Philippine School.jpeg"
        },
        Qurtoba: {
            name: "Qurtoba Intermediate School",
            location: "Building 69, Avenue 61, Block 361, Manama",
            telephone: "17403415",
            fees: "-",
            School: "Public",
            ages: "3 years to 18 years",
            workingHours: "Sunday to Thursday [6:00 am - 2:00 pm]",
            website: "https://moe.gov.bh/",
            image: "../image/SchoolPageImages/Qurtoba Intermediate Girls.jpg"
        },
        Kalthoom: {
            name: "Um Kalthoom Intermediate School",
            location: "Building 816, Road 1525, Block 813, Isa Town",
            telephone: "17622639",
            fees: "-",
            School: "Public",
            ages: "11 years to 15 years",
            workingHours: "Sunday to Thursday [6:00 am - 2:00 pm]",
            website: "https://moe.gov.bh/",
            image: "../image/SchoolPageImages/Um Kalthoom Intermediate Girls.jpg"
        }
    };

    readMoreLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            popupModal.classList.remove('move-left'); // Reset card to original position
            const infoKey = link.getAttribute('data-info');
            const data = SchoolData[infoKey];
            if (data) {
                popupImage.src = data.image;
                popupInfo.innerHTML = `
                    <h2>Information Card</h2>
                    <p><strong>Location:</strong> ${data.location}</p>
                    <p><strong>Telephone:</strong> ${data.telephone}</p>
                    <p><strong>School:</strong> ${data.School}</p>
                    <p><strong>Fees:</strong> ${data.fees}</p>
                    <p><strong>Ages:</strong> ${data.ages}</p>
                    <p><strong>Working Hours:</strong> ${data.workingHours}</p>
                    <p><strong>Link to Website:</strong> <a href="${data.website}" target="_blank">${data.website}</a></p>
                    <a href="#" class="rate-me-button" id="rate-me-button">Rate Me</a>
                `;
                popupModal.style.display = 'flex';
                setTimeout(() => {
                    popupModal.classList.add('show'); // Show modal with animation
                }, 10);
            }
        });
    });

    closeBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const parentModal = btn.closest('.popup-modal') || btn.closest('.rating-modal');
            parentModal.classList.remove('show');
            setTimeout(() => {
                parentModal.style.display = 'none';
                if (parentModal === ratingModal) {
                    setTimeout(() => {
                        popupModal.classList.remove('move-left'); // Reset card to original position smoothly
                    }, 10); // A small delay to ensure the modal transition finishes first
                    resetRatingModal(); // Reset stars and feedback
                }
            }, 500);
        });
    });

    document.addEventListener('click', function (event) {
        if (event.target && event.target.id === 'rate-me-button') {
            event.preventDefault();
            popupModal.classList.add('move-left'); // Move the card to the left
            setTimeout(() => {
                ratingModal.style.display = 'block';
                setTimeout(() => {
                    ratingModal.classList.add('show'); // Show the rating modal next to it
                }, 10);
            }, 500);
        }
    });

    // Track if a star is selected
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            stars.forEach((s, i) => {
                s.classList.toggle('selected', i <= index);
            });
            hasRated = true; // User has rated
            feedbackError.style.display = 'none'; // Hide error if a star is selected
        });
    });

    // Submit feedback button click
    submitFeedback.addEventListener('click', function () {
        const feedback = feedbackTextarea.value.trim();

        // Validation: Check if user provided either a rating or feedback
        if (!hasRated && feedback === "") {
            feedbackError.style.display = 'block'; // Show error message inside the feedback card
            return; // Do not proceed
        }

        feedbackError.style.display = 'none'; // Hide error if validation passes

        // Show thank you message after valid submission
        ratingModal.classList.remove('show');
        setTimeout(() => {
            ratingModal.style.display = 'none';
            thankYouMessage.style.display = 'block';
            setTimeout(() => {
                thankYouMessage.classList.add('show');
            }, 10);

            // Hide the thank you message after a few seconds and reset card
            setTimeout(() => {
                thankYouMessage.classList.remove('show');
                setTimeout(() => {
                    thankYouMessage.style.display = 'none';
                    popupModal.classList.remove('move-left'); // Smoothly reset card to original position
                    resetRatingModal(); // Reset stars and feedback after submission
                }, 500);
            }, 2000); // Thank you message visible for 2 seconds
        }, 500);
    });

    // Reset the feedback modal when closed or if needed
    function resetRatingModal() {
        hasRated = false;
        feedbackTextarea.value = ""; // Clear feedback textarea
        stars.forEach((star) => star.classList.remove('selected')); // Unselect all stars
        feedbackError.style.display = 'none'; // Hide error message
    }
});

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
