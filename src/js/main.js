document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            // Save theme preference to localStorage
            const isDarkTheme = document.body.classList.contains('dark-theme');
            localStorage.setItem('darkTheme', isDarkTheme);
        });
        
        // Load theme preference from localStorage
        const savedTheme = localStorage.getItem('darkTheme');
        if (savedTheme === 'true') {
            document.body.classList.add('dark-theme');
        } else if (savedTheme === 'false') {
            document.body.classList.remove('dark-theme');
        }
    }
    
    // Navigation Dropdown
    const navDropdownBtns = document.querySelectorAll('.nav-dropdown-btn');
    navDropdownBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isVisible = content.style.display === 'block';
            
            // Close all dropdowns
            document.querySelectorAll('.nav-dropdown-content').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
            
            // Toggle current dropdown
            if (!isVisible) {
                content.style.display = 'block';
            }
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-group')) {
            document.querySelectorAll('.nav-dropdown-content').forEach(dropdown => {
                dropdown.style.display = '';
            });
        }
    });
    
    // Copy Code Button
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.parentElement;
            const code = codeBlock.querySelector('code').innerText;
            
            navigator.clipboard.writeText(code).then(() => {
                // Show success feedback
                const originalIcon = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i>';
                
                setTimeout(() => {
                    this.innerHTML = originalIcon;
                }, 2000);
            });
        });
    });
    
    // API Tabs
    const apiTabs = document.querySelectorAll('.api-tab');
    apiTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            document.querySelectorAll('.api-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content
            document.querySelectorAll('.api-code').forEach(code => code.classList.remove('active'));
            document.getElementById(`${tabId}-code`).classList.add('active');
        });
    });
    
    // Setup Steps Navigation
    const nextButtons = document.querySelectorAll('.next-step-btn');
    const prevButtons = document.querySelectorAll('.prev-step-btn');
    
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.setup-detail');
            const currentIndex = Array.from(currentStep.parentElement.children).indexOf(currentStep);
            const nextStep = currentStep.parentElement.children[currentIndex + 1];
            
            if (nextStep) {
                // Hide current step
                currentStep.style.display = 'none';
                
                // Show next step
                nextStep.style.display = 'block';
                
                // Update progress indicator
                const progressSteps = document.querySelectorAll('.progress-step');
                progressSteps[currentIndex].classList.remove('active');
                progressSteps[currentIndex + 1].classList.add('active');
            }
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.setup-detail');
            const currentIndex = Array.from(currentStep.parentElement.children).indexOf(currentStep);
            const prevStep = currentStep.parentElement.children[currentIndex - 1];
            
            if (prevStep) {
                // Hide current step
                currentStep.style.display = 'none';
                
                // Show previous step
                prevStep.style.display = 'block';
                
                // Update progress indicator
                const progressSteps = document.querySelectorAll('.progress-step');
                progressSteps[currentIndex].classList.remove('active');
                progressSteps[currentIndex - 1].classList.add('active');
            }
        });
    });
    
    // Models Carousel
    const carouselNextBtn = document.querySelector('.carousel-control.next');
    const carouselPrevBtn = document.querySelector('.carousel-control.prev');
    const carouselIndicators = document.querySelectorAll('.carousel-indicators .indicator');
    const carousel = document.querySelector('.models-carousel');
    
    if (carousel && carouselNextBtn && carouselPrevBtn) {
        const modelCards = carousel.querySelectorAll('.model-card');
        let currentIndex = 0;
        
        const updateCarousel = () => {
            // Update indicators
            carouselIndicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
            
            // Calculate scroll position
            const cardWidth = modelCards[0].offsetWidth;
            const gap = 24; // --spacing-6
            const scrollPosition = (cardWidth + gap) * currentIndex;
            
            // Smooth scroll to position
            carousel.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        };
        
        carouselNextBtn.addEventListener('click', () => {
            if (currentIndex < modelCards.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
        
        carouselPrevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        
        carouselIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });
    }
    
    // Floating Help
    const helpBtn = document.getElementById('helpBtn');
    const helpPopup = document.getElementById('helpPopup');
    const closeHelpBtn = document.getElementById('closeHelpBtn');
    
    if (helpBtn && helpPopup && closeHelpBtn) {
        helpBtn.addEventListener('click', () => {
            helpPopup.style.display = helpPopup.style.display === 'none' ? 'block' : 'none';
        });
        
        closeHelpBtn.addEventListener('click', () => {
            helpPopup.style.display = 'none';
        });
        
        // Close when clicking outside
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.floating-help')) {
                helpPopup.style.display = 'none';
            }
        });
    }
});
