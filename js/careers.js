document.addEventListener('DOMContentLoaded', function() {
    // Job Filtering
    const departmentFilter = document.getElementById('departmentFilter');
    const typeFilter = document.getElementById('typeFilter');
    const jobCards = document.querySelectorAll('.job-card');

    function filterJobs() {
        const selectedDepartment = departmentFilter.value;
        const selectedType = typeFilter.value;

        jobCards.forEach(card => {
            const department = card.dataset.department;
            const type = card.dataset.type;
            
            const departmentMatch = selectedDepartment === 'all' || department === selectedDepartment;
            const typeMatch = selectedType === 'all' || type === selectedType;

            if (departmentMatch && typeMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    departmentFilter.addEventListener('change', filterJobs);
    typeFilter.addEventListener('change', filterJobs);

    // Load More Jobs
    const loadMoreBtn = document.getElementById('loadMoreJobs');
    let currentPage = 1;

    loadMoreBtn.addEventListener('click', function() {
        // Simulate loading more jobs
        currentPage++;
        loadMoreJobs(currentPage);
    });

    function loadMoreJobs(page) {
        // Here you would typically make an API call to load more jobs
        // For demo purposes, we'll just show a message
        if (page > 2) {
            loadMoreBtn.textContent = 'No More Positions';
            loadMoreBtn.disabled = true;
        }
    }

    // Contact Form Submission
    const contactForm = document.getElementById('hrContactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            
            // Here you would typically send the form data to your server
            // For demo purposes, we'll just show an alert
            alert('Thank you for your message. HR will contact you soon.');
            
            // Reset form
            this.reset();
        });
    }

    // Apply Button Click Tracking
    const applyButtons = document.querySelectorAll('.apply-btn');
    applyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const jobTitle = this.closest('.job-card').querySelector('h3').textContent;
            // Here you would typically track application clicks
            console.log(`Application started for: ${jobTitle}`);
        });
    });
}); 