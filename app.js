// Portfolio JavaScript functionality with animated tech cover

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-toggle__icon');
    
    // Check for saved theme preference or default to light mode
    let currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    updateThemeIcon(currentTheme);
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    
    themeToggle.addEventListener('click', function() {
        currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        currentTheme = newTheme;
    });

    // Binary Rain Animation
    function initBinaryRain() {
        const canvas = document.getElementById('binaryCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Binary rain variables
        const columns = Math.floor(canvas.width / 20);
        const drops = [];
        
        // Initialize drops
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * canvas.height;
        }
        
        function drawBinaryRain() {
            // Check for reduced motion preference
            if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }
            
            // Semi-transparent background
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Get current theme colors
            const isDark = currentTheme === 'dark';
            ctx.fillStyle = isDark ? 'rgba(50, 184, 198, 0.5)' : 'rgba(33, 128, 141, 0.3)';
            ctx.font = '12px monospace';
            
            // Draw the drops
            for (let i = 0; i < drops.length; i++) {
                const text = Math.random() > 0.5 ? '1' : '0';
                const x = i * 20;
                const y = drops[i];
                
                ctx.fillText(text, x, y);
                
                // Reset drop position
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                } else {
                    drops[i] = y + 20;
                }
            }
        }
        
        setInterval(drawBinaryRain, 50);
    }
    
    // Initialize binary rain
    initBinaryRain();

    // Enhanced Code Elements Animation
    function initCodeElements() {
        const codeElements = document.querySelectorAll('.code-element');
        
        codeElements.forEach((element, index) => {
            const delay = element.getAttribute('data-delay') || 0;
            
            // Add staggered animation start
            setTimeout(() => {
                element.style.animationPlayState = 'running';
            }, parseInt(delay));
            
            // Add hover interaction
            element.addEventListener('mouseenter', function() {
                this.style.animationDuration = '3s';
                this.style.transform = 'scale(1.2)';
                this.style.opacity = '1';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.animationDuration = '12s';
                this.style.transform = 'scale(1)';
                this.style.opacity = '';
            });
        });
    }
    
    initCodeElements();

    // Dynamic Particle System
    function createParticles() {
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        const particleContainer = document.querySelector('.tech-particles');
        if (!particleContainer) return;
        
        // Create additional particles dynamically
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.className = 'dynamic-particle';
            particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: var(--color-teal-400);
                border-radius: 50%;
                opacity: 0.4;
                animation: float ${8 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 8}s;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
            `;
            particleContainer.appendChild(particle);
        }
    }
    
    createParticles();

    // Tech Cover Interaction
    function initTechCoverInteraction() {
        const techCover = document.getElementById('techCover');
        if (!techCover) return;
        
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', function(e) {
            if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }
            
            mouseX = (e.clientX / window.innerWidth) * 100;
            mouseY = (e.clientY / window.innerHeight) * 100;
            
            // Move geometric shapes based on mouse position
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const intensity = 0.5 + (index * 0.2);
                const offsetX = (mouseX - 50) * intensity * 0.1;
                const offsetY = (mouseY - 50) * intensity * 0.1;
                
                shape.style.transform = `translate(${offsetX}px, ${offsetY}px) ${shape.style.transform}`;
            });
            
            // Subtle parallax for code elements
            const codeElements = document.querySelectorAll('.code-element');
            codeElements.forEach((element, index) => {
                const intensity = 0.2 + (index * 0.05);
                const offsetX = (mouseX - 50) * intensity * 0.05;
                const offsetY = (mouseY - 50) * intensity * 0.05;
                
                element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
        });
    }
    
    initTechCoverInteraction();

    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav__menu--open');
            navToggle.classList.toggle('nav__toggle--open');
        });
    }

    // Smooth scrolling for all navigation links and action buttons
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu) {
                    navMenu.classList.remove('nav__menu--open');
                }
                if (navToggle) {
                    navToggle.classList.remove('nav__toggle--open');
                }
            }
        });
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    function highlightActiveNav() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('nav__link--active'));
                if (navLink) {
                    navLink.classList.add('nav__link--active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveNav);

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');
            
            const name = nameField.value.trim();
            const email = emailField.value.trim();
            const message = messageField.value.trim();
            
            // Clear previous error states
            clearFormErrors();
            
            // Basic form validation
            let hasErrors = false;
            
            if (!name) {
                showFieldError(nameField, 'Name is required');
                hasErrors = true;
            }
            
            if (!email) {
                showFieldError(emailField, 'Email is required');
                hasErrors = true;
            } else if (!isValidEmail(email)) {
                showFieldError(emailField, 'Please enter a valid email address');
                hasErrors = true;
            }
            
            if (!message) {
                showFieldError(messageField, 'Message is required');
                hasErrors = true;
            }
            
            if (hasErrors) {
                showNotification('Please fix the errors above and try again.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`, 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1000);
        });
    }

    // Form field error handling
    function showFieldError(field, message) {
        field.classList.add('form-control--error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    function clearFormErrors() {
        const errorFields = document.querySelectorAll('.form-control--error');
        const errorMessages = document.querySelectorAll('.field-error');
        
        errorFields.forEach(field => field.classList.remove('form-control--error'));
        errorMessages.forEach(msg => msg.remove());
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Enhanced notification system
    function showNotification(message, type = 'info') {
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__message">${message}</span>
                <button class="notification__close">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.addEventListener('click', () => notification.remove());
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Scroll animations for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.value-prop, .project-card, .testimonial, .certification, .skill-category');
    animateElements.forEach(el => observer.observe(el));

    // Enhanced typing animation for hero tagline
    const heroTagline = document.querySelector('.hero__tagline');
    if (heroTagline) {
        const originalText = heroTagline.textContent;
        let currentText = '';
        let currentIndex = 0;
        let isDeleting = false;
        
        function typeWriter() {
            if (!isDeleting && currentIndex < originalText.length) {
                currentText += originalText.charAt(currentIndex);
                heroTagline.textContent = currentText + '|';
                currentIndex++;
                setTimeout(typeWriter, 50);
            } else if (isDeleting && currentIndex > 0) {
                currentText = currentText.slice(0, -1);
                heroTagline.textContent = currentText + '|';
                currentIndex--;
                setTimeout(typeWriter, 30);
            } else if (!isDeleting && currentIndex === originalText.length) {
                // Pause, then remove cursor
                setTimeout(() => {
                    heroTagline.textContent = originalText;
                }, 1000);
            }
        }
        
        // Start typing animation after a short delay
        heroTagline.textContent = '|';
        setTimeout(typeWriter, 1500);
    }

    // Copy email to clipboard functionality
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.href.replace('mailto:', '');
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(() => {
                    showNotification('Email address copied to clipboard!', 'success');
                }).catch(() => {
                    window.location.href = this.href;
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    showNotification('Email address copied to clipboard!', 'success');
                } catch (err) {
                    window.location.href = this.href;
                }
                document.body.removeChild(textArea);
            }
        });
    });

    // Enhanced skills animation on scroll
    const skillTags = document.querySelectorAll('.skill-tag');
    const skillsSection = document.getElementById('skills');
    
    function animateSkills() {
        if (!skillsSection) return;
        
        const sectionTop = skillsSection.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        if (scrollPosition > sectionTop + 200) {
            skillTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.opacity = '1';
                    tag.style.transform = 'translateY(0) scale(1)';
                }, index * 50);
            });
        }
    }
    
    // Initialize skills animation
    skillTags.forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px) scale(0.8)';
        tag.style.transition = 'all 0.3s ease-out';
    });
    
    window.addEventListener('scroll', animateSkills);

    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat__number');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        const bioSection = document.getElementById('about');
        if (!bioSection) return;
        
        const sectionTop = bioSection.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        if (scrollPosition > sectionTop + 200) {
            statsAnimated = true;
            
            statNumbers.forEach(stat => {
                const finalNumber = stat.textContent;
                const numericValue = parseInt(finalNumber.replace('+', ''));
                const isPlus = finalNumber.includes('+');
                let currentNumber = 0;
                const increment = Math.ceil(numericValue / 30);
                
                const counter = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= numericValue) {
                        stat.textContent = numericValue + (isPlus ? '+' : '');
                        clearInterval(counter);
                    } else {
                        stat.textContent = currentNumber + (isPlus ? '+' : '');
                    }
                }, 60);
            });
        }
    }
    
    window.addEventListener('scroll', animateStats);

    // Tech Stack Orbit Animation (Additional Enhancement)
 

    // Initialize page with enhanced loading
    setTimeout(() => {
        document.body.classList.add('loaded');
        
        // Trigger initial code elements animation
        const codeElements = document.querySelectorAll('.code-element');
        codeElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '0.8';
            }, index * 200);
        });
    }, 100);

    // Performance optimization - throttle mouse movement
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(initTechCoverInteraction);
            ticking = true;
        }
    }
});

