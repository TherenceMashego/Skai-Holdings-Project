// Design Labs Page Specific JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize design labs page components
    initDesignFloatingElements();
    initDesignScrollAnimations();
    
    // Add scroll event listener for service card animations
    window.addEventListener('scroll', handleDesignServiceCardScroll);
    
    // Initial check for service cards in view
    handleDesignServiceCardScroll();
    
    // Initialize design process animations
    initDesignProcessAnimations();
    
    // Set active navigation link
    setActiveNavLink();
});

// Initialize floating elements for design labs hero section
function initDesignFloatingElements() {
    const floatingContainer = document.querySelector('.design-floating-elements');
    if (!floatingContainer) return;
    
    const colors = ['#b967ff', '#ff2a6d', '#05ffa1', '#00f3ff'];
    const shapes = ['circle', 'square', 'triangle'];
    const sizes = [12, 20, 28, 36];
    
    // Create floating elements
    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.classList.add('design-floating-element');
        
        // Random properties
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = 25 + Math.random() * 35;
        const delay = Math.random() * 5;
        
        // Apply styles
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        // Different shapes for design elements
        if (shape === 'square') {
            element.style.borderRadius = '5px';
            element.style.transform = 'rotate(45deg)';
        } else if (shape === 'triangle') {
            element.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
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

// Initialize scroll animations for design labs page
function initDesignScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add specific animations for methodology cards
                if (entry.target.classList.contains('methodology-card')) {
                    entry.target.style.animation = 'slideUp 0.6s ease forwards';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.fade-in, .slide-up, .methodology-card').forEach(el => {
        observer.observe(el);
    });
}

// Handle service card scroll animations for design labs page
function handleDesignServiceCardScroll() {
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

// Initialize design process animations
function initDesignProcessAnimations() {
    const processStages = document.querySelectorAll('.process-stage');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation for process stages
                setTimeout(() => {
                    entry.target.style.animation = `bounceIn 0.6s ease forwards`;
                }, index * 200);
            }
        });
    }, { threshold: 0.5 });
    
    processStages.forEach(stage => {
        observer.observe(stage);
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

// Enhanced hover effects for design service cards
function enhanceDesignServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotate(1deg)';
            this.style.boxShadow = '0 25px 50px rgba(185, 103, 255, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Initialize enhanced service cards
enhanceDesignServiceCards();

// Interactive design elements
function initInteractiveDesignElements() {
    // Add click effects to methodology cards
    const methodologyCards = document.querySelectorAll('.methodology-card');
    
    methodologyCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Initialize interactive elements
initInteractiveDesignElements();

// Design-specific animations
function initDesignAnimations() {
    // Add CSS for bounceIn animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.3); }
            50% { opacity: 1; transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize design animations
initDesignAnimations();

// Add loading animation for design labs page
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add a slight delay to ensure all elements are loaded
    setTimeout(() => {
        const designHero = document.querySelector('.design-hero');
        if (designHero) {
            designHero.classList.add('loaded');
        }
    }, 300);
});