// Uthando Africa Page Specific JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize uthando africa page components
    initUthandoFloatingElements();
    initUthandoScrollAnimations();
    
    // Add scroll event listener for initiative card animations
    window.addEventListener('scroll', handleUthandoInitiativeCardScroll);
    
    // Initial check for initiative cards in view
    handleUthandoInitiativeCardScroll();
    
    // Initialize mission vision animations
    initMissionVisionAnimations();
    
    // Set active navigation link
    setActiveNavLink();
});

// Initialize floating elements for uthando hero section
function initUthandoFloatingElements() {
    const floatingContainer = document.querySelector('.uthando-floating-elements');
    if (!floatingContainer) return;
    
    const colors = ['#05ffa1', '#00f3ff', '#b967ff', '#ff2a6d'];
    const shapes = ['circle', 'heart', 'leaf', 'star'];
    const sizes = [10, 18, 26, 34];
    
    // Create floating elements
    for (let i = 0; i < 16; i++) {
        const element = document.createElement('div');
        element.classList.add('uthando-floating-element');
        
        // Random properties
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = 20 + Math.random() * 40;
        const delay = Math.random() * 5;
        
        // Apply styles
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        // Different shapes for community elements
        if (shape === 'heart') {
            element.style.clipPath = 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")';
            element.style.borderRadius = '0';
        } else if (shape === 'leaf') {
            element.style.clipPath = 'polygon(0% 0%, 100% 0%, 85% 50%, 100% 100%, 0% 100%)';
            element.style.borderRadius = '0';
        } else if (shape === 'star') {
            element.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
            element.style.borderRadius = '0';
        } else {
            element.style.borderRadius = '50%';
        }
        
        element.style.background = `radial-gradient(circle, ${color}, transparent)`;
        element.style.left = `${left}%`;
        element.style.top = `${top}%`;
        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `${delay}s`;
        
        floatingContainer.appendChild(element);
    }
}

// Initialize scroll animations for uthando page
function initUthandoScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add specific animations for different card types
                if (entry.target.classList.contains('mission-card') || 
                    entry.target.classList.contains('vision-card')) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                }
                
                if (entry.target.classList.contains('program-card') || 
                    entry.target.classList.contains('impact-card') ||
                    entry.target.classList.contains('involvement-card')) {
                    entry.target.style.animation = 'bounceIn 0.6s ease forwards';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.fade-in, .slide-up, .mission-card, .vision-card, .program-card, .impact-card, .involvement-card').forEach(el => {
        observer.observe(el);
    });
}

// Handle initiative card scroll animations for uthando page
function handleUthandoInitiativeCardScroll() {
    const initiativeCards = document.querySelectorAll('.fade-in-service');
    
    initiativeCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // If card is in viewport
        if (cardTop < windowHeight - 100) {
            card.classList.add('visible');
        }
    });
}

// Initialize mission vision animations
function initMissionVisionAnimations() {
    const missionVisionCards = document.querySelectorAll('.mission-card, .vision-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation for mission and vision cards
                setTimeout(() => {
                    entry.target.style.animation = `slideInUp 0.8s ease forwards`;
                }, index * 300);
            }
        });
    }, { threshold: 0.3 });
    
    missionVisionCards.forEach(card => {
        observer.observe(card);
    });
}

// Add active state to current page in navigation
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

// Enhanced hover effects for initiative cards
function enhanceUthandoCards() {
    const initiativeCards = document.querySelectorAll('.initiative-card');
    const programCards = document.querySelectorAll('.program-card');
    const impactCards = document.querySelectorAll('.impact-card');
    const involvementCards = document.querySelectorAll('.involvement-card');
    
    // Initiative cards
    initiativeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 25px 50px rgba(5, 255, 161, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Program cards
    programCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Impact cards
    impactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(1deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
    
    // Involvement cards
    involvementCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(5, 255, 161, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Initialize enhanced cards
enhanceUthandoCards();

// Interactive involvement buttons
function initInteractiveInvolvement() {
    const involvementBtns = document.querySelectorAll('.involvement-btn');
    
    involvementBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show temporary message (in a real implementation, this would navigate to the appropriate page)
            const originalText = this.textContent;
            this.textContent = 'Thank you for your interest!';
            
            setTimeout(() => {
                this.textContent = originalText;
            }, 2000);
        });
    });
}

// Initialize interactive elements
initInteractiveInvolvement();

// Uthando-specific animations
function initUthandoAnimations() {
    // Add CSS for uthando-specific animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.3); }
            50% { opacity: 1; transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes pulseHeart {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize uthando animations
initUthandoAnimations();

// Add loading animation for uthando page
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add a slight delay to ensure all elements are loaded
    setTimeout(() => {
        const uthandoHero = document.querySelector('.uthando-hero');
        if (uthandoHero) {
            uthandoHero.classList.add('loaded');
        }
    }, 300);
});

// Community-focused interactive features
function initCommunityInteractiveFeatures() {
    // Add heart pulse animation to involvement icons on hover
    const involvementIcons = document.querySelectorAll('.involvement-icon');
    
    involvementIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'pulseHeart 1s ease-in-out';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
    
    // Add community impact counter (placeholder for real data)
    function updateCommunityImpact() {
        const impactNumbers = document.querySelectorAll('.impact-number');
        
        impactNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                number.textContent = Math.floor(current).toLocaleString();
            }, 30);
        });
    }
    
    // Initialize impact counters when they come into view
    const impactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCommunityImpact();
                impactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // In a real implementation, you would add data-target attributes to elements
    // and observe them here
}

// Initialize community interactive features
initCommunityInteractiveFeatures();