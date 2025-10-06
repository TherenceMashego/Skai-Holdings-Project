// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollAnimations();
    initCommunityAnimations();
});

// Initialize mobile menu
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}

// Initialize scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.focus-area, .story-card, .involvement-option, .value').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Initialize community animations
function initCommunityAnimations() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach((stat, index) => {
        stat.style.animationDelay = `${index * 0.3}s`;
    });
    
    // Create additional community dots
    const communityDots = document.querySelector('.community-dots');
    for (let i = 0; i < 8; i++) {
        const dot = document.createElement('div');
        dot.style.position = 'absolute';
        dot.style.width = '6px';
        dot.style.height = '6px';
        dot.style.background = 'var(--uthando-accent)';
        dot.style.borderRadius = '50%';
        dot.style.animation = `pulseCommunity 2s ease-in-out ${i * 0.5}s infinite`;
        
        const left = 10 + Math.random() * 80;
        const top = 10 + Math.random() * 80;
        dot.style.left = `${left}%`;
        dot.style.top = `${top}%`;
        
        communityDots.appendChild(dot);
    }
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--bg-light)';
        header.style.backdropFilter = 'none';
    }
});