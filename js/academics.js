document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('programModal');
    const viewButtons = document.querySelectorAll('.view-details');
    const closeModal = document.querySelector('.close-modal');

    // Program details content
    const programDetails = {
        secondary: {
            title: 'Secondary Level (Grades 9-10)',
            content: `
                <h3>Program Overview</h3>
                <p>Our secondary level program provides comprehensive education focusing on...</p>
                <h4>Core Subjects</h4>
                <ul>
                    <li>Mathematics</li>
                    <li>Science</li>
                    <li>English</li>
                    <li>Social Studies</li>
                </ul>
                <h4>Additional Activities</h4>
                <ul>
                    <li>Laboratory Work</li>
                    <li>Project-based Learning</li>
                    <li>Field Trips</li>
                </ul>
            `
        },
        higher: {
            title: 'Higher Secondary Level (Grades 11-12)',
            content: `
                <h3>Program Overview</h3>
                <p>The higher secondary program offers specialized streams...</p>
                <h4>Available Streams</h4>
                <ul>
                    <li>Science (Physics, Chemistry, Biology/Mathematics)</li>
                    <li>Management (Accounting, Economics, Business Studies)</li>
                    <li>Humanities (Literature, Sociology, Psychology)</li>
                </ul>
                <h4>Special Features</h4>
                <ul>
                    <li>Career Counseling</li>
                    <li>College Preparation</li>
                    <li>Internship Opportunities</li>
                </ul>
            `
        }
    };

    // Open modal with appropriate content
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const program = button.dataset.program;
            const details = programDetails[program];
            const modalBody = modal.querySelector('.modal-body');
            
            modalBody.innerHTML = `
                <h2>${details.title}</h2>
                ${details.content}
            `;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const tabId = button.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });
}); 