// Add enhanced styles dynamically
const enhancedStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-base);
        box-shadow: var(--shadow-lg);
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
    }
    
    .notification--success {
        border-left: 4px solid var(--color-success);
    }
    
    .notification--error {
        border-left: 4px solid var(--color-error);
    }
    
    .notification--info {
        border-left: 4px solid var(--color-info);
    }
    
    .notification__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-16);
    }
    
    .notification__message {
        color: var(--color-text);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
    }
    
    .notification__close {
        background: none;
        border: none;
        color: var(--color-text-secondary);
        font-size: 18px;
        cursor: pointer;
        margin-left: var(--space-12);
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification__close:hover {
        color: var(--color-text);
    }
    
    .form-control--error {
        border-color: var(--color-error) !important;
    }
    
    .field-error {
        color: var(--color-error);
        font-size: var(--font-size-sm);
        margin-top: var(--space-4);
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes orbitRotate {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    .header--scrolled {
        background: var(--color-surface);
        box-shadow: var(--shadow-sm);
    }
    
    .nav__link--active {
        color: var(--color-primary) !important;
    }
    
    .nav__link--active::after {
        width: 100% !important;
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @media (max-width: 768px) {
        .nav__menu--open {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--color-surface);
            border-top: 1px solid var(--color-border);
            padding: var(--space-16);
            box-shadow: var(--shadow-md);
            z-index: 999;
        }
        
        .nav__toggle--open span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav__toggle--open span:nth-child(2) {
            opacity: 0;
        }
        
        .nav__toggle--open span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
        
        .tech-orbit {
            width: 200px !important;
            height: 200px !important;
        }
        
        .tech-orbit div {
            font-size: var(--font-size-xs) !important;
            width: 45px !important;
            height: 25px !important;
            transform: translate(-50%, -50%) rotate(${index * 60}deg) translateY(-80px) rotate(-${index * 60}deg) !important;
        }
    }
    
    @media (prefers-reduced-motion: reduce) {
        .tech-orbit {
            animation: none !important;
        }
        
        .dynamic-particle {
            animation: none !important;
        }
    }
`;

// Inject enhanced styles
const styleSheet = document.createElement('style');
styleSheet.textContent = enhancedStyles;
document.head.appendChild(styleSheet);