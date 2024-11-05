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
    const collegeGrid = document.querySelector('.college-grid');

    let hasRated = false; // To track if a star rating was made

    const universityData = {
        asu: {
            name: "Applied Science University",
            location: "Eker",
            telephone: "17728777",
            Colleges: "Private",
            fees: 12420,
            ages: "18 years and above",
            workingHours: "Sunday to Thursday [8:00 am - 5:00 pm]",
            website: "https://www.asu.edu.bh/",
            image: "../image/UniversityImages/Applied Science University.jpg"
        },
        bu: {
            name: "British University",
            location: "Saar",
            telephone: "17130303",
            Colleges: "Private",
            fees: 7000,
            ages: "18 years and above",
            workingHours: "Sunday to Thursday [8:30 am - 4:30 pm]",
            website: "https://bub.bh/",
            image: "../image/UniversityImages/British University.jpeg"
        },
        rcsi: {
            name: "RCSI",
            location: "Busaiteen",
            telephone: "17351450",
            Colleges: "Private",
            fees: 14900,
            ages: "18 years and above",
            workingHours: "Sunday to Thursday [8:00 am - 5:00 pm]",
            website: "https://www.rcsi.com/bahrain/",
            image: "../image/UniversityImages/RCSI.jpg"
        },
        bp: {
            name: "Bahrain Polytechnic",
            location: "Isa Town",
            telephone: "17897000",
            Colleges: "Public",
            fees: 120,
            ages: "18 years and above",
            workingHours: "Sunday to Thursday [8:00 am - 5:00 pm]",
            website: "https://www.polytechnic.bh/",
            image: "../image/UniversityImages/Bahrain Polytechnic.jpg"
        },
        uob: {
            name: "University of Bahrain",
            location: "Zallaq",
            telephone: "17438888",
            Colleges: "Public",
            fees: 136,
            ages: "18 years and above",
            workingHours: "Sunday to Thursday [8:00 am - 9:00 pm]",
            website: "https://www.uob.edu.bh/",
            image: "../image/UniversityImages/University of Bahrain.jpg"
        },
        bibf: {
            name: "BIBF University",
            location: "Manama",
            telephone: "17815555",
            Colleges: "Private",
            fees: 4000,
            ages: "18 years and above",
            workingHours: "Sunday to Thursday [7:00 am – 7:00 pm]",
            website: "https://www.bibf.com/",
            image: "../image/UniversityImages/BIBF-Building.jpg"
        }
    };

    // Populate location dropdown dynamically
    function populateLocationFilter(data) {
        const uniqueLocations = [...new Set(Object.values(data).map(college => college.location))]; // Get unique locations
        uniqueLocations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationFilter.appendChild(option); // Add each location as an option
        });
    }

    // Function to render filtered colleges
    function renderColleges(filteredData) {
        collegeGrid.innerHTML = ''; // Clear existing colleges

        Object.keys(filteredData).forEach((key) => {
            const college = filteredData[key];
            const collegeItem = document.createElement('div');
            collegeItem.classList.add('college-item');
            collegeItem.setAttribute('data-location', college.location);
            collegeItem.setAttribute('data-fees', parseFloat(college.fees));
            collegeItem.setAttribute('data-type', college.Colleges);

            collegeItem.innerHTML = `
                <img src="${college.image}" alt="${college.name}">
                <h3>${college.name}</h3>
                <a href="#" class="read-more" data-info="${key}">Read More</a>
            `;
            collegeGrid.appendChild(collegeItem);
        });

        // Reassign "Read More" event listeners to the dynamically added college items
        const newReadMoreLinks = document.querySelectorAll('.read-more');
        newReadMoreLinks.forEach(function (link) {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                popupModal.classList.remove('move-left');
                const infoKey = link.getAttribute('data-info');
                const data = universityData[infoKey];
                if (data) {
                    popupImage.src = data.image;
                    popupInfo.innerHTML = `
                        <h2>Information Card</h2>
                        <p><strong>Location:</strong> ${data.location}</p>
                        <p><strong>Telephone:</strong> ${data.telephone}</p>
                        <p><strong>Colleges:</strong> ${data.Colleges}</p>
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

    renderColleges(universityData); // Initial render of all universities

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
    populateLocationFilter(universityData);

    filterIcon.addEventListener('click', function () {
        filterPanel.classList.toggle('open');
    });

    applyFiltersBtn.addEventListener('click', function () {
        const selectedLocation = locationFilter.value;
        const selectedPrice = parseFloat(priceFilter.value);
        const selectedType = document.querySelector('input[name="type"]:checked')?.value;

        const filteredData = Object.keys(universityData).filter(key => {
            const college = universityData[key];
            const matchesLocation = selectedLocation === "" || college.location === selectedLocation;
            const matchesPrice = parseFloat(college.fees) <= selectedPrice;
            const matchesType = !selectedType || college.Colleges === selectedType;
            return matchesLocation && matchesPrice && matchesType;
        }).reduce((obj, key) => {
            obj[key] = universityData[key];
            return obj;
        }, {});

        renderColleges(filteredData);
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
        renderColleges(universityData); // Re-render all colleges
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
