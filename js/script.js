/**
 * SchoolAR Website Scripts
 * Author: [Your Name]
 * Description: Main JavaScript file for SchoolAR website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', 
                menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('active') && 
            !event.target.closest('nav') && !event.target.closest('.menu-toggle')) {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Add Dark Mode Toggle
    const body = document.body;

    // Create dark mode toggle button if it doesn't exist
    if (!document.querySelector('.dark-mode-toggle')) {
        const darkModeToggle = document.createElement('button');
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.setAttribute('aria-label', 'Cambiar modo oscuro');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        body.appendChild(darkModeToggle);

        // Check for saved user preference
        const darkMode = localStorage.getItem('darkMode');
        if (darkMode === 'enabled') {
            enableDarkMode();
        }

        // Dark mode toggle functionality
        darkModeToggle.addEventListener('click', function() {
            if (body.classList.contains('dark-mode')) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    }

    // Dark mode functions
    function enableDarkMode() {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        document.querySelector('.dark-mode-toggle i').className = 'fas fa-sun';
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', null);
        document.querySelector('.dark-mode-toggle i').className = 'fas fa-moon';
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Basic form validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showError(field, 'Este campo es obligatorio');
                } else {
                    clearError(field);

                    // Email validation
                    if (field.type === 'email') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(field.value)) {
                            isValid = false;
                            showError(field, 'Por favor, introduce un email válido');
                        }
                    }
                }
            });

            if (isValid) {
                // Generate a random contact number for EmailJS
                contactForm.querySelector('input[name="contact_number"]').value = 
                    Math.floor(Math.random() * 100000);

                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

                // Send the form using EmailJS
                // IMPORTANTE: Reemplaza 'service_id' y 'template_id' con tus IDs de EmailJS
                // - service_id: El ID de tu servicio de email en EmailJS (ej. 'gmail')
                // - template_id: El ID de tu plantilla de email en EmailJS
                emailjs.sendForm('service_83yiw7g', 'template_6rn394h', contactForm)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        showFormSuccess();

                        // Reset form and button
                        contactForm.reset();
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    }, function(error) {
                        console.log('FAILED...', error);
                        showFormError('Lo sentimos, ha ocurrido un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');

                        // Reset button
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    });
            }
        });
    }

    function showError(field, message) {
        // Clear any existing error
        clearError(field);

        // Add error class to the form group
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('has-error');

            // Create and append error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = message;
            formGroup.appendChild(errorMessage);
        }
    }

    function clearError(field) {
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('has-error');
            const errorMessage = formGroup.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        }
    }

    function showFormSuccess() {
        // Hide the form
        contactForm.style.display = 'none';

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>¡Mensaje enviado con éxito!</h3>
            <p>Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible.</p>
            <button class="btn secondary-btn" id="resetForm">Enviar otro mensaje</button>
        `;

        contactForm.parentNode.appendChild(successMessage);

        // Add event listener to reset button
        document.getElementById('resetForm').addEventListener('click', function() {
            contactForm.reset();
            contactForm.style.display = 'grid';
            successMessage.remove();
        });
    }

    function showFormError(message) {
        // Create error message container
        const errorContainer = document.createElement('div');
        errorContainer.className = 'form-error';
        errorContainer.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        `;

        // Insert error message before the form
        contactForm.parentNode.insertBefore(errorContainer, contactForm);

        // Remove error message after 5 seconds
        setTimeout(() => {
            errorContainer.remove();
        }, 5000);
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });

    // Add animation on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0) {
        // Check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
        }

        // Add animation class when element is in viewport
        function checkAnimations() {
            animatedElements.forEach(element => {
                if (isInViewport(element) && !element.classList.contains('animated')) {
                    element.classList.add('animated');
                }
            });
        }

        // Check animations on scroll
        window.addEventListener('scroll', checkAnimations);

        // Check animations on page load
        checkAnimations();
    }
});
