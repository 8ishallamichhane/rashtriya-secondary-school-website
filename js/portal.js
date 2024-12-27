document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');
    const logoutBtn = document.getElementById('logoutBtn');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const studentId = document.getElementById('studentId').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Basic validation
        if (!studentId || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Here you would typically make an API call to verify credentials
        // For demo purposes, we'll just show the dashboard
        loginSuccess();

        // Store login state if remember me is checked
        if (rememberMe) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('studentId', studentId);
        }
    });

    // Handle logout
    logoutBtn.addEventListener('click', function() {
        loginSection.style.display = 'block';
        dashboardSection.style.display = 'none';
        loginForm.reset();
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('studentId');
    });

    // Dashboard functionality
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    const contentSections = document.querySelectorAll('.content-section');

    // Function to show content section
    function showContent(contentId) {
        // Hide all content sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        // Remove active class from all cards
        dashboardCards.forEach(card => {
            card.classList.remove('active');
        });

        // Show selected content section
        const selectedContent = document.getElementById(`${contentId}Content`);
        if (selectedContent) {
            selectedContent.classList.add('active');
        }

        // Add active class to selected card
        const selectedCard = document.querySelector(`[data-content="${contentId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('active');
        }
    }

    // Add click event listeners to dashboard cards
    dashboardCards.forEach(card => {
        card.addEventListener('click', () => {
            const contentType = card.dataset.content;
            showContent(contentType);
        });
    });

    // Show default content (courses) when dashboard loads
    function initializeDashboard() {
        if (document.getElementById('dashboardSection').style.display !== 'none') {
            showContent('courses');
        }
    }

    // Initialize dashboard after successful login
    function loginSuccess() {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('dashboardSection').style.display = 'block';
        document.getElementById('studentName').textContent = 
            document.getElementById('studentId').value;
        initializeDashboard();
    }

    // Check login state on page load
    function checkLoginState() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            const studentId = localStorage.getItem('studentId');
            document.getElementById('studentId').value = studentId;
            loginSuccess();
        }
    }

    // Initialize
    checkLoginState();
});