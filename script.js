    // Theme Toggle (Day / Night)
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    let isDark = true;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.setAttribute('data-theme', 'light');
        isDark = false;
    }

    themeToggle.addEventListener('click', () => {
        if (isDark) {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        }
        isDark = !isDark;
    });

    // Sticky Navigation
    const stickyNav = document.getElementById('stickyNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            stickyNav.classList.add('visible');
        } else {
            stickyNav.classList.remove('visible');
        }
    });

    // Scroll Down Button
    const scrollDown = document.getElementById('scrollDown');
    scrollDown.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Pricing Accordion
    const pricingHeaders = document.querySelectorAll('.pricing-header');
    pricingHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const isActive = header.classList.contains('active');
            
            // Close all other accordions
            pricingHeaders.forEach(h => {
                if (h !== header) {
                    h.classList.remove('active');
                    h.nextElementSibling.style.maxHeight = null;
                }
            });
            
            // Toggle current accordion
            if (!isActive) {
                header.classList.add('active');
                const content = header.nextElementSibling;
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                header.classList.remove('active');
                header.nextElementSibling.style.maxHeight = null;
            }
        });
    });

    // Portfolio Card Lighting Effect
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // Open first pricing item by default
    if (pricingHeaders.length > 0) {
        pricingHeaders[0].click();
    }

    // Sample Image Gallery Modal
    const sampleModal = document.getElementById('sampleModal');
    const sampleModalImg = document.getElementById('sampleModalImg');
    const sampleModalTitle = document.getElementById('sampleModalTitle');
    const sampleModalCounter = document.getElementById('sampleModalCounter');
    const samplePrev = document.getElementById('samplePrev');
    const sampleNext = document.getElementById('sampleNext');
    const sampleModalClose = document.getElementById('sampleModalClose');
    const sampleModalOverlay = document.getElementById('sampleModalOverlay');

    let currentGallery = { prefix: '', count: 0, index: 0, title: '' };

    function updateGalleryImage() {
        const num = String(currentGallery.index + 1).padStart(2, '0');
        sampleModalImg.classList.remove('loaded');
        sampleModalImg.src = `${currentGallery.prefix} ${num}.jpg`;
        sampleModalImg.alt = `${currentGallery.title} sample ${num}`;
        sampleModalCounter.textContent = `${currentGallery.index + 1} / ${currentGallery.count}`;
    }

    function openGallery(prefix, count, title) {
        currentGallery = { prefix, count, index: 0, title };
        sampleModalTitle.textContent = title;
        updateGalleryImage();
        sampleModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
        sampleModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.view-sample-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            openGallery(btn.dataset.prefix, parseInt(btn.dataset.count, 10), btn.dataset.title);
        });
    });

    samplePrev.addEventListener('click', () => {
        currentGallery.index = (currentGallery.index - 1 + currentGallery.count) % currentGallery.count;
        updateGalleryImage();
    });

    sampleNext.addEventListener('click', () => {
        currentGallery.index = (currentGallery.index + 1) % currentGallery.count;
        updateGalleryImage();
    });

    sampleModalClose.addEventListener('click', closeGallery);
    sampleModalOverlay.addEventListener('click', closeGallery);

    document.addEventListener('keydown', (e) => {
        if (!sampleModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeGallery();
        if (e.key === 'ArrowLeft') samplePrev.click();
        if (e.key === 'ArrowRight') sampleNext.click();
    });

    // Fade-in for enlarged sample images
    sampleModalImg.addEventListener('load', () => sampleModalImg.classList.add('loaded'));
    sampleModalImg.addEventListener('error', () => sampleModalImg.classList.add('loaded'));

    // Scroll reveal animation
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const revealItems = document.querySelectorAll('.section-title, .portfolio-card, .pricing-item, .about-img, .info-section, .social-links, .cv-btn');
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                el.classList.add('in');
                io.unobserve(el);
                setTimeout(() => {
                    el.classList.remove('reveal', 'in');
                    el.style.transitionDelay = '';
                }, 1300);
            });
        }, { threshold: 0.12 });
        revealItems.forEach((el, i) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${(i % 3) * 90}ms`;
            io.observe(el);
        });
    }
