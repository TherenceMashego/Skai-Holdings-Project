// Game Labs Page Specific JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize game labs page components
    initGameFloatingElements();
    initGameScrollAnimations();
    
    // Add scroll event listener for service card animations
    window.addEventListener('scroll', handleGameServiceCardScroll);
    
    // Initial check for service cards in view
    handleGameServiceCardScroll();
    
    // Initialize game process animations
    initGameProcessAnimations();
    
    // Set active navigation link
    setActiveNavLink();
});

// Initialize floating elements for game labs hero section
function initGameFloatingElements() {
    const floatingContainer = document.querySelector('.game-floating-elements');
    if (!floatingContainer) return;
    
    const colors = ['#ff2a6d', '#05ffa1', '#b967ff', '#00f3ff'];
    const shapes = ['circle', 'square', 'diamond', 'star'];
    const sizes = [15, 25, 35, 45];
    
    // Create floating elements
    for (let i = 0; i < 18; i++) {
        const element = document.createElement('div');
        element.classList.add('game-floating-element');
        
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
        
        // Different shapes for game elements
        if (shape === 'square') {
            element.style.borderRadius = '8px';
            element.style.transform = 'rotate(45deg)';
        } else if (shape === 'diamond') {
            element.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
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

// Initialize scroll animations for game labs page
function initGameScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add specific animations for platform cards
                if (entry.target.classList.contains('platform-card')) {
                    entry.target.style.animation = 'bounceIn 0.6s ease forwards';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.fade-in, .slide-up, .platform-card').forEach(el => {
        observer.observe(el);
    });
}

// Handle service card scroll animations for game labs page
function handleGameServiceCardScroll() {
    const serviceCards = document.querySelectorAll('.fade-in-service');
    
    serviceCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // If card is in viewport
        if (cardTop < windowHeight - 100) {
            card.classList.add('visible');
        }
    });
}

// Initialize game process animations
function initGameProcessAnimations() {
    const processPhases = document.querySelectorAll('.process-phase');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation for process phases
                setTimeout(() => {
                    entry.target.style.animation = `slideInRight 0.8s ease forwards`;
                }, index * 300);
            }
        });
    }, { threshold: 0.3 });
    
    processPhases.forEach(phase => {
        observer.observe(phase);
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

// Enhanced hover effects for game service cards
function enhanceGameServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 30px 60px rgba(255, 42, 109, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Initialize enhanced service cards
enhanceGameServiceCards();

// Interactive platform cards
function initInteractivePlatformCards() {
    const platformCards = document.querySelectorAll('.platform-card');
    
    platformCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add keyboard navigation
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.click();
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
    });
}

// Initialize interactive elements
initInteractivePlatformCards();

// Game-specific animations
function initGameAnimations() {
    // Add CSS for game-specific animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.3); }
            50% { opacity: 1; transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(255, 42, 109, 0.3); }
            50% { box-shadow: 0 0 40px rgba(255, 42, 109, 0.6); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize game animations
initGameAnimations();

// Add loading animation for game labs page
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add a slight delay to ensure all elements are loaded
    setTimeout(() => {
        const gameHero = document.querySelector('.game-hero');
        if (gameHero) {
            gameHero.classList.add('loaded');
        }
    }, 300);
});

// Game-specific interactive features
function initGameInteractiveFeatures() {
    // Add particle effect on click
    document.addEventListener('click', function(e) {
        createClickParticle(e.clientX, e.clientY);
    });
    
    function createClickParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.background = 'var(--neon-pink)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.animation = 'particleFloat 1s ease-out forwards';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
    
    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(3); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize game interactive features
initGameInteractiveFeatures();