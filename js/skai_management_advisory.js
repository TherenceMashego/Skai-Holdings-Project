// Management & Advisory Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Skai Management & Advisory Page');
    
    // Initialize all components
    initManagementHero();
    initAnimatedStats();
    initServiceCards();
    initScrollAnimations();
    initFloatingElements();
    initMobileMenu();
});

// Management Hero Initialization
function initManagementHero() {
    const heroSection = document.querySelector('.management-hero');
    
    // Create floating elements for visual interest
    createFloatingElements();
    
    // Add scroll event listener to keep hero section solid
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        
        // Keep hero section solid - no fade effect
        if (scrollPosition < heroHeight) {
            heroSection.style.opacity = '1';
        }
    });
}

// Create floating elements for hero section
function createFloatingElements() {
    const floatingContainer = document.querySelector('.management-floating-elements');
    if (!floatingContainer) return;
    
    // Clear any existing elements
    floatingContainer.innerHTML = '';
    
    const colors = ['#2563eb', '#1e40af', '#3b82f6', '#60a5fa'];
    
    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.classList.add('management-floating-element');
        
        // Random properties
        const size = Math.random() * 20 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Apply styles
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.background = color;
        element.style.left = `${left}%`;
        element.style.top = `${top}%`;
        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `${delay}s`;
        
        floatingContainer.appendChild(element);
    }
}

// Initialize animated statistics - FIXED VERSION
function initAnimatedStats() {
    const statElements = document.querySelectorAll('.stat-number, .result-number');
    
    // Create Intersection Observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const targetValue = parseInt(element.getAttribute('data-count'));
                console.log('Animating counter:', targetValue, element);
                if (!isNaN(targetValue)) {
                    animateCounter(element, targetValue);
                } else {
                    console.error('Invalid data-count value:', element.getAttribute('data-count'));
                }
                statsObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all stat elements
    statElements.forEach(element => {
        // Set initial value to 0
        element.textContent = '0%';
        statsObserver.observe(element);
    });
}

// Animate counter from 0 to target value - FIXED VERSION
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 30; // ms between updates
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '%';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '%';
        }
    }, duration);
}

// Initialize service cards interactions
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card, .process-step, .result-item');
    
    serviceCards.forEach(card => {
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

// Initialize scroll animations
function initScrollAnimations() {
    // Create observer for fade-in elements
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-service');
    fadeElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeObserver.observe(element);
    });
}

// Initialize floating elements animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.management-floating-element');
    
    // Add random movement to floating elements
    floatingElements.forEach(element => {
        // Randomize animation properties
        const duration = 15 + Math.random() * 15;
        const delay = Math.random() * 5;
        
        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `${delay}s`;
    });
}

// Initialize mobile menu
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.setAttribute('aria-expanded', 
                this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });
        
        // Close mobile menu when clicking on a link
        const navItems = document.querySelectorAll('.nav-link, .dropdown-link');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// Handle page load animations
window.addEventListener('load', function() {
    // Ensure all elements are properly loaded before animations
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Tab key navigation - add focus styles
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    // Remove keyboard navigation class on mouse interaction
    document.body.classList.remove('keyboard-navigation');
});

// Export functions for potential reuse
window.SkaiManagementAdvisory = {
    initManagementHero,
    initAnimatedStats,
    initServiceCards,
    initScrollAnimations,
    initFloatingElements
};