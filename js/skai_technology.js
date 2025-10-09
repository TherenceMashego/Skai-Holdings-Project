// Skai Technology Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Skai Technology Page');
    
    // Initialize all components
    initTechnologyHero();
    initAnimatedStats();
    initServiceCards();
    initScrollAnimations();
    initFloatingElements();
    initMobileMenu();
});

// Technology Hero Initialization
function initTechnologyHero() {
    const heroSection = document.querySelector('.technology-hero');
    
    // Create floating elements for visual interest
    createTechFloatingElements();
    
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
function createTechFloatingElements() {
    const floatingContainer = document.querySelector('.tech-floating-elements');
    if (!floatingContainer) return;
    
    // Clear any existing elements
    floatingContainer.innerHTML = '';
    
    const colors = ['#2563eb', '#1e40af', '#3b82f6', '#60a5fa'];
    const icons = ['fa-code', 'fa-cloud', 'fa-microchip', 'fa-database', 'fa-mobile', 'fa-robot'];
    
    for (let i = 0; i < 12; i++) {
        const element = document.createElement('div');
        element.classList.add('tech-floating-element');
        
        // Random properties
        const size = Math.random() * 25 + 10;
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
        
        // Add icon for some elements
        if (Math.random() > 0.7) {
            const icon = document.createElement('i');
            icon.classList.add('fas', icons[Math.floor(Math.random() * icons.length)]);
            icon.style.color = 'white';
            icon.style.fontSize = `${size * 0.6}px`;
            icon.style.position = 'absolute';
            icon.style.top = '50%';
            icon.style.left = '50%';
            icon.style.transform = 'translate(-50%, -50%)';
            element.appendChild(icon);
        }
        
        floatingContainer.appendChild(element);
    }
}

// Animated Statistics Counter
function initAnimatedStats() {
    const statElements = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-count'));
                const suffix = element.textContent.includes('%') ? '%' : 
                              element.textContent.includes('+') ? '+' : '';
                
                animateCounter(element, target, suffix);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statElements.forEach(element => {
        observer.observe(element);
    });
}

// Counter Animation Function
function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 50; // Adjust speed
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (suffix === '%') {
            element.textContent = Math.round(current) + suffix;
        } else {
            element.textContent = Math.round(current) + suffix;
        }
    }, 30);
}

// Service Cards Animation
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    serviceCards.forEach(card => {
        observer.observe(card);
    });
    
    // Add hover effects
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-service');
    
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

// Floating Elements Animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.tech-floating-element');
    
    floatingElements.forEach(element => {
        // Add random movement patterns
        const randomX = (Math.random() - 0.5) * 40;
        const randomY = (Math.random() - 0.5) * 40;
        
        element.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
            
            // Update ARIA attributes
            const isExpanded = navLinks.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinksItems = document.querySelectorAll('.nav-link');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
}

// Smooth scrolling for anchor links
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

// Performance optimization for animations
let ticking = false;
function updateOnScroll() {
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Handle page load animations
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Initialize any lazy loading elements
    const lazyElements = document.querySelectorAll('[data-lazy]');
    lazyElements.forEach(element => {
        const src = element.getAttribute('data-lazy');
        if (src) {
            element.src = src;
        }
    });
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.warn('Failed to load image:', this.src);
    });
});

// Export functions for potential use in other modules
window.SkaiTechnology = {
    initTechnologyHero,
    initAnimatedStats,
    initServiceCards,
    initScrollAnimations,
    initFloatingElements,
    initMobileMenu
};