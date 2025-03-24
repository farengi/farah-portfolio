document.addEventListener('DOMContentLoaded', function() {
    // Get the header element
    const header = document.getElementById('header');
    
    // Get back to top button
    const backToTopButton = document.getElementById('backToTop');
    
    // Get all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Get all sections
    const sections = document.querySelectorAll('section[id]');
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
        // Add shadow to header when scrolled
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show/hide back to top button
        if (window.scrollY > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
        
        // Highlight active navigation link based on scroll position
        highlightActiveNavLink();
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                // If it's just "#", scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Otherwise scroll to the target element
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    
                    window.scrollTo({
                        top: targetPosition - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Function to highlight active navigation link
    function highlightActiveNavLink() {
        let scrollPosition = window.scrollY;
        
        // Get current visible section
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active');
            }
        });
    }
    
    // Call once to set initial state
    highlightActiveNavLink();
    
    // Optional: Add animation effects to elements when they enter viewport
    const animatedElements = document.querySelectorAll('.project-card, .experience-card, .education-item, .activity-item');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Set initial state and observe elements
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
});