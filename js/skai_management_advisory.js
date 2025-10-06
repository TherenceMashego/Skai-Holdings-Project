// Management & Advisory Page Specific JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize management & advisory page components
    initManagementFloatingElements();
    initManagementScrollAnimations();
    
    // Add scroll event listener for service card animations
    window.addEventListener('scroll', handleManagementServiceCardScroll);
    
    // Initial check for service cards in view
    handleManagementServiceCardScroll();
    
    // Initialize management process animations
    initManagementProcessAnimations();
    
    // Set active navigation link
    setActiveNavLink();
    
    // Initialize results counter animation
    initResultsCounter();
});

// Initialize floating elements for management hero section
function initManagementFloatingElements() {
    const floatingContainer = document.querySelector('.management-floating-elements');
    if (!floatingContainer) return;
    
    const colors = ['#00f3ff', '#05ffa1', '#b967ff', '#ff2a6d'];
    const shapes = ['circle', 'square', 'hexagon', 'octagon'];
    const sizes = [12, 20, 28, 36];
    
    // Create floating elements
    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.classList.add('management-floating-element');
        
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
        
        // Different shapes for management elements
        if (shape === 'square') {
            element.style.borderRadius = '5px';
        } else if (shape === 'hexagon') {
            element.style.clipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
            element.style.borderRadius = '0';
        } else if (shape === 'octagon') {
            element.style.clipPath = 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)';
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

// Initialize scroll animations for management page
function initManagementScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add specific animations for process steps
                if (entry.target.classList.contains('process-step')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.fade-in, .slide-up, .process-step').forEach(el => {
        observer.observe(el);
    });
}

// Handle service card scroll animations for management page
function handleManagementServiceCardScroll() {
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

// Initialize management process animations
function initManagementProcessAnimations() {
    const processSteps = document.querySelectorAll('.process-step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation for process steps
                setTimeout(() => {
                    entry.target.style.animation = `slideInUp 0.8s ease forwards`;
                }, index * 150);
            }
        });
    }, { threshold: 0.3 });
    
    processSteps.forEach(step => {
        observer.observe(step);
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

// Enhanced hover effects for management service cards
function enhanceManagementServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 25px 50px rgba(0, 243, 255, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Initialize enhanced service cards
enhanceManagementServiceCards();

// Interactive process steps
function initInteractiveProcessSteps() {
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach(step => {
        step.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add keyboard navigation
        step.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.click();
            }
        });
        
        // Make steps focusable
        step.setAttribute('tabindex', '0');
    });
}

// Initialize interactive elements
initInteractiveProcessSteps();

// Results counter animation
function initResultsCounter() {
    const resultNumbers = document.querySelectorAll('.result-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent.replace('%', ''));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    resultNumbers.forEach(number => {
        observer.observe(number);
    });
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '%';
        }, 30);
    }
}

// Management-specific animations
function initManagementAnimations() {
    // Add CSS for management-specific animations
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
        
        @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(0, 243, 255, 0.3); }
            50% { box-shadow: 0 0 40px rgba(0, 243, 255, 0.6); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize management animations
initManagementAnimations();

// Add loading animation for management page
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add a slight delay to ensure all elements are loaded
    setTimeout(() => {
        const managementHero = document.querySelector('.management-hero');
        if (managementHero) {
            managementHero.classList.add('loaded');
        }
    }, 300);
});

// Professional interactive features
function initProfessionalInteractiveFeatures() {
    // Add subtle hover effects to result cards
    const resultCards = document.querySelectorAll('.result-card');
    
    resultCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'pulseGlow 2s infinite';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
}

// Initialize professional interactive features
initProfessionalInteractiveFeatures();