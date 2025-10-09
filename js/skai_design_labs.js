// Skai Design Labs Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Skai Design Labs Page');
    
    // Initialize all components
    initDesignHero();
    initAnimatedStats();
    initServiceCards();
    initScrollAnimations();
    initFloatingElements();
    initMobileMenu();
});

// Design Hero Initialization
function initDesignHero() {
    const heroSection = document.querySelector('.design-hero');
    
    // Create floating elements for visual interest
    createDesignFloatingElements();
    
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
function createDesignFloatingElements() {
    const floatingContainer = document.querySelector('.design-floating-elements');
    if (!floatingContainer) return;
    
    // Clear any existing elements
    floatingContainer.innerHTML = '';
    
    const colors = ['#2563eb', '#1e40af', '#3b82f6', '#60a5fa'];
    const shapes = ['circle', 'square', 'triangle'];
    const icons = ['fa-palette', 'fa-brush', 'fa-pencil-alt', 'fa-ruler-combined', 'fa-object-group', 'fa-magic'];
    
    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.classList.add('design-floating-element');
        
        // Random properties
        const size = Math.random() * 25 + 8;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        // Apply styles
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.background = color;
        element.style.left = `${left}%`;
        element.style.top = `${top}%`;
        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `${delay}s`;
        
        // Add different shapes
        if (shape === 'square') {
            element.style.borderRadius = '4px';
        } else if (shape === 'triangle') {
            element.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
            element.style.background = 'transparent';
            element.style.borderLeft = `${size/2}px solid transparent`;
            element.style.borderRight = `${size/2}px solid transparent`;
            element.style.borderBottom = `${size}px solid ${color}`;
            element.style.width = '0';
            element.style.height = '0';
        }
        
        // Add icon for some elements
        if (Math.random() > 0.6) {
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
    const increment = target / 50;
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
    const serviceCards = document.querySelectorAll('.service-card, .methodology-card');
    
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
    const floatingElements = document.querySelectorAll('.design-floating-element');
    
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

// Process Visualization Animation
function initProcessAnimation() {
    const processStages = document.querySelectorAll('.process-stage');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    processStages.forEach(stage => {
        observer.observe(stage);
    });
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

// Initialize process animation
initProcessAnimation();

// Handle page load animations
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Export functions for potential use in other modules
window.SkaiDesignLabs = {
    initDesignHero,
    initAnimatedStats,
    initServiceCards,
    initScrollAnimations,
    initFloatingElements,
    initMobileMenu,
    initProcessAnimation
};