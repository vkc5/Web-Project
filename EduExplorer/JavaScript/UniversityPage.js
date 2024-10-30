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
    
    const universityData = {
        asu: {
            name: "Applied Science University",
            location: "Building 166, Road 23, Block 623, Eker",
            telephone: "17728777",
            fees: "92.7 per credit hour",
            ages: "18 years and above",
            workingHours: "Sunday to Thursday [8:00 am - 5:00 pm]",
            website: "https://www.asu.edu.bh/",
            image: "../image/UniversityImages/Applied Science University.jpg"
        },
        bu: {
            name: "British University",
            location: "Building 1242, Road 2719, Block 527, Saar",
            telephone: "17130303",
            fees: "7000 BD",
            ages: "18 years and above",
            workingHours: "Sunday to Thursday [8:30 am - 4:30 pm]",
            website: "https://bub.bh/",
            image: "../image/UniversityImages/British University.jpeg"
        },
        rcsi: {
            name: "RCSI",
            location: "Building 2441, Road 2835, Block 228, Busaiteen",
            telephone: "17351450",
            fees: "14,900 BD for Bahrainis and 17,550 for Non-Bahrainis",
            ages: "18 years and above",
            workingHours: "Sunday to Thursday [8:00 am - 5:00 pm]",
            website: "https://www.rcsi.com/bahrain/",
            image: "../image/UniversityImages/RCSI.jpg"
        },
        bp: {
            name: "Bahrain Polytechnic",
            location: "Road 4003, Block 840, Isa Town",
            telephone: "17897000",
            fees: "120 BD",
            ages: "18 years and above",
            workingHours: "Sunday to Thursday [8:00 am - 5:00 pm]",
            website: "https://www.polytechnic.bh/",
            image: "../image/UniversityImages/Bahrain Polytechnic.jpg"
        },
        uob: {
            name: "University of Bahrain",
            location: "Building 1017, Road 5418, Block 1054, Zallaq",
            telephone: "17438888",
            fees: "136 BD",
            ages: "18 years and above",
            workingHours: "Sunday to Thursday [8:00 am - 9:00 pm]",
            website: "https://www.uob.edu.bh/",
            image: "../image/UniversityImages/University of Bahrain.jpg"
        },
        bibf: {
            name: "BIBF University",
            location: "Building 1306, Block 346, Road 4625, Manama",
            telephone: "17815555",
            fees: "4000 BD",
            ages: "18 years and above",
            workingHours: "Sunday to Thursday [7:00 am – 7:00 pm]",
            website: "https://www.bibf.com/",
            image: "../image/UniversityImages/BIBF-Building.jpg"
        }
    };

    readMoreLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            popupModal.classList.remove('move-left'); // Reset card to original position
            const infoKey = link.getAttribute('data-info');
            const data = universityData[infoKey];
            if (data) {
                popupImage.src = data.image;
                popupInfo.innerHTML = `
                    <h2>Information Card</h2>
                    <p><strong>Location:</strong> ${data.location}</p>
                    <p><strong>Telephone:</strong> ${data.telephone}</p>
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
