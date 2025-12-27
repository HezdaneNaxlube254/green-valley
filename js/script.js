// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Change icon
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// WhatsApp Click Tracking
const whatsappButtons = document.querySelectorAll('a[href*="whatsapp"], a[href*="wa.me"]');
whatsappButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        // You can add analytics tracking here
        console.log('WhatsApp CTA clicked:', this.href);
        
        // For demo purposes, show a message if phone number is placeholder
        if (this.href.includes('254700000000')) {
            if (!confirm('This is a demo. In a real website, this would open WhatsApp to contact the school. Continue to demo?')) {
                e.preventDefault();
            }
        }
    });
});

// Form Handling (for contact form if exists)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.classList.add('loading');
        
        // Simulate API call (in real implementation, use fetch to your backend)
        setTimeout(() => {
            // Show success message
            alert('Thank you for your message! In a real implementation, this would send to the school\'s email. We\'ll get back to you soon.');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('loading');
        }, 1500);
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            e.preventDefault();
            
            // Calculate offset for fixed navbar
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Testimonial Slider (if needed)
function initTestimonialSlider() {
    const testimonialContainer = document.querySelector('.testimonials-grid');
    if (!testimonialContainer || window.innerWidth > 768) return;
    
    // Only enable on mobile
    testimonialContainer.style.display = 'flex';
    testimonialContainer.style.overflowX = 'auto';
    testimonialContainer.style.scrollSnapType = 'x mandatory';
    testimonialContainer.style.gap = '0';
    
    const testimonialCards = testimonialContainer.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.style.flex = '0 0 90%';
        card.style.scrollSnapAlign = 'start';
        card.style.marginRight = '1rem';
    });
}

// Initialize on load and resize
window.addEventListener('load', initTestimonialSlider);
window.addEventListener('resize', initTestimonialSlider);

// Back to Top Button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 999;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
`;

backToTopButton.addEventListener('mouseenter', () => {
    backToTopButton.style.backgroundColor = 'var(--primary-dark)';
    backToTopButton.style.transform = 'translateY(-2px)';
});

backToTopButton.addEventListener('mouseleave', () => {
    backToTopButton.style.backgroundColor = 'var(--primary-color)';
    backToTopButton.style.transform = 'translateY(0)';
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.body.appendChild(backToTopButton);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Add CSS for back to top button
const style = document.createElement('style');
style.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background-color: #2E7D32;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 999;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    }
    
    .back-to-top:hover {
        background-color: #1B5E20;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    }
    
    @media (max-width: 768px) {
        .back-to-top {
            bottom: 1rem;
            right: 1rem;
            width: 45px;
            height: 45px;
        }
    }
`;
document.head.appendChild(style);

// Image Lazy Loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Current Year for Footer Copyright
const currentYearElement = document.querySelector('.footer-copyright');
if (currentYearElement) {
    const currentYear = new Date().getFullYear();
    currentYearElement.innerHTML = currentYearElement.innerHTML.replace('2024', currentYear);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage.includes(linkPage.replace('.html', '')) && linkPage !== 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
