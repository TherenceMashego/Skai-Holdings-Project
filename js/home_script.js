// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializeCounterAnimations();
    initializeCarousel();
    initializeMobileMenu();
    initializeHeroEffects();
    initializeHoverEffects();
});

// Mobile Menu Toggle
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // For counter elements, start counting when they become visible
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-up, .zoom-in').forEach(el => {
        observer.observe(el);
    });
    
    // Observe counter elements
    document.querySelectorAll('.stat-number').forEach(el => {
        observer.observe(el);
    });
    
    // Observe service cards
    document.querySelectorAll('.service-card').forEach(el => {
        observer.observe(el);
    });
    
    // Observe about image
    document.querySelectorAll('.image-container').forEach(el => {
        observer.observe(el);
    });
    
    // Smooth scrolling for navigation links (ONLY for hash links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only prevent default for actual hash links (not external links)
            if (this.getAttribute('href').startsWith('#') && this.getAttribute('href').length > 1) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.97)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'var(--bg-light)';
            header.style.backdropFilter = 'none';
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Counter Animation
function initializeCounterAnimations() {
    // This will be triggered by the scroll observer
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 1500; // 1.5 seconds (faster)
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;
    
    // Check if already animated
    if (element.classList.contains('animated')) return;
    element.classList.add('animated');
    
    const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        // Use easing function for more natural animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.round(target * easeOutQuart);
        
        element.textContent = currentCount;
        
        if (frame === totalFrames) {
            clearInterval(counter);
            element.textContent = target;
        }
    }, frameDuration);
}

// Carousel Animation
function initializeCarousel() {
    const carouselTrack = document.querySelector('.carousel-track');
    if (!carouselTrack) return;
    
    // Pause animation on hover
    carouselTrack.addEventListener('mouseenter', () => {
        carouselTrack.style.animationPlayState = 'paused';
    });
    
    carouselTrack.addEventListener('mouseleave', () => {
        carouselTrack.style.animationPlayState = 'running';
    });
}

// Hero Section Effects
function initializeHeroEffects() {
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image img');
    
    if (!heroSection || !heroImage) return;
    
    // Create floating elements
    createFloatingElements(25); // Increased number of elements
    
    // Enhanced parallax effect on mouse move
    heroSection.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = heroSection.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        // Move hero image with more pronounced effect
        heroImage.style.transform = `translate(${x * 20}px, ${y * 20}px) scale(1.05)`;
        
        // Move floating elements in opposite direction for enhanced parallax
        document.querySelectorAll('.floating-element').forEach((element, index) => {
            const speed = (index % 5 + 1) * 1.5; // Increased speed multiplier
            const xMove = x * speed * 15; // Increased movement range
            const yMove = y * speed * 15;
            element.style.transform = `translate(${xMove}px, ${yMove}px)`;
        });
        
        // Move tech grid
        const techGrid = document.querySelector('.tech-grid');
        if (techGrid) {
            techGrid.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        }
    });
    
    // Reset on mouse leave
    heroSection.addEventListener('mouseleave', () => {
        heroImage.style.transform = 'translateY(0) scale(1)';
        document.querySelectorAll('.floating-element').forEach(element => {
            element.style.transform = 'translate(0, 0)';
        });
        
        const techGrid = document.querySelector('.tech-grid');
        if (techGrid) {
            techGrid.style.transform = 'translate(0, 0)';
        }
    });
}

