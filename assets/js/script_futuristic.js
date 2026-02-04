
document.addEventListener('DOMContentLoaded', function () {

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact Form Handling with EmailJS
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Get form values
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            // Handle optional subject if present, or default
            const subjectInput = this.querySelector('input[name="subject"]');
            const subject = subjectInput ? subjectInput.value : "Portfolio Contact";
            const message = this.querySelector('textarea[name="message"]').value;
            const submitBtn = this.querySelector('button[type="submit"]');

            // Simple Validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Loading State
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = 'TRANSMITTING...';
            submitBtn.disabled = true;

            // Initialize EmailJS (using the ID from original script)
            // Note: In production, IDs should be in environment variables, but preserving existing behavior here.
            if (typeof emailjs !== 'undefined') {
                emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

                emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
                    .then(function (response) {
                        console.log('SUCCESS!', response.status, response.text);
                        contactForm.reset();
                        showNotification('TRANSMISSION SUCCESSFUL', 'success');
                        submitBtn.innerHTML = originalBtnContent;
                        submitBtn.disabled = false;
                    }, function (error) {
                        console.log('FAILED...', error);
                        showNotification('TRANSMISSION FAILED. RETRY?', 'error');
                        submitBtn.innerHTML = originalBtnContent;
                        submitBtn.disabled = false;
                    });
            } else {
                console.error('EmailJS not loaded');
                showNotification('System Error: Email Service Offline', 'error');
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.disabled = false;
            }
        });
    }
});

// Helper: Email Validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Helper: Futuristic Notification System
function showNotification(message, type) {
    // Check if notification container exists, else create it
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(container);
    }

    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'rgba(6, 182, 212, 0.9)' : 'rgba(239, 68, 68, 0.9)'; // Cyber Cyan or Red
    const borderColor = type === 'success' ? '#22d3ee' : '#f87171';

    notification.style.cssText = `
        background: ${bgColor};
        border: 1px solid ${borderColor};
        color: white;
        padding: 16px 24px;
        border-radius: 4px;
        font-family: 'Space Grotesk', monospace;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 1px;
        box-shadow: 0 0 20px ${bgColor};
        backdrop-filter: blur(10px);
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
        clip-path: polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%);
    `;

    notification.innerText = `>> ${message}`;
    container.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });

    // Remove after 3s
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}
