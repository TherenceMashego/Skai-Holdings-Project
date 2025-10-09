// Uthando Africa Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page animations and interactions
    initUthandoPage();
});

function initUthandoPage() {
    // Create floating elements
    createFloatingElements();
    
    // Initialize counter animations
    initCounters();
    
    // Initialize card animations
    initCardAnimations();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add hover effects to interactive elements
    initHoverEffects();
}

// Create floating elements for the hero section
function createFloatingElements() {
    const container = document.querySelector('.uthando-floating-elements');
    if (!container) return;
    
    const colors = ['#2563eb', '#00f3ff', '#05ffa1', '#b967ff', '#ff2a6d'];
    
    // Create 15 floating elements
    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.classList.add('uthando-floating-element');
        
        // Random properties
        const size = Math.random() * 25 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 20 + 20;
        const delay = Math.random() * 5;
        
        // Apply styles
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.background = color;
        element.style.left = `${left}%`;
        element.style.top = `${top}%`;
        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `${delay}s`;
        
        container.appendChild(element);
    }
}

// Initialize counter animations for statistics
function initCounters() {
    const counters = document.querySelectorAll('.uthando-stat-number, .result-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const suffix = counter.textContent.includes('%') ? '%' : 
                              counter.textContent.includes('+') ? '+' : '';
                
                animateCounter(counter, target, suffix);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Animate counter from 0 to target value
function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 50; // Adjust speed here
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 30);
}

// Initialize card animations on scroll
function initCardAnimations() {
    const cards = document.querySelectorAll('.fade-in-service, .fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation for multiple cards
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Initialize scroll animations for various elements
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in, .slide-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize hover effects for interactive elements
function initHoverEffects() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.uthando-hero-button, .cta-button, .involvement-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add hover effects to all cards
    const cards = document.querySelectorAll('.initiative-card, .program-card, .impact-card, .involvement-card, .mission-card, .vision-card, .result-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        });
    });
}

// Initialize page when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUthandoPage);
} else {
    initUthandoPage();
}