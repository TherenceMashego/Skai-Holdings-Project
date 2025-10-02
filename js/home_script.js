// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeScrollAnimations();
    initializeCounterAnimations();
    initializeCarousel();
    initializeHeroHoverEffects();
    initializeMobileMenu();
});

// Floating Particles System (Hero only)
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 6 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 8 + 4;
    const delay = Math.random() * 5;
    
    // Apply styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    // Random blue color
    const colors = ['#2563eb', '#3b82f6', '#06b6d4'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;
    
    container.appendChild(particle);
}

// Mobile Menu Toggle
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

// Hero Hover Effects
function initializeHeroHoverEffects() {
    const hero = document.querySelector('.hero');
    const botImage = document.getElementById('botImage');
    
    if (!hero || !botImage) return;
    
    // Mouse move effect for the entire hero section
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = hero.getBoundingClientRect();
        
        // Calculate mouse position relative to hero center
        const x = (clientX - left - width / 2) / 25;
        const y = (clientY - top - height / 2) / 25;
        
        // Apply transform to elements
        const heroText = document.querySelector('.hero-text');
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroText) heroText.style.transform = `translateX(${-x}px) translateZ(0)`;
        if (heroTitle) heroTitle.style.transform = `translateX(${-x/2}px) translateZ(0)`;
        if (heroSubtitle) heroSubtitle.style.transform = `translateX(${-x/2}px) translateZ(0)`;
        if (heroVisual) heroVisual.style.transform = `translateX(${x}px) translateZ(0)`;
        
        // Reduced movement for larger bot to prevent excessive shifting
        if (botImage) botImage.style.transform = `translateX(${x/3}px) translateY(${y/3}px) scale(1.02) translateZ(0)`;
    });
    
    // Reset transforms when mouse leaves
    hero.addEventListener('mouseleave', () => {
        const elements = [
            '.hero-text',
            '.hero-title', 
            '.hero-subtitle',
            '.hero-visual',
            '#botImage'
        ];
        
        elements.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.transform = 'translateZ(0)';
            }
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.fade-in, .slide-up, .zoom-in');
    animatableElements.forEach(el => observer.observe(el));
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animated Counters
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = Math.floor(current);
    }, 16);
}

// Client Carousel
function initializeCarousel() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    
    // Pause on hover
    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });
    
    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
}

// Add loading state
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});