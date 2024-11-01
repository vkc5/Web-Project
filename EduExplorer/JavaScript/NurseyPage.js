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
    
    const NurseryData = {
        Evolution: {
            name: "Evolution Childcare",
            location: "Building 160, Road 4005, Block 340, Juffair",
            telephone: "17669079",
            fees: "775 BD",
            ages: "6 months to 6 years",
            workingHours: "Sunday to Thursday [6:30 am - 4:00 pm]",
            website: "https://www.evolution-childcare.co.uk/",
            image: "../image/NurseryImages/Evolution.JPG"
        },
        KG: {
            name: "KG Kids",
            location: "Building 232, Road 2008, Block 930, Lary Al Shaikh",
            telephone: "17663556",
            fees: "550 BD",
            ages: "18 months to 6 years",
            workingHours: "Sunday to Thursday [7:00 am - 2:00 pm]",
            website: "https://www.kgkids.com/",
            image: "../image/NurseryImages/KG Kids.jpg"
        },
        Little: {
            name: "Little Gems Preschool",
            location: "Building 73, Avenue 21, Saar 517",
            telephone: "17694356",
            fees: "795 BD",
            ages: "18 months to 4 years",
            workingHours: "Sunday to Thursday [7:30 am - 1:30 pm]",
            website: "https://littlegemsbh.com/",
            image: "../image/NurseryImages/Little Gems Pre School.jpg"
        },
        Masabeeh: {
            name: "Masabeeh Al Amal Preschool",
            location: "Villa 1712, Road 2857, Barbar, Manama",
            telephone: "17776664",
            fees: "223 BD",
            ages: "2 years to 4 years",
            workingHours: "Sunday to Thursday [7:30 am - 12:30 pm]",
            website: "https://bahrainschoolsguide.com/masabeeh-al-amal-preschool- spg/",
            image: "../image/NurseryImages/Masabeeh Al Amal Preschool.jpg"
        },
        Rawan: {
            name: "Rawan Preschool",
            location: "Villa 3657, Road 5773, Block 457, Bu Quwah",
            telephone: "17179373",
            fees: "550 BD",
            ages: "3 years to 6 years",
            workingHours: "Sunday to Thursday [7:00 am - 2:00 pm]",
            website: "https://www.rawanpreschool.net/en/",
            image: "../image/NurseryImages/Rawan-Preschool-1-1204x800.jpg"
        },
        Reach: {
            name: "Reach Nursery",
            location: "Villa 3793, Road 915, Block 809, Isa Town",
            telephone: "17663280",
            fees: "4000 BD",
            ages: "4 months to 4 years",
            workingHours: "Sunday to Thursday [7:00 am - 1:00 pm]",
            website: "https://bahrainschoolsguide.com/reachnursery-spg/",
            image: "../image/NurseryImages/Reach Nursery.jpg"
        }
    };

    readMoreLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            popupModal.classList.remove('move-left'); // Reset card to original position
            const infoKey = link.getAttribute('data-info');
            const data = NurseryData[infoKey];
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
