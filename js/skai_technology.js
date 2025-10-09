// Skai Technology Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page animations and interactions
    initTechnologyPage();
});

function initTechnologyPage() {
    // Create floating elements
    createFloatingElements();
    
    // Initialize counter animations
    initCounters();
    
    // Initialize service card animations
    initServiceCardAnimations();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add hover effects to interactive elements
    initHoverEffects();
}

// Create floating elements for the hero section
function createFloatingElements() {
    const container = document.querySelector('.tech-floating-elements');
    if (!container) return;
    
    const colors = ['#2563eb', '#00f3ff', '#05ffa1', '#b967ff', '#ff2a6d'];
    const shapes = ['circle', 'square', 'triangle'];
    
    // Create 15 floating elements
    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.classList.add('tech-floating-element');
        
        // Random properties
        const size = Math.random() * 20 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Apply styles
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.backgroundColor = color;
        element.style.left = `${left}%`;
        element.style.top = `${top}%`;
        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `${delay}s`;
        
        // Apply shape
        if (shape === 'square') {
            element.style.borderRadius = '4px';
        } else if (shape === 'triangle') {
            element.style.width = '0';
            element.style.height = '0';
            element.style.backgroundColor = 'transparent';
            element.style.borderLeft = `${size/2}px solid transparent`;
            element.style.borderRight = `${size/2}px solid transparent`;
            element.style.borderBottom = `${size}px solid ${color}`;
        }
        
        container.appendChild(element);
    }
}

// Initialize counter animations for statistics
function initCounters() {
    const counters = document.querySelectorAll('.tech-stat-number, .result-number');
    
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

// Initialize service card animations on scroll
function initServiceCardAnimations() {
    const serviceCards = document.querySelectorAll('.fade-in-service');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation for multiple cards
                setTimeout(() => {
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                    entry.target.classList.add('fade-in-service');
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    serviceCards.forEach(card => {
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
    const buttons = document.querySelectorAll('.tech-hero-button, .cta-button');
    
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
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.tech-hero');
    const floatingElements = document.querySelectorAll('.tech-floating-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingElements.forEach((element, index) => {
            const speed = (index % 3 + 1) * 0.5;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Initialize page when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTechnologyPage);
} else {
    initTechnologyPage();
}