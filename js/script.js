document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Update Copyright Year automatically
    const copyYearElement = document.getElementById('copy-year');
    if (copyYearElement) {
        copyYearElement.textContent = new Date().getFullYear();
    }

    // 2. Mobile Menu (Hamburger) Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('active'); // Changed to 'active' to match your CSS
            
            // Update accessibility attribute
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });

        // Close mobile menu automatically when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 3. Sticky Header & Back to Top Button on Scroll
    const header = document.getElementById('site-header');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if (header) header.classList.add('scrolled');
            if (backToTop) backToTop.classList.add('visible');
        } else {
            if (header) header.classList.remove('scrolled');
            if (backToTop) backToTop.classList.remove('visible');
        }
    });

    // Smooth scroll back to top when button is clicked
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. Scroll Reveal Animations
    // Automatically add the 'reveal' class to important elements
    const sections = document.querySelectorAll('.section-pad, .hero-content, .stat-card, .about-card, .notice-card, .event-card, .resource-card, .library-card, .teacher-card, .prefect-card');
    sections.forEach(section => {
        if(!section.classList.contains('reveal') && !section.classList.contains('reveal-left') && !section.classList.contains('reveal-right')) {
            section.classList.add('reveal');
        }
    });

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop observing once revealed
                }
            });
        }, { threshold: 0.1 }); // Triggers when 10% of the element is visible

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // 5. Number Counters for Statistics (Homepage only)
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const endValue = parseInt(target.getAttribute('data-target'));
                    let startValue = 0;
                    const duration = 2000; // Animation lasts 2 seconds
                    const increment = endValue / (duration / 16); 

                    const updateCounter = () => {
                        startValue += increment;
                        if (startValue < endValue) {
                            target.textContent = Math.ceil(startValue);
                            requestAnimationFrame(updateCounter);
                        } else {
                            target.textContent = endValue;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(target); // Stop observing once counted
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => statsObserver.observe(stat));
    }

    // 6. HERO IMAGE SLIDER
    const slides = document.querySelectorAll('.hero-slider .slide');
    let currentSlide = 0;
    const slideInterval = 5000; // Change image every 5 seconds (5000ms)

    if (slides.length > 0) {
        setInterval(() => {
            // Remove 'active' class from current slide
            slides[currentSlide].classList.remove('active');
            
            // Move to the next slide, loop back to 0 if at the end
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Add 'active' class to the new slide
            slides[currentSlide].classList.add('active');
        }, slideInterval);
    }

    // 7. GALLERY IMAGE FILTERING (New Section)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove 'active' class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add 'active' class to the clicked button
                btn.classList.add('active');

                // Get the text of the clicked button (e.g., "All", "Ceremonies")
                const filterValue = btn.textContent.toLowerCase().trim();

                // Loop through all images to show/hide them
                galleryItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block'; // Show all
                    } else {
                        // Check if the image overlay text matches the button category
                        const itemText = item.querySelector('.gallery-overlay span').textContent.toLowerCase();
                        
                        // Custom matching logic
                        let isMatch = false;
                        if (filterValue === 'ceremonies' && (itemText.includes('katina') || itemText.includes('sil'))) {
                            isMatch = true;
                        } else if (filterValue === 'classrooms' && itemText.includes('class')) {
                            isMatch = true;
                        } else if (itemText.includes(filterValue)) {
                            isMatch = true;
                        }

                        // Apply the display property
                        item.style.display = isMatch ? 'block' : 'none';
                    }
                });
            });
        });
    }

});