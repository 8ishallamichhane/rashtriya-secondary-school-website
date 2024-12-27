document.addEventListener('DOMContentLoaded', function() {
    // Notice Configuration
    const notices = [
        {
            type: 'text',
            content: `
                <h3>School Reopening Notice</h3>
                <p>Dear parents and students,</p>
                <p>The school will reopen on Monday, April 15th, 2024. Please ensure all students arrive by 8:30 AM.</p>
                <ul>
                    <li>Bring all necessary books and materials</li>
                    <li>Wear proper school uniform</li>
                    <li>Follow COVID-19 safety protocols</li>
                </ul>
            `,
            priority: 'high'
        },
        {
            type: 'image',
            content: `
                <h3>Annual Sports Meet 2024</h3>
                <img src="assets/images/notices/sports-meet.jpg" alt="Sports Meet Banner">
                <p>Join us for the Annual Sports Meet starting next week!</p>
            `,
            priority: 'medium'
        },
        {
            type: 'video',
            content: `
                <h3>School Achievement Highlights</h3>
                <video controls>
                    <source src="assets/videos/school-highlights.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <p>Watch our students' achievements from the past academic year.</p>
            `,
            priority: 'low'
        }
    ];

    const popup = document.getElementById('noticePopup');
    const noticeBody = document.getElementById('noticeBody');
    const closeBtn = document.querySelector('.close-notice');
    const gotItBtn = document.getElementById('noticeClose');
    const dontShowCheckbox = document.getElementById('dontShowAgain');

    // Function to check if notice should be shown
    function shouldShowNotice() {
        const dontShow = localStorage.getItem('dontShowNotice');
        const today = new Date().toDateString();

        // Only check "don't show again today" preference
        return dontShow !== today;
    }

    // Function to show notice
    function showNotice() {
        if (shouldShowNotice()) {
            // Get the first notice (highest priority)
            const notice = notices[0];
            
            if (notice) {
                noticeBody.innerHTML = notice.content;
                popup.style.display = 'block';
            }
        }
    }

    // Close notice handlers
    function closeNotice() {
        popup.style.display = 'none';
        if (dontShowCheckbox.checked) {
            localStorage.setItem('dontShowNotice', new Date().toDateString());
        }
    }

    // Event Listeners
    closeBtn.addEventListener('click', closeNotice);
    gotItBtn.addEventListener('click', closeNotice);

    // Close on outside click
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closeNotice();
        }
    });

    // Show notice immediately on page load
    showNotice();

    // Clear localStorage items older than today
    function clearOldStorage() {
        const today = new Date().toDateString();
        const lastClear = localStorage.getItem('lastStorageClear');
        
        if (lastClear !== today) {
            localStorage.clear();
            localStorage.setItem('lastStorageClear', today);
        }
    }

    // Clear old storage on page load
    clearOldStorage();
}); 