// Create floating elements with enhanced visuals
function createFloatingElements(count = 20) {
    const floatingContainer = document.querySelector('.floating-elements');
    if (!floatingContainer) return;
    
    // Clear existing elements
    floatingContainer.innerHTML = '';
    
    // Tech-inspired color palette
    const colors = [
        '#00f3ff', // Neon Blue
        '#b967ff', // Neon Purple
        '#ff2a6d', // Neon Pink
        '#05ffa1', // Neon Green
        '#ffeb3b', // Bright Yellow
        '#ff9800', // Orange
        '#e91e63', // Pink
        '#9c27b0'  // Purple
    ];
    
    for (let i = 0; i < count; i++) {
        const element = document.createElement('div');
        element.classList.add('floating-element');
        
        // Random properties with wider range
        const size = Math.random() * 20 + 8; // 8-28px (larger)
        const top = Math.random() * 120 - 10; // -10% to 110% (more coverage)
        const left = Math.random() * 120 - 10;
        const animationDuration = Math.random() * 6 + 4; // 4-10s (faster)
        const animationDelay = Math.random() * 5; // 0-5s
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Apply styles
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.top = `${top}%`;
        element.style.left = `${left}%`;
        element.style.background = color;
        element.style.animationDuration = `${animationDuration}s`;
        element.style.animationDelay = `${animationDelay}s`;
        element.style.boxShadow = `0 0 20px ${color}, 0 0 40px ${color}`; // Enhanced glow
        
        // Add pulsing effect
        element.style.animation = `float ${animationDuration}s infinite linear`;
        
        floatingContainer.appendChild(element);
    }
}

// Initialize enhanced hover effects - FIXED VERSION
function initializeHoverEffects() {
    // Service cards ripple effect - FIXED to not interfere with links
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            // Don't create ripple if clicking on a link
            if (e.target.closest('a')) return;
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.transition = 'all 0.6s ease';
            ripple.style.pointerEvents = 'none'; // Important: don't interfere with clicks
            ripple.style.zIndex = '1';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.style.width = '300px';
                ripple.style.height = '300px';
                ripple.style.opacity = '0';
            }, 10);
            
            setTimeout(() => {
                if (ripple.parentNode === this) {
                    this.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Stat cards number pulse effect
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const number = this.querySelector('.stat-number');
            if (number) {
                number.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    number.style.transform = 'scale(1)';
                }, 300);
            }
        });
    });
    
    // Button magnetic effect - ONLY for actual buttons, not links
    document.querySelectorAll('.cta-button, .submit-button').forEach(button => {
        if (button.tagName === 'BUTTON') { // Only apply to actual button elements
            button.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                this.style.transform = `translate(${deltaX * 5}px, ${deltaY * 5}px)`;
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0)';
            });
        }
    });
}

// REMOVED: The problematic service card button animation code
// This was causing issues with the learn more links

// Form submission - FIXED to be more specific
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data more reliably
        const nameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');
        const messageInput = this.querySelector('textarea');
        
        const name = nameInput ? nameInput.value : '';
        const email = emailInput ? emailInput.value : '';
        const message = messageInput ? messageInput.value : '';
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', { name, email, message });
        
        // Show success message with animation
        const submitButton = this.querySelector('.submit-button');
        if (submitButton) {
            const originalText = submitButton.querySelector('span').textContent;
            
            submitButton.querySelector('span').textContent = 'Message Sent!';
            submitButton.style.background = 'var(--neon-green)';
            
            setTimeout(() => {
                submitButton.querySelector('span').textContent = originalText;
                submitButton.style.background = '';
            }, 3000);
        }
        
        // Reset form
        this.reset();
    });
}

// Add loading state with enhanced animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add subtle pulse to important elements
    setInterval(() => {
        document.querySelectorAll('.service-icon, .contact-icon').forEach(icon => {
            icon.style.transform = 'scale(1.1)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 300);
        });
    }, 5000);
});

// Add explicit click handler for learn more buttons to ensure they work
document.addEventListener('DOMContentLoaded', function() {
    // Ensure learn more buttons work
    document.querySelectorAll('.learn-more-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Let the link work normally - don't prevent default
            console.log('Learn More clicked:', this.href);
        });
        
        // Make sure buttons are properly styled and clickable
        button.style.pointerEvents = 'auto';
        button.style.cursor = 'pointer';
    });
});