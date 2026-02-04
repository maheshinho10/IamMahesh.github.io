$(document).ready(function () {

    // Preloader
    setTimeout(function() {
        $('.loader-container').addClass('fade-out');
    }, 1000);

    // Scroll Progress Indicator
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        document.getElementById('scrollProgress').style.width = scrollPercent + '%';
    }

    // Update scroll progress on scroll
    window.addEventListener('scroll', updateScrollProgress);

    // Mobile menu toggle
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Close mobile menu on scroll
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        // Scroll to top button
        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // Scroll spy for navigation
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });

        // Animate elements on scroll
        animateOnScroll();
    });

    // Animate elements on scroll
    function animateOnScroll() {
        $('.modern-card, .blog-card, .contact-card, .skill-item').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate-in');
            }
        });
    }

    // Smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 80,
        }, 500, 'linear')
    });

    // Modern hover effects for cards
    $('.modern-card').hover(
        function() {
            $(this).addClass('hover-effect');
        },
        function() {
            $(this).removeClass('hover-effect');
        }
    );

    // EmailJS contact form
    $("#contact-form").submit(function (event) {
        event.preventDefault();
        
        // Basic form validation
        const name = $('input[name="name"]').val();
        const email = $('input[name="email"]').val();
        const subject = $('input[name="subject"]').val();
        const message = $('textarea[name="message"]').val();

        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.html();
        submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Sending...');
        submitBtn.prop('disabled', true);

        // Initialize EmailJS
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                showNotification('Message sent successfully!', 'success');
                submitBtn.html(originalText);
                submitBtn.prop('disabled', false);
            }, function (error) {
                console.log('FAILED...', error);
                showNotification('Failed to send message. Please try again.', 'error');
                submitBtn.html(originalText);
                submitBtn.prop('disabled', false);
            });
    });

    // Animate stats on scroll
    function animateStats() {
        $('.stat-number').each(function() {
            const $this = $(this);
            const countTo = $this.text();
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(countTo);
                }
            });
        });
    }

    // Trigger stats animation when stats section is visible
    $(window).scroll(function() {
        const statsSection = $('.hero-stats');
        const statsTop = statsSection.offset().top;
        const statsBottom = statsTop + statsSection.outerHeight();
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();

        if (statsBottom > viewportTop && statsTop < viewportBottom) {
            if (!statsSection.hasClass('animated')) {
                statsSection.addClass('animated');
                animateStats();
            }
        }
    });

    // Initialize animations
    animateOnScroll();
    updateScrollProgress();

    // Initialize tooltips
    $('[data-tooltip]').each(function() {
        $(this).tooltip({
            position: { my: 'left+5 center', at: 'right center' }
        });
    });

});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = $(`
        <div class="notification notification-${type}">
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `);

    $('body').append(notification);
    
    // Show notification
    setTimeout(() => {
        notification.addClass('show');
    }, 100);

    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);

    // Close button
    notification.find('.notification-close').click(() => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.removeClass('show');
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// Page visibility change
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Mahesh Dharma - Frontend Developer & React Native Specialist";
        $("#favicon").attr("href", "assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "assets/images/favhand.png");
    }
});

// Typed.js effect
var typed = new Typed(".typing-text", {
    strings: [
        "React Development",
        "React Native Development", 
        "Frontend Development",
        "Mobile App Development",
        "Web Development"
    ],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 2000,
    startDelay: 1000
});

