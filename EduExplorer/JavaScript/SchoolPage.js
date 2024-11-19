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
    const SchoolGrid = document.querySelector('.School-grid');

    const maxPrice = 18000;  // Assuming 18,000 BD is the max value
    priceFilter.max = maxPrice;
    priceFilter.value = maxPrice; // Set the initial value to max
    priceOutput.textContent = `BD ${maxPrice}`; // Display initial price

    let hasRated = false; // To track if a star rating was made

    const SchoolData = {
        Noor: {
            name: "Al Noor International School",
            location: "Sitra",
            telephone: "17736773",
            fees: 738,
            Schools: "Private",
            ages: "3 years to 18 years",
            workingHours: "Sunday to Thursday [7:00 am - 2:00 pm]",
            website: "https://alnoor.com.bh/",
            image: "../image/SchoolPageImages/Al Noor International School.jpg"
        },
        Hidd: {
            name: "Al-Hidd Intermediate School",
            location: "Muharraq",
            telephone: "17671315",
            fees: 0,
            Schools: "Public",
            ages: "11 years to 15 years",
            workingHours: "Sunday to Thursday [6:00 am - 2:30 pm]",
            website: "https://moe.gov.bh/",
            image: "../image/SchoolPageImages/Al-Hidd Intermediate Primary Boys.jpg"
        },
        Kuldoon: {
            name: "Ibn Kuldoon National School",
            location: "Isa Town",
            telephone: "17780661",
            fees: 4980,
            Schools: "Private",
            ages: "4 years to 18 years",
            workingHours: "Sunday to Thursday [7:00 am - 2:00 pm]",
            website: "https://www.ikns.edu.bh/",
            image: "../image/SchoolPageImages/Ibn Kuldoon National School.jpg"
        },
        Philippine: {
            name: "Philippine School",
            location: "A’ali",
            telephone: "17645451",
            fees: 1200,
            Schools: "Private",
            ages: "3 years to 18 years",
            workingHours: "Sunday to Thursday [7:00 am - 3:00 pm]",
            website: "https://psb.edu.bh/",
            image: "../image/SchoolPageImages/Philippine School.jpeg"
        },
        Qurtoba: {
            name: "Qurtoba Intermediate School",
            location: "Manama",
            telephone: "17403415",
            fees: 0,
            Schools: "Public",
            ages: "3 years to 18 years",
            workingHours: "Sunday to Thursday [6:00 am - 2:00 pm]",
            website: "https://moe.gov.bh/",
            image: "../image/SchoolPageImages/Qurtoba Intermediate Girls.jpg"
        },
        Kalthoom: {
            name: "Um Kalthoom Intermediate School",
            location: "Isa Town",
            telephone: "17622639",
            fees: 0,
            Schools: "Public",
            ages: "11 years to 15 years",
            workingHours: "Sunday to Thursday [6:00 am - 2:00 pm]",
            website: "https://moe.gov.bh/",
            image: "../image/SchoolPageImages/Um Kalthoom Intermediate Girls.jpg"
        }
    };

    // Populate location dropdown dynamically
    function populateLocationFilter(data) {
        const uniqueLocations = [...new Set(Object.values(data).map(School => School.location))]; // Get unique locations
        uniqueLocations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationFilter.appendChild(option); // Add each location as an option
        });
    }

    // Function to render filtered School
    function renderSchool(filteredData) {
        SchoolGrid.innerHTML = ''; // Clear existing School

        Object.keys(filteredData).forEach((key) => {
            const School = filteredData[key];
            const SchoolItem = document.createElement('div');
            SchoolItem.classList.add('School-item');
            SchoolItem.setAttribute('data-location', School.location);
            SchoolItem.setAttribute('data-fees', parseFloat(School.fees));
            SchoolItem.setAttribute('data-type', School.Schools);

            SchoolItem.innerHTML = `
                <img src="${School.image}" alt="${School.name}">
                <h3>${School.name}</h3>
                <a href="#" class="read-more" data-info="${key}">Read More</a>
            `;
            SchoolGrid.appendChild(SchoolItem);
        });

        // Reassign "Read More" event listeners to the dynamically added School items
        const newReadMoreLinks = document.querySelectorAll('.read-more');
        newReadMoreLinks.forEach(function (link) {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                popupModal.classList.remove('move-left');
                const infoKey = link.getAttribute('data-info');
                const data = SchoolData[infoKey];
                if (data) {
                    popupImage.src = data.image;
                    popupInfo.innerHTML = `
                        <h2>Information Card</h2>
                        <p><strong>Location:</strong> ${data.location}</p>
                        <p><strong>Telephone:</strong> ${data.telephone}</p>
                        <p><strong>Schools:</strong> ${data.Schools}</p>
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

    renderSchool(SchoolData); // Initial render of all School

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
    populateLocationFilter(SchoolData);

    filterIcon.addEventListener('click', function () {
        filterPanel.classList.toggle('open');
    });

    applyFiltersBtn.addEventListener('click', function () {
        const selectedLocation = locationFilter.value;
        const selectedPrice = parseFloat(priceFilter.value);
        const selectedType = document.querySelector('input[name="type"]:checked')?.value;

        const filteredData = Object.keys(SchoolData).filter(key => {
            const School = SchoolData[key];
            const matchesLocation = selectedLocation === "" || School.location === selectedLocation;
            const matchesPrice = parseFloat(School.fees) <= selectedPrice;
            const matchesType = !selectedType || School.Schools === selectedType;
            return matchesLocation && matchesPrice && matchesType;
        }).reduce((obj, key) => {
            obj[key] = SchoolData[key];
            return obj;
        }, {});

        renderSchool(filteredData);
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
        renderSchool(SchoolData); // Re-render all School
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
