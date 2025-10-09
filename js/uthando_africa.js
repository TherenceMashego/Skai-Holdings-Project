// Uthando Africa Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Uthando Africa page
    initUthandoPage();
    
    // Initialize animations
    initUthandoAnimations();
    
    // Initialize floating elements
    initFloatingElements();
    
    // Initialize counter animations
    initCounters();
});

// Initialize Uthando Africa page
function initUthandoPage() {
    console.log('Uthando Africa page initialized');
    
    // Set active navigation link
    setActiveNavLink();
    
    // Add scroll event listeners
    window.addEventListener('scroll', handleScroll);
}

// Set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Initialize Uthando-specific animations
function initUthandoAnimations() {
    // Add intersection observer for fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-service');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });
}

// Initialize floating elements
function initFloatingElements() {
    const floatingContainer = document.querySelector('.uthando-floating-elements');
    if (!floatingContainer) return;
    
    // Create floating elements
    const elementCount = 15;
    
    for (let i = 0; i < elementCount; i++) {
        createFloatingElement(floatingContainer, i);
    }
}

// Create a single floating element
function createFloatingElement(container, index) {
    const element = document.createElement('div');
    element.className = 'uthando-floating-element';
    
    // Random properties
    const size = Math.random() * 30 + 10;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 20 + 10;
    const animationDelay = Math.random() * 5;
    
    // Random shape and color
    const shapes = ['circle', 'square', 'triangle'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const colors = [
        'rgba(16, 185, 129, 0.3)',
        'rgba(5, 150, 105, 0.3)',
        'rgba(209, 250, 229, 0.3)',
        'rgba(37, 99, 235, 0.2)',
        'rgba(219, 234, 254, 0.2)'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Apply styles
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.left = `${left}%`;
    element.style.top = `${Math.random() * 100}%`;
    element.style.background = color;
    element.style.animationDuration = `${animationDuration}s`;
    element.style.animationDelay = `${animationDelay}s`;
    
    // Apply shape
    if (shape === 'square') {
        element.style.borderRadius = '4px';
    } else if (shape === 'triangle') {
        element.style.width = '0';
        element.style.height = '0';
        element.style.background = 'transparent';
        element.style.borderLeft = `${size/2}px solid transparent`;
        element.style.borderRight = `${size/2}px solid transparent`;
        element.style.borderBottom = `${size}px solid ${color}`;
    }
    
    container.appendChild(element);
}

// Initialize counter animations
function initCounters() {
    const counters = document.querySelectorAll('.uthando-stat-number, .uthando-result-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Animate counter
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number with commas for large numbers
        element.textContent = formatNumber(Math.floor(current)) + (element.textContent.includes('%') ? '%' : '+');
    }, 16);
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Handle scroll events
function handleScroll() {
    const scrollPosition = window.scrollY;
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.uthando-hero');
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
    
    // Add sticky navigation
    const header = document.querySelector('.header');
    if (header) {
        if (scrollPosition > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

// Add CSS for scrolled header
const style = document.createElement('style');
style.textContent = `
    .header.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style);