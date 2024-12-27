class Calendar {
    constructor() {
        this.date = new Date();
        this.currentMonth = this.date.getMonth();
        this.currentYear = this.date.getFullYear();
        this.events = new Map(); // Store events by date
        
        this.initializeCalendar();
        this.bindEvents();
    }

    initializeCalendar() {
        this.updateCalendarHeader();
        this.renderCalendar();
        this.loadEvents(); // Load initial events
    }

    bindEvents() {
        document.querySelector('.prev-month').addEventListener('click', () => this.changeMonth(-1));
        document.querySelector('.next-month').addEventListener('click', () => this.changeMonth(1));
        
        // Filter events
        document.getElementById('eventType').addEventListener('change', () => this.filterEvents());
        document.getElementById('monthSelect').addEventListener('change', (e) => {
            this.currentMonth = parseInt(e.target.value);
            this.renderCalendar();
        });
    }

    updateCalendarHeader() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        document.querySelector('.current-month').textContent = 
            `${monthNames[this.currentMonth]} ${this.currentYear}`;
    }

    renderCalendar() {
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const daysGrid = document.querySelector('.calendar-days');
        daysGrid.innerHTML = '';

        // Previous month's days
        const firstDayIndex = firstDay.getDay();
        for (let x = firstDayIndex; x > 0; x--) {
            const day = new Date(this.currentYear, this.currentMonth, -x + 1);
            this.createDayElement(daysGrid, day, true);
        }

        // Current month's days
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const day = new Date(this.currentYear, this.currentMonth, i);
            this.createDayElement(daysGrid, day, false);
        }

        // Next month's days
        const lastDayIndex = lastDay.getDay();
        for (let j = 1; j < 7 - lastDayIndex; j++) {
            const day = new Date(this.currentYear, this.currentMonth + 1, j);
            this.createDayElement(daysGrid, day, true);
        }
    }

    createDayElement(container, date, isDifferentMonth) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        if (isDifferentMonth) dayDiv.classList.add('different-month');
        if (this.isToday(date)) dayDiv.classList.add('today');

        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = date.getDate();
        dayDiv.appendChild(dayNumber);

        // Add events for this day
        const dateString = this.formatDate(date);
        const dayEvents = this.events.get(dateString) || [];
        dayEvents.forEach(event => {
            const eventDiv = this.createEventElement(event);
            dayDiv.appendChild(eventDiv);
        });

        container.appendChild(dayDiv);
    }

    createEventElement(event) {
        const eventDiv = document.createElement('div');
        eventDiv.className = `event ${event.type}`;
        eventDiv.textContent = event.title;
        eventDiv.addEventListener('click', () => this.showEventDetails(event));
        return eventDiv;
    }

    changeMonth(delta) {
        this.currentMonth += delta;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        } else if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.updateCalendarHeader();
        this.renderCalendar();
    }

    isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    }

    formatDate(date) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }

    loadEvents() {
        // Sample events - replace with your actual event loading logic
        this.events.set('2024-03-15', [
            { title: 'Parent-Teacher Conference', type: 'academic', time: '14:00', location: 'School Auditorium' }
        ]);
        // Render calendar after loading events
        this.renderCalendar();
    }

    filterEvents() {
        const selectedType = document.getElementById('eventType').value;
        // Implement filtering logic here
        this.renderCalendar();
    }

    showEventDetails(event) {
        // Implement modal or popup for event details
        console.log('Event details:', event);
    }
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Calendar();
}); 