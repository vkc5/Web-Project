/*document.addEventListener('DOMContentLoaded', function () {
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
});*/

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
    const feedbackError = document.getElementById('feedback-error');

    // Added variables for filter 
    const filterIcon = document.getElementById('filter-icon');
    const filterPanel = document.getElementById('filter-panel');
    const priceFilter = document.getElementById('price-filter');
    const priceOutput = document.getElementById('price-output');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');  // Reset Button
    const locationFilter = document.getElementById('location-filter');
    const NurseyGrid = document.querySelector('.Nursey-grid');

    const maxPrice = 18000;  // Assuming 18,000 BD is the max value
    priceFilter.max = maxPrice;
    priceFilter.value = maxPrice; // Set the initial value to max
    priceOutput.textContent = `BD ${maxPrice}`; // Display initial price

    let hasRated = false; // To track if a star rating was made

    const NurseyData = {
        Evolution: {
            name: "Evolution Childcare",
            location: "Juffair",
            telephone: "17669079",
            fees: 775,
            Nurseries: "Private",
            ages: "6 months to 6 years",
            workingHours: "Sunday to Thursday [6:30 am - 4:00 pm]",
            website: "https://www.evolution-childcare.co.uk/",
            image: "../image/NurseryImages/Evolution.JPG"
        },
        KG: {
            name: "KG Kids",
            location: "Lary Al Shaikh",
            telephone: "17663556",
            fees: 550,
            Nurseries: "Public",
            ages: "18 months to 6 years",
            workingHours: "Sunday to Thursday [7:00 am - 2:00 pm]",
            website: "https://www.kgkids.com/",
            image: "../image/NurseryImages/KG Kids.jpg"
        },
        Little: {
            name: "Little Gems Preschool",
            location: "Saar",
            telephone: "17694356",
            fees: 795,
            Nurseries: "Private",
            ages: "18 months to 4 years",
            workingHours: "Sunday to Thursday [7:30 am - 1:30 pm]",
            website: "https://littlegemsbh.com/",
            image: "../image/NurseryImages/Little Gems Pre School.jpg"
        },
        Masabeeh: {
            name: "Masabeeh Al Amal Preschool",
            location: "Manama",
            telephone: "17776664",
            fees: 223,
            Nurseries: "Public",
            ages: "2 years to 4 years",
            workingHours: "Sunday to Thursday [7:30 am - 12:30 pm]",
            website: "https://bahrainschoolsguide.com/masabeeh-al-amal-preschool- spg/",
            image: "../image/NurseryImages/Masabeeh Al Amal Preschool.jpg"
        },
        Rawan: {
            name: "Rawan Preschool",
            location: "Bu Quwah",
            telephone: "17179373",
            fees: 550,
            Nurseries: "Public",
            ages: "3 years to 6 years",
            workingHours: "Sunday to Thursday [7:00 am - 2:00 pm]",
            website: "https://www.rawanpreschool.net/en/",
            image: "../image/NurseryImages/Rawan-Preschool-1-1204x800.jpg"
        },
        Reach: {
            name: "Reach Nursery",
            location: "Isa Town",
            telephone: "17663280",
            fees: 4000,
            Nurseries: "Private",
            ages: "4 months to 4 years",
            workingHours: "Sunday to Thursday [7:00 am - 1:00 pm]",
            website: "https://bahrainschoolsguide.com/reachnursery-spg/",
            image: "../image/NurseryImages/Reach Nursery.jpg"
        }
    };

    // Populate location dropdown dynamically
    function populateLocationFilter(data) {
        const uniqueLocations = [...new Set(Object.values(data).map(Nursey => Nursey.location))]; // Get unique locations
        uniqueLocations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationFilter.appendChild(option); // Add each location as an option
        });
    }

    // Function to render filtered Nursey
    function NurseySchool(filteredData) {
        NurseyGrid.innerHTML = ''; // Clear existing Nursey

        Object.keys(filteredData).forEach((key) => {
            const Nursey = filteredData[key];
            const NurseyItem = document.createElement('div');
            NurseyItem.classList.add('Nursey-item');
            NurseyItem.setAttribute('data-location', Nursey.location);
            NurseyItem.setAttribute('data-fees', parseFloat(Nursey.fees));
            NurseyItem.setAttribute('data-type', Nursey.Nurseries);

            NurseyItem.innerHTML = `
                <img src="${Nursey.image}" alt="${Nursey.name}">
                <h3>${Nursey.name}</h3>
                <a href="#" class="read-more" data-info="${key}">Read More</a>
            `;
            NurseyGrid.appendChild(NurseyItem);
        });

        // Reassign "Read More" event listeners to the dynamically added Nursey items
        const newReadMoreLinks = document.querySelectorAll('.read-more');
        newReadMoreLinks.forEach(function (link) {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                popupModal.classList.remove('move-left');
                const infoKey = link.getAttribute('data-info');
                const data = NurseyData[infoKey];
                if (data) {
                    popupImage.src = data.image;
                    popupInfo.innerHTML = `
                        <h2>Information Card</h2>
                        <p><strong>Location:</strong> ${data.location}</p>
                        <p><strong>Telephone:</strong> ${data.telephone}</p>
                        <p><strong>Nurseries:</strong> ${data.Nurseries}</p>
                        <p><strong>Fees:</strong>  ${data.fees} BD</p>
                        <p><strong>Working Hours:</strong> ${data.workingHours}</p>
                        <p><strong>Link to Website:</strong> <a href="${data.website}" target="_blank">${data.website}</a></p>
                        <a href="#" class="rate-me-button" id="rate-me-button">Rate Me</a>
                    `;
                    popupModal.style.display = 'flex';
                    setTimeout(() => {
                        popupModal.classList.add('show');
                    }, 10);
                }
            });
        });
    }

    NurseySchool(NurseyData); // Initial render of all Nursey

    closeBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const parentModal = btn.closest('.popup-modal') || btn.closest('.rating-modal');
            parentModal.classList.remove('show');
            setTimeout(() => {
                parentModal.style.display = 'none';
                if (parentModal === ratingModal) {
                    setTimeout(() => {
                        popupModal.classList.remove('move-left');
                    }, 10);
                    resetRatingModal();
                }
            }, 500);
        });
    });

    document.addEventListener('click', function (event) {
        if (event.target && event.target.id === 'rate-me-button') {
            event.preventDefault();
            popupModal.classList.add('move-left');
            setTimeout(() => {
                ratingModal.style.display = 'block';
                setTimeout(() => {
                    ratingModal.classList.add('show');
                }, 10);
            }, 500);
        }
    });

    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            stars.forEach((s, i) => {
                s.classList.toggle('selected', i <= index);
            });
            hasRated = true;
            feedbackError.style.display = 'none';
        });
    });

    submitFeedback.addEventListener('click', function () {
        const feedback = feedbackTextarea.value.trim();

        if (!hasRated && feedback === "") {
            feedbackError.style.display = 'block';
            return;
        }

        feedbackError.style.display = 'none';

        ratingModal.classList.remove('show');
        setTimeout(() => {
            ratingModal.style.display = 'none';
            thankYouMessage.style.display = 'block';
            setTimeout(() => {
                thankYouMessage.classList.add('show');
            }, 10);

            setTimeout(() => {
                thankYouMessage.classList.remove('show');
                setTimeout(() => {
                    thankYouMessage.style.display = 'none';
                    popupModal.classList.remove('move-left');
                    resetRatingModal();
                }, 500);
            }, 2000);
        }, 500);
    });

    function resetRatingModal() {
        hasRated = false;
        feedbackTextarea.value = "";
        stars.forEach((star) => star.classList.remove('selected'));
        feedbackError.style.display = 'none';
    }

    // Filter logic

    // Call function to populate location dropdown
    populateLocationFilter(NurseyData);

    filterIcon.addEventListener('click', function () {
        filterPanel.classList.toggle('open');
    });

    applyFiltersBtn.addEventListener('click', function () {
        const selectedLocation = locationFilter.value;
        const selectedPrice = parseFloat(priceFilter.value);
        const selectedType = document.querySelector('input[name="type"]:checked')?.value;

        const filteredData = Object.keys(NurseyData).filter(key => {
            const Nursey = NurseyData[key];
            const matchesLocation = selectedLocation === "" || Nursey.location === selectedLocation;
            const matchesPrice = parseFloat(Nursey.fees) <= selectedPrice;
            const matchesType = !selectedType || Nursey.Nurseries === selectedType;
            return matchesLocation && matchesPrice && matchesType;
        }).reduce((obj, key) => {
            obj[key] = NurseyData[key];
            return obj;
        }, {});

        NurseySchool(filteredData);
    });

    // Update the price filter value dynamically
    priceFilter.addEventListener('input', function () {
        priceOutput.textContent = `BD ${priceFilter.value}`;
    });

    // Reset filters
    resetFiltersBtn.addEventListener('click', function () {
        priceFilter.value = priceFilter.max; // Reset price range
        priceOutput.textContent = `BD ${priceFilter.max}`;
        locationFilter.value = ""; // Reset location filter
        document.querySelectorAll('input[name="type"]').forEach(input => input.checked = false); // Reset public/private filter
        NurseySchool(NurseyData); // Re-render all Nursey
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');

    // Toggle the dropdown on click
    dropdownToggle.addEventListener('click', function (event) {
        event.preventDefault();
        dropdown.classList.toggle('open');
    });

    // Close the dropdown when clicking outside
    document.addEventListener('click', function (event) {
        if (!dropdown.contains(event.target) && dropdown.classList.contains('open')) {
            dropdown.classList.remove('open');
        }
    });
});

