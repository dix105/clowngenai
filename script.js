document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       HERO ANIMATION (GEOMETRIC SHAPES)
       ========================================= */
    function initHeroAnimation() {
        const container = document.querySelector('.hero-bg-animation');
        if (!container) return;
        
        const shapes = ['circle', 'square', 'triangle'];
        const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)'];
        const count = 15; // Number of shapes
        
        for (let i = 0; i < count; i++) {
            const shape = document.createElement('div');
            const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
            
            shape.classList.add('geo-shape', shapeType);
            
            // Random styling
            const size = Math.random() * 50 + 20; // 20px to 70px
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            
            // Random position
            shape.style.left = `${Math.random() * 100}%`;
            
            // Random animation params
            const duration = Math.random() * 10 + 10; // 10s to 20s
            const delay = Math.random() * 5;
            shape.style.animationDuration = `${duration}s`;
            shape.style.animationDelay = `-${delay}s`;
            
            container.appendChild(shape);
        }
    }
    
    initHeroAnimation();

    /* =========================================
       MOBILE MENU
       ========================================= */
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu on link click
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.textContent = '☰';
            });
        });
    }

    /* =========================================
       SCROLL ANIMATIONS (INTERSECTION OBSERVER)
       ========================================= */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });

    /* =========================================
       FAQ ACCORDION
       ========================================= */
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all others
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    /* =========================================
       MODAL LOGIC (PRIVACY / TERMS)
       ========================================= */
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const modalClosers = document.querySelectorAll('[data-modal-close]');

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }
    }

    function closeModal(modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = trigger.getAttribute('data-modal-target');
            openModal(targetId);
        });
    });

    modalClosers.forEach(closer => {
        closer.addEventListener('click', () => {
            const modalId = closer.getAttribute('data-modal-close');
            const modal = document.getElementById(modalId);
            if (modal) closeModal(modal);
        });
    });

    // Close on outside click
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
});