document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const ITEMS_PER_PAGE = 6;
    let currentPage = 1;
    let filteredItems = [];

    // Test data
    const newsEvents = [
        {
            type: 'news',
            title: 'School Achieves 100% Results',
            date: '2024-03-15',
            image: 'https://via.placeholder.com/400x300',
            description: 'Our school has achieved outstanding results in SEE examinations with all students passing with distinction.',
            link: '#'
        },
        {
            type: 'event',
            title: 'Annual Sports Meet 2024',
            date: '2024-04-10',
            image: 'https://via.placeholder.com/400x300',
            description: 'Join us for our annual sports meet featuring various athletic competitions and team sports.',
            time: '9:00 AM - 4:00 PM',
            venue: 'School Ground'
        },
        {
            type: 'news',
            title: 'New Science Lab',
            date: '2024-03-20',
            image: 'https://via.placeholder.com/400x300',
            description: 'State-of-the-art science laboratory inaugurated to enhance practical learning experience.',
            link: '#'
        },
        // Add more items for testing pagination
        {
            type: 'event',
            title: 'Cultural Program',
            date: '2024-04-15',
            image: 'https://via.placeholder.com/400x300',
            description: 'Annual cultural program showcasing student talents.',
            time: '2:00 PM - 6:00 PM',
            venue: 'School Auditorium'
        },
        {
            type: 'news',
            title: 'Teacher Training Workshop',
            date: '2024-03-25',
            image: 'https://via.placeholder.com/400x300',
            description: 'Teachers participate in professional development workshop.',
            link: '#'
        }
    ];

    // Initialize filteredItems with all items
    filteredItems = [...newsEvents];

    // Filter functionality
    function initializeFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter items
                filteredItems = filter === 'all' 
                    ? [...newsEvents]
                    : newsEvents.filter(item => item.type === filter);

                currentPage = 1;
                loadNewsAndEvents();
            });
        });
    }

    // Search functionality
    function initializeSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                
                filteredItems = newsEvents.filter(item => 
                    item.title.toLowerCase().includes(searchTerm) ||
                    item.description.toLowerCase().includes(searchTerm)
                );

                currentPage = 1;
                loadNewsAndEvents();
            });
        }
    }

    // Pagination
    function updatePagination() {
        const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
        const pagination = document.querySelector('.pagination');
        if (!pagination) return;

        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `
            <button class="page-btn prev-btn" ${currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
        `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
                <button class="page-btn ${i === currentPage ? 'active' : ''}" 
                        data-page="${i}">${i}</button>
            `;
        }

        // Next button
        paginationHTML += `
            <button class="page-btn next-btn" ${currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
        `;

        pagination.innerHTML = paginationHTML;

        // Add event listeners
        pagination.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('prev-btn') && currentPage > 1) {
                    currentPage--;
                } else if (btn.classList.contains('next-btn') && currentPage < totalPages) {
                    currentPage++;
                } else if (!btn.classList.contains('prev-btn') && !btn.classList.contains('next-btn')) {
                    currentPage = parseInt(btn.dataset.page);
                }
                loadNewsAndEvents();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }

    // Create cards
    function createNewsCard(item) {
        return `
            <div class="news-card fade-in">
                <div class="news-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="news-content">
                    <div class="news-date">${new Date(item.date).toLocaleDateString()}</div>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <a href="#" class="read-more" data-id="${newsEvents.indexOf(item)}">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `;
    }

    function createEventCard(item) {
        return `
            <div class="event-card fade-in">
                <div class="event-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="event-content">
                    <div class="event-date">${new Date(item.date).toLocaleDateString()}</div>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="event-details">
                        <span><i class="far fa-clock"></i> ${item.time}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${item.venue}</span>
                    </div>
                    <a href="#" class="read-more" data-id="${newsEvents.indexOf(item)}">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `;
    }

    // Modal functionality
    function initializeModal() {
        const modal = document.querySelector('.news-modal');
        if (!modal) return;

        document.querySelectorAll('.read-more').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const itemId = parseInt(btn.dataset.id);
                const item = newsEvents[itemId];
                
                modal.querySelector('.modal-date').textContent = new Date(item.date).toLocaleDateString();
                modal.querySelector('.modal-title').textContent = item.title;
                modal.querySelector('.modal-description').textContent = item.description;
                
                if (item.type === 'event') {
                    modal.querySelector('.modal-details').innerHTML = `
                        <span><i class="far fa-clock"></i> ${item.time}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${item.venue}</span>
                    `;
                } else {
                    modal.querySelector('.modal-details').innerHTML = '';
                }

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Load news and events
    function loadNewsAndEvents() {
        const newsGrid = document.querySelector('.news-grid');
        if (!newsGrid) return;

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const pageItems = filteredItems.slice(startIndex, endIndex);

        const newsEventsHTML = pageItems.map(item => 
            item.type === 'news' ? createNewsCard(item) : createEventCard(item)
        ).join('');

        newsGrid.innerHTML = newsEventsHTML;

        updatePagination();
        initializeModal();
    }

    // Initialize everything
    if (document.querySelector('.news-events-full')) {
        initializeFilters();
        initializeSearch();
    }
    loadNewsAndEvents();
}); 