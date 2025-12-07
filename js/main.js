console.log("Aman.AI Website Loaded");

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const navTriggers = document.querySelectorAll('.nav-trigger');

    function switchTab(targetId) {
        // Update Sections
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });

        // Update Nav Links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            }
        });
    }

    // Handle Nav Link Clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            switchTab(targetId);
        });
    });

    // Handle CTA Buttons (Nav Triggers)
    navTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = trigger.getAttribute('data-target');
            switchTab(targetId);
        });
    });

    // Mobile Menu Toggle Logic
    const hamburger = document.getElementById('hamburger-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (sidebar.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Toggle menu on hamburger click
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Close menu when clicking overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking a nav link on mobile
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });


    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    const sunIcon = themeBtn.querySelector('.sun-icon');
    const moonIcon = themeBtn.querySelector('.moon-icon');
    const body = document.body;

    // Check for saved theme, default to light theme for first-time visitors
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        // Dark mode
        body.classList.remove('light-theme');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        // Light mode (default)
        body.classList.add('light-theme');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        if (!savedTheme) {
            localStorage.setItem('theme', 'light');
        }
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');

        if (body.classList.contains('light-theme')) {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
            localStorage.setItem('theme', 'light');
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
            localStorage.setItem('theme', 'dark');
        }
    });

    // Custom Cursor Bubble Logic
    const bubble = document.createElement('div');
    bubble.classList.add('cursor-bubble');
    document.body.appendChild(bubble);

    document.addEventListener('mousemove', (e) => {
        bubble.style.left = e.clientX + 'px';
        bubble.style.top = e.clientY + 'px';
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => bubble.classList.add('active'));
        el.addEventListener('mouseleave', () => bubble.classList.remove('active'));
    });

    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    const formStatus = document.querySelector('.form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                    formStatus.style.color = '#10b981';
                    formStatus.style.display = 'block';
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                formStatus.textContent = '✗ Oops! Something went wrong. Please try again or email me directly.';
                formStatus.style.color = '#ef4444';
                formStatus.style.display = 'block';
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;

                // Hide status message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }
        });
    }
});