// Skills data and rendering
const skillsData = {
    frontend: [
        { name: "React", icon: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/000000/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png" },
        { name: "JavaScript", icon: "https://img.icons8.com/color/48/000000/javascript--v1.png" },
        { name: "HTML5", icon: "https://img.icons8.com/color/48/000000/html-5--v1.png" },
        { name: "CSS3", icon: "https://img.icons8.com/color/48/000000/css3.png" },
        { name: "TypeScript", icon: "https://img.icons8.com/color/48/000000/typescript.png" },
        { name: "Redux", icon: "https://img.icons8.com/color/48/000000/redux.png" }
    ],
    mobile: [
        { name: "React Native", icon: "https://img.icons8.com/color/48/000000/react-native.png" },
        { name: "Android", icon: "https://img.icons8.com/fluency/48/000000/android-os.png" },
        { name: "Java", icon: "https://img.icons8.com/color/48/000000/java-coffee-cup-logo--v1.png" },
        { name: "Kotlin", icon: "https://img.icons8.com/color/48/000000/kotlin.png" }
    ],
    backend: [
        { name: "Node.js", icon: "https://img.icons8.com/color/48/000000/nodejs.png" },
        { name: "Express.js", icon: "https://img.icons8.com/fluency/48/000000/node-js.png" },
        { name: "MongoDB", icon: "https://img.icons8.com/color/48/000000/mongodb.png" },
        { name: "MySQL", icon: "https://img.icons8.com/color/48/000000/mysql-logo.png" },
        { name: "Firebase", icon: "https://img.icons8.com/color/48/000000/firebase.png" }
    ],
    tools: [
        { name: "Git", icon: "https://img.icons8.com/color/48/000000/git.png" },
        { name: "GitHub", icon: "https://img.icons8.com/color/48/000000/github.png" },
        { name: "AWS", icon: "https://img.icons8.com/color/48/000000/amazon-web-services.png" },
        { name: "Heroku", icon: "https://img.icons8.com/color/48/000000/heroku.png" },
        { name: "Netlify", icon: "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/48/000000/external-netlify-a-cloud-computing-company-that-offers-hosting-and-serverless-backend-services-for-static-websites-logo-shadow-tal-revivo.png" }
    ]
};

// Render skills
function renderSkills() {
    Object.keys(skillsData).forEach(category => {
        const container = document.getElementById(`${category}Skills`);
        if (container) {
            const skillsHTML = skillsData[category].map(skill => `
                <div class="skill-item" data-tooltip="${skill.name}">
                    <img src="${skill.icon}" alt="${skill.name}" />
                    <span>${skill.name}</span>
                </div>
            `).join('');
            container.innerHTML = skillsHTML;
        }
    });
}



// Initialize everything when DOM is ready
$(document).ready(function() {
    renderSkills();
});

// Vanilla Tilt effect
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});

// Scroll Reveal animations
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true,
    delay: 200
});

// Hero section animations
srtop.reveal('.hero-badge', { delay: 100 });
srtop.reveal('.content h1', { delay: 200 });
srtop.reveal('.hero-subtitle', { delay: 300 });
srtop.reveal('.hero-description', { delay: 400 });
srtop.reveal('.hero-stats', { delay: 500 });
srtop.reveal('.hero-buttons', { delay: 600 });
srtop.reveal('.socials', { delay: 700 });
srtop.reveal('.hero-image', { delay: 400 });

// About section animations
srtop.reveal('.about-image', { delay: 200 });
srtop.reveal('.about-header', { delay: 300 });
srtop.reveal('.about-description', { delay: 400 });
srtop.reveal('.about-highlights', { delay: 500 });
srtop.reveal('.about-contact', { delay: 600 });
srtop.reveal('.about-actions', { delay: 700 });

// Skills section animations
srtop.reveal('.skills-category', { interval: 200 });





// Blogs section animations
srtop.reveal('.blog-card', { interval: 200 });

// Contact section animations
srtop.reveal('.contact-card', { interval: 200 });
srtop.reveal('.contact-form', { delay: 400 });

// Footer animations
srtop.reveal('.footer-section', { interval: 200 });

// Disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// Add CSS for notifications
const notificationCSS = `
<style>
.notification {
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    padding: 1.5rem 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 40rem;
}

.notification.show {
    transform: translateX(0);
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
}

.notification-content i {
    font-size: 1.8rem;
}

.notification-success .notification-content i {
    color: #10b981;
}

.notification-error .notification-content i {
    color: #ef4444;
}

.notification-info .notification-content i {
    color: #3b82f6;
}

.notification-content span {
    font-size: 1.4rem;
    color: #374151;
    font-weight: 500;
}

.notification-close {
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    font-size: 1.4rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
}

.notification-close:hover {
    background: #f3f4f6;
    color: #374151;
}

@media (max-width: 768px) {
    .notification {
        top: 1rem;
        right: 1rem;
        left: 1rem;
        max-width: none;
    }
}
</style>
`;

// Inject notification CSS
document.head.insertAdjacentHTML('beforeend', notificationCSS);