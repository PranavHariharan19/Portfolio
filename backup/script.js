document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation Setup
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once it has become visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Split section titles into letters for staggered reveal
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        
        const chars = text.split('');
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
            span.className = 'letter-split';
            span.style.transitionDelay = `${index * 0.06}s`;
            title.appendChild(span);
        });
        observer.observe(title);
    });

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Optional dynamic cursor glow tracking
    document.addEventListener('mousemove', (e) => {
        const bgFx = document.querySelector('.bg-fx');
        if(bgFx) {
            // Slight parallax on background blobs based on mouse movement
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            const blob1 = document.querySelector('.blob-1');
            const blob2 = document.querySelector('.blob-2');
            
            if(blob1) blob1.style.transform = `translate(${x}px, ${y}px)`;
            if(blob2) blob2.style.transform = `translate(${-x}px, ${-y}px)`;
        }
    });
});
