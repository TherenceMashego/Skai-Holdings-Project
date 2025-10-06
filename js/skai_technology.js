// Technology Page Specific JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize technology page components
    initTechFloatingElements();
    initTechScrollAnimations();
    
    // Add scroll event listener for service card animations
    window.addEventListener('scroll', handleTechServiceCardScroll);
    
    // Initial check for service cards in view
    handleTechServiceCardScroll();
});

// Initialize floating elements for technology hero section
function initTechFloatingElements() {
    const floatingContainer = document.querySelector('.tech-floating-elements');
    if (!floatingContainer) return;
    
    const colors = ['#00f3ff', '#b967ff', '#ff2a6d', '#05ffa1'];
    const sizes = [15, 25, 35, 45];
    
    // Create floating elements
    for (let i = 0; i < 12; i++) {
        const element = document.createElement('div');
        element.classList.add('tech-floating-element');
        
        // Random properties
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = 20 + Math.random() * 40;
        const delay = Math.random() * 5;
        
        // Apply styles
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.background = `radial-gradient(circle, ${color}, transparent)`;
        element.style.left = `${left}%`;
        element.style.top = `${top}%`;
        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `${delay}s`;
        
        floatingContainer.appendChild(element);
    }
}

// Initialize scroll animations for technology page
function initTechScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        observer.observe(el);
    });
}

// Handle service card scroll animations for technology page
function handleTechServiceCardScroll() {
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

// Call function to set active navigation link
setActiveNavLink();

// Enhanced hover effects for service cards
function enhanceServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize enhanced service cards
enhanceServiceCards();

// Technology-specific counter animations (if needed)
function initTechCounters() {
    // Add any technology-specific counter animations here
    // For example, if you want to count technologies used, projects completed, etc.
}

// Initialize any technology-specific counters
initTechCounters();

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect for technology page
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'var(--bg-light)';
        header.style.backdropFilter = 'none';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Add loading animation for technology page
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add a slight delay to ensure all elements are loaded
    setTimeout(() => {
        const techHero = document.querySelector('.tech-hero');
        if (techHero) {
            techHero.classList.add('loaded');
        }
    }, 300);
});