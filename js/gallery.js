document.addEventListener('DOMContentLoaded', function() {
    const galleryData = [
        {
            src: '../assets/images/rss.jpg',
            title: 'School Building',
            description: 'Modern school infrastructure',
            category: 'campus'
        },
        {
            src: '../assets/images/cultural-images/holi1.jpg',
            title: 'Holi Celebration',
            description: 'Falgun Purnima (25/03/2024)',
            category: 'cultural'
        },
        // Add about 20-30 more images with different categories
        {
            src: '../assets/images/events-images/Picnic2.JPG',
            title: 'Science Lab',
            description: 'Supa Deurali picnic organized by Grade 9 students. ',
            category: 'events'
        }
    ];

    function initGallery() {
        const galleryContainer = document.querySelector('.gallery-grid');
        if (!galleryContainer) return;

        // Load initial images
        loadGalleryItems(galleryData);

        // Initialize filter buttons
        initializeFilters();

        // Initialize lightbox
        initializeLightbox();
    }

    function loadGalleryItems(items) {
        const galleryContainer = document.querySelector('.gallery-grid');
        const galleryHTML = items.map(item => createGalleryItem(item)).join('');
        galleryContainer.innerHTML = galleryHTML;
    }

    function createGalleryItem(item) {
        return `
            <div class="gallery-item" data-category="${item.category}">
                <img src="${item.src}" alt="${item.title}" loading="lazy">
                <div class="gallery-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <button class="view-image" data-image="${item.src}">
                        <i class="fas fa-expand"></i>
                    </button>
                </div>
            </div>
        `;
    }

    function initializeFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.filter;
                
                // Update active button state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter gallery items
                const filteredItems = category === 'all' 
                    ? galleryData 
                    : galleryData.filter(item => item.category === category);
                
                loadGalleryItems(filteredItems);
                initializeLightbox(); // Reinitialize lightbox for new items
            });
        });
    }

    function initializeLightbox() {
        const lightbox = document.querySelector('.lightbox-modal');
        const lightboxImg = lightbox.querySelector('.lightbox-image');
        const closeBtn = lightbox.querySelector('.close-lightbox');
        const prevBtn = lightbox.querySelector('.prev-btn');
        const nextBtn = lightbox.querySelector('.next-btn');
        let currentIndex = 0;

        // Add click handlers to all gallery items
        document.querySelectorAll('.view-image').forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = index;
                openLightbox(btn.dataset.image);
            });
        });

        function openLightbox(imageSrc) {
            lightbox.style.display = 'block';
            lightboxImg.src = imageSrc;
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Navigation handlers
        closeBtn.addEventListener('click', closeLightbox);
        
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
            lightboxImg.src = galleryData[currentIndex].src;
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % galleryData.length;
            lightboxImg.src = galleryData[currentIndex].src;
        });

        // Close on outside click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'none') return;
            
            switch(e.key) {
                case 'ArrowLeft': prevBtn.click(); break;
                case 'ArrowRight': nextBtn.click(); break;
                case 'Escape': closeLightbox(); break;
            }
        });
    }

    // Initialize gallery
    initGallery();
}); 