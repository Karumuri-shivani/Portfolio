document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active class (basic)
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id], header[id]');
    const navbar = document.querySelector('.navbar');
    let navbarHeight = navbar ? navbar.offsetHeight : 70; // Default if navbar not found

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50; // Add a small offset
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
        // Fallback for top of page if no section is "current"
        if (current === '' && pageYOffset < sections[0].offsetTop - navbarHeight - 50) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('.nav-links a[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }
    });

    // Recalculate navbar height on resize (if it can change)
    window.addEventListener('resize', () => {
        navbarHeight = navbar ? navbar.offsetHeight : 70;
    });
});