// Enhanced Design Labs Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Design Labs Page
    initDesignLabsPage();
    
    // Initialize animations
    initAnimations();
    
    // Initialize floating elements
    initFloatingElements();
    
    // Initialize service card interactions
    initServiceCards();
    
    // Initialize performance optimizations
    initPerformanceOptimizations();
});

// Initialize Design Labs Page
function initDesignLabsPage() {
    console.log('Initializing Skai Design Labs Page');
    
    // Set up intersection observer for animations
    setupIntersectionObserver();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize mobile menu
    initMobileMenu();
}

// Initialize animations
function initAnimations() {
    // Add animation delays for staggered effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${(index + 1) * 0.1}s`;
    });
    
    const methodologyCards = document.querySelectorAll('.methodology-card');
    methodologyCards.forEach((card, index) => {
        card.style.animationDelay = `${(index + 1) * 0.1}s`;
    });
    
    // Add scroll-triggered animations
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .fade-in-service');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
    });
}

// Initialize floating elements
function initFloatingElements() {
    const floatingContainer = document.querySelector('.design-floating-elements');
    if (!floatingContainer) return;
    
    // Clear any existing elements
    floatingContainer.innerHTML = '';
    
    // Create floating elements
    const elementCount = 15;
    const colors = [
        'rgba(37, 99, 235, 0.1)',
        'rgba(37, 99, 235, 0.15)',
        'rgba(37, 99, 235, 0.2)'
    ];
    
    for (let i = 0; i < elementCount; i++) {
        const element = document.createElement('div');
        element.className = 'design-floating-element';
        
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

// Initialize service card interactions
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
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
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .fade-in-service');
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
        const heroSection = document.querySelector('.design-hero');
        if (heroSection) {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    }, { passive: true });
}

// Handle scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.service-card, .methodology-card');
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
window.SkaiDesignLabs = {
    initDesignLabsPage,
    initAnimations,
    initFloatingElements,
    initServiceCards
};