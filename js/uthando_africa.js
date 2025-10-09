// Uthando Africa Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize floating elements
    initFloatingElements();
    
    // Initialize counter animations
    initCounters();
});

// Initialize animations
function initAnimations() {
    // Create intersection observer for fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-service');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize floating elements in hero section
function initFloatingElements() {
    const floatingContainer = document.querySelector('.uthando-floating-elements');
    
    if (!floatingContainer) return;
    
    // Create floating elements
    const elementCount = 15;
    
    for (let i = 0; i < elementCount; i++) {
        const element = document.createElement('div');
        element.className = 'uthando-floating-element';
        
        // Random size between 5px and 20px
        const size = Math.random() * 15 + 5;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        // Random position
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        
        // Random color
        const colors = [
            'rgba(255, 255, 255, 0.7)',
            'rgba(219, 234, 254, 0.7)',
            'rgba(191, 219, 254, 0.7)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        element.style.background = randomColor;
        
        // Random animation duration between 10s and 30s
        const duration = Math.random() * 20 + 10;
        element.style.animationDuration = `${duration}s`;
        
        // Random animation delay
        const delay = Math.random() * 5;
        element.style.animationDelay = `${delay}s`;
        
        floatingContainer.appendChild(element);
    }
}

// Initialize counter animations
function initCounters() {
    const counters = document.querySelectorAll('.uthando-stat-number, .uthando-result-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const suffix = counter.textContent.includes('+') ? '+' : 
                              counter.textContent.includes('%') ? '%' : '';
                
                animateCounter(counter, target, suffix);
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Animate counter from 0 to target value
function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (suffix === '%') {
            element.textContent = Math.floor(current) + suffix;
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepTime);
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effects for cards
document.querySelectorAll('.mission-card, .vision-card, .initiative-card, .approach-card, .uthando-result-item, .involvement-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});