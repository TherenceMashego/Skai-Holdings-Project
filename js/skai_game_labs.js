// Enhanced Game Labs Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Game Labs Page
    initGameLabsPage();
    
    // Initialize animations
    initAnimations();
    
    // Initialize floating elements
    initFloatingElements();
    
    // Initialize service card interactions
    initServiceCards();
    
    // Initialize performance optimizations
    initPerformanceOptimizations();
    
    // Initialize counter animations
    initCounterAnimations();
});

// Initialize Game Labs Page
function initGameLabsPage() {
    console.log('Initializing Skai Game Labs Page');
    
    // Set up intersection observer for animations
    setupIntersectionObserver();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize interactive features
    initInteractiveFeatures();
}

// Initialize animations
function initAnimations() {
    // Add animation delays for staggered effects
    const gameServices = document.querySelectorAll('.game-service');
    gameServices.forEach((service, index) => {
        service.style.animationDelay = `${(index + 1) * 0.1}s`;
    });
    
    const engineCards = document.querySelectorAll('.engine-card');
    engineCards.forEach((card, index) => {
        card.style.animationDelay = `${(index + 1) * 0.1}s`;
    });
    
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.style.animationDelay = `${(index + 1) * 0.1}s`;
    });
    
    const processPhases = document.querySelectorAll('.process-phase');
    processPhases.forEach((phase, index) => {
        phase.style.animationDelay = `${(index + 1) * 0.1}s`;
    });
    
    // Add scroll-triggered animations
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-service');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
    });
}

// Initialize floating elements
function initFloatingElements() {
    const floatingContainer = document.querySelector('.game-floating-elements');
    if (!floatingContainer) return;
    
    // Clear any existing elements
    floatingContainer.innerHTML = '';
    
    // Create floating elements
    const elementCount = 18;
    const colors = [
        'rgba(255, 42, 109, 0.1)',
        'rgba(5, 255, 161, 0.1)',
        'rgba(185, 103, 255, 0.1)',
        'rgba(0, 243, 255, 0.1)'
    ];
    
    for (let i = 0; i < elementCount; i++) {
        const element = document.createElement('div');
        element.className = 'game-floating-element';
        
        // Random properties
        const size = Math.random() * 30 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
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

// Initialize service card interactions
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.game-service, .engine-card, .portfolio-item');
    
    serviceCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        });
        
        // Add click effect for mobile
        card.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                this.classList.toggle('expanded');
            }
        });
    });
}

// Initialize performance optimizations
function initPerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(function() {
            // Handle scroll-based animations
            handleScrollAnimations();
        }, 10);
    });
}

// Initialize counter animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Animate counter
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(timer);
            current = target;
        }
        element.textContent = Math.floor(current) + (element.textContent.includes('M') ? 'M+' : '+');
    }, 30);
}

// Set up intersection observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-service');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize scroll effects
function initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header scroll effect
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Parallax effect for hero section
        const heroSection = document.querySelector('.game-hero');
        if (heroSection) {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    }, { passive: true });
}

// Handle scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.game-service, .engine-card, .portfolio-item, .process-phase');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('animate-in');
        }
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

// Initialize interactive features
function initInteractiveFeatures() {
    // Add particle effect on click
    document.addEventListener('click', function(e) {
        createClickParticle(e.clientX, e.clientY);
    });
    
    function createClickParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.background = 'var(--neon-pink)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.animation = 'particleFloat 1s ease-out forwards';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
    
    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(3); opacity: 0; }
        }
        
        @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.3); }
            50% { opacity: 1; transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(255, 42, 109, 0.3); }
            50% { box-shadow: 0 0 40px rgba(255, 42, 109, 0.6); }
        }
    `;
    document.head.appendChild(style);
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
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add loading state for buttons
document.querySelectorAll('a[href], button').forEach(element => {
    element.addEventListener('click', function(e) {
        if (this.href || this.type === 'submit') {
            this.classList.add('loading');
            
            // Remove loading state after a delay (for demo purposes)
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1500);
        }
    });
});

// Performance monitoring
if ('performance' in window) {
    // Measure page load time
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
        
        // Send to analytics (placeholder)
        if (loadTime > 3000) {
            console.warn('Page load time is above 3 seconds. Consider optimization.');
        }
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Export functions for potential reuse
window.SkaiGameLabs = {
    initGameLabsPage,
    initAnimations,
    initFloatingElements,
    initServiceCards,
    initCounterAnimations
};