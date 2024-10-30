document.addEventListener('DOMContentLoaded', function () {
    const readMoreLinks = document.querySelectorAll('.read-more');
    const popupModal = document.getElementById('popup-modal');
    const popupInfo = document.getElementById('popup-info');
    const popupImage = document.getElementById('popup-image');
    const closeBtn = document.querySelector('.close');

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
                    <a href="#" class="rate-me-button">Rate Me</a>
                `;
                popupModal.style.display = 'flex';
                setTimeout(() => {
                    popupModal.classList.add('show'); // Show the modal with animation
                }, 10);
            }
        });
    });

    // Close the modal when the close button is clicked
    closeBtn.addEventListener('click', function () {
        popupModal.classList.remove('show');
        setTimeout(() => {
            popupModal.style.display = 'none';
        }, 500); // Wait for animation to finish
    });

    // Close the modal when clicking outside of the modal content
    window.addEventListener('click', function (event) {
        if (event.target === popupModal) {
            popupModal.classList.remove('show');
            setTimeout(() => {
                popupModal.style.display = 'none';
            }, 500); // Wait for animation to finish
        }
    });
});
