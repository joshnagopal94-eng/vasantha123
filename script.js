/**
 * Vasantha H. Portfolio - JavaScript Interactions
 * Core Functionalities:
 * - Dynamic mouse glow backdrop tracker
 * - Loop-based writing/deleting typing animation
 * - Interactive sticky nav scroll transitions
 * - Mobile hamburger drawer toggles & link self-collapses
 * - Dynamic IntersectionObserver for Scroll-active Nav Link highlighting
 * - Intersect-triggered skills progress bar loading animations
 * - Professional contact form validation and interactive state success panels
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. Mouse Glow Tracking Backdrop Effect
    // ==========================================
    const mouseGlow = document.getElementById("mouse-glow");
    if (mouseGlow) {
        document.addEventListener("mousemove", (e) => {
            mouseGlow.style.left = `${e.clientX}px`;
            mouseGlow.style.top = `${e.clientY}px`;
        });
    }

    // ==========================================
    // 2. Typing Animation
    // ==========================================
    const typingText = document.getElementById("typing-text");
    const words = ["BCA Student", "Student at Gfgwc", "Aikshethra Intern", "Software Enthusiast"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove character
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster deleting speed
        } else {
            // Add character
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Default typing speed
        }

        // Handle transitions between words
        if (!isDeleting && charIndex === currentWord.length) {
            // Word fully typed, pause before deleting
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Word fully deleted, move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before starting typing next word
        }

        setTimeout(type, typingSpeed);
    }

    if (typingText) {
        setTimeout(type, 1000);
    }

    // ==========================================
    // 3. Sticky Header Scroll Effect
    // ==========================================
    const header = document.querySelector(".header");
    const scrollTopBtn = document.getElementById("scroll-top-btn");

    window.addEventListener("scroll", () => {
        const scrollPos = window.scrollY;
        
        // Sticky Header toggle
        if (scrollPos > 50) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }

        // Scroll to Top Button toggle
        if (scrollPos > 500) {
            scrollTopBtn.classList.add("active");
        } else {
            scrollTopBtn.classList.remove("active");
        }
    });

    // Scroll to top execution
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // ==========================================
    // 4. Mobile Navigation Hamburg Drawer Toggles
    // ==========================================
    const mobileToggle = document.getElementById("mobile-toggle");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    if (mobileToggle && navbar) {
        // Toggle open state on hamburger click
        mobileToggle.addEventListener("click", () => {
            mobileToggle.classList.toggle("active");
            navbar.classList.toggle("open");
            // Disable scroll when mobile menu is open
            document.body.style.overflow = navbar.classList.contains("open") ? "hidden" : "initial";
        });

        // Close menu and restore scroll when clicking any nav link
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileToggle.classList.remove("active");
                navbar.classList.remove("open");
                document.body.style.overflow = "initial";
            });
        });
    }

    // ==========================================
    // 5. Scroll-Active Navigation Tracker
    // ==========================================
    const sections = document.querySelectorAll("section[id]");
    
    function activeNavOnScroll() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // Subtract header buffer
            const sectionId = current.getAttribute("id");
            const navLink = document.querySelector(`.navbar a[href*=${sectionId}]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove("active"));
                    navLink.classList.add("active");
                }
            }
        });
    }
    
    window.addEventListener("scroll", activeNavOnScroll);

    // ==========================================
    // 6. Dynamic Skills Reveal Scroll-Trigger
    // ==========================================
    const skillBars = document.querySelectorAll(".skill-bar-fill");
    
    // Reset widths to 0 initially to prepare for IntersectionObserver scroll transition
    skillBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.setAttribute("data-target-width", targetWidth);
        bar.style.width = "0%";
    });

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute("data-target-width");
                bar.style.width = targetWidth;
                observer.unobserve(bar); // Animate only once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it fully rolls into center viewport
    });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ==========================================
    // 7. Interactive Form Handler & Success Panel
    // ==========================================
    const contactForm = document.getElementById("contact-form");
    const formSuccessBanner = document.getElementById("form-success-banner");
    const resetFormBtn = document.getElementById("reset-form-btn");

    if (contactForm && formSuccessBanner) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Stop page reload
            
            // Collect Form Inputs
            const nameInput = document.getElementById("name").value.trim();
            const emailInput = document.getElementById("email").value.trim();
            const subjectInput = document.getElementById("subject").value.trim();
            const messageInput = document.getElementById("message").value.trim();

            if (!nameInput || !emailInput || !subjectInput || !messageInput) {
                alert("Please fill in all the required form fields.");
                return;
            }

            // Select submit button and simulate loading/sending
            const submitBtn = contactForm.querySelector(".form-submit-btn");
            const originalBtnContent = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `Sending... <i class="fa-solid fa-spinner fa-spin"></i>`;

            // Simulate AJAX request delay (1.5 seconds)
            setTimeout(() => {
                // Success: Transition state to Success Panel
                contactForm.style.opacity = "0";
                contactForm.style.transform = "scale(0.95)";
                
                setTimeout(() => {
                    contactForm.style.display = "none";
                    formSuccessBanner.classList.add("active");
                }, 300);

                // Restore submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
            }, 1500);
        });
    }

    if (resetFormBtn && contactForm && formSuccessBanner) {
        resetFormBtn.addEventListener("click", () => {
            // Clear inputs
            contactForm.reset();
            
            // Revert Transition
            formSuccessBanner.classList.remove("active");
            
            setTimeout(() => {
                contactForm.style.display = "flex";
                contactForm.style.opacity = "1";
                contactForm.style.transform = "scale(1)";
            }, 300);
        });
    }
});
