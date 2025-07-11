document.addEventListener('DOMContentLoaded', () => {
    // Menu Hambúrguer Functionality
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const menuOverlay = document.getElementById('menu-overlay');
    const viagensLink = document.getElementById('viagens-link');
    const viagensSubmenu = document.getElementById('viagens-submenu');

    // Toggle menu
    hamburgerIcon.addEventListener('click', () => {
        hamburgerIcon.classList.toggle('active');
        menuOverlay.classList.toggle('active');
    });

    // Close menu when clicking outside
    menuOverlay.addEventListener('click', (e) => {
        if (e.target === menuOverlay) {
            hamburgerIcon.classList.remove('active');
            menuOverlay.classList.remove('active');
        }
    });

    // Toggle submenu
    viagensLink.addEventListener('click', () => {
        viagensSubmenu.classList.toggle('active');
    });

    // Calculate days since May 4, 2019 in Brasília timezone
    function updateDayCounter() {
        const startDate = new Date('2019-05-04T00:00:00-03:00');
        const now = new Date();
        const brasiliaTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
        const diffTime = Math.abs(brasiliaTime - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        document.getElementById('days-count').textContent = diffDays;
    }

    function startCounter() {
        updateDayCounter();
        setInterval(updateDayCounter, 60000);
    }

    startCounter();

    // Create initial burst of hearts
    function createInitialHearts() {
        const container = document.querySelector('.floating-hearts-container');
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('floating-heart');
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.animationDuration = Math.random() * 3 + 2 + 's';
                heart.style.fontSize = Math.random() * 20 + 10 + 'px';
                heart.style.opacity = Math.random() * 0.5 + 0.5;
                heart.innerHTML = '❤️';
                container.appendChild(heart);

                setTimeout(() => {
                    heart.remove();
                }, 5000);
            }, i * 100);
        }
    }

    createInitialHearts();

    // Add floating hearts animation
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.5;
        heart.innerHTML = '❤️';
        document.querySelector('.floating-hearts-container').appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    setInterval(createHeart, 300);

    // Add parallax effect to title and quote
    const title = document.querySelector('.title');
    const quote = document.querySelector('.romantic-quote');
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 30;
        const y = (window.innerHeight / 2 - e.pageY) / 30;
        title.style.transform = `translateX(${x}px) translateY(${y}px)`;
        quote.style.transform = `translateX(${-x}px) translateY(${-y}px)`;
    });

    // Add typing effect to text content
    const textContent = document.querySelector('.text-content');
    const originalText = textContent.innerHTML;
    textContent.innerHTML = '';
    let textAnimationComplete = false;
    let textAnimationStarted = false;
    
    // Hide images initially
    const images = document.querySelectorAll('.small-image');
    images.forEach(img => {
        img.style.display = 'none';
    });
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            textContent.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            textAnimationComplete = true;
            // Show images and allow full scrolling
            images.forEach(img => {
                img.style.display = 'inline-block';
            });
            showImagesSequentially();
        }
    }

    // Function to show images sequentially
    function showImagesSequentially() {
        images.forEach((image, index) => {
            image.style.opacity = '0';
            image.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                image.style.opacity = '1';
                image.style.transform = 'translateY(0)';
            }, index * 300);
        });
    }
    
    // Check if text section is in view
    function checkTextVisibility() {
        const textSection = document.querySelector('.text-section');
        const rect = textSection.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
        
        if (isVisible && !textAnimationStarted) {
            textAnimationStarted = true;
            typeWriter();
        }
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', checkTextVisibility);
    // Check initial visibility
    checkTextVisibility();
});

// Add custom styles for new elements
const style = document.createElement('style');
style.textContent = `
    .floating-heart {
        position: fixed;
        font-size: 20px;
        pointer-events: none;
        animation: float-up linear forwards;
    }

    .love-message {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 77, 109, 0.9);
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        font-family: 'Dancing Script', cursive;
        font-size: 1.5rem;
        animation: fade-in-out 2s ease-in-out;
        pointer-events: none;
    }

    @keyframes float-up {
        0% {
            transform: translateY(100vh) scale(0);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
        }
    }

    @keyframes fade-in-out {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;
document.head.appendChild(style); 