document.addEventListener('DOMContentLoaded', () => {
    // Calculate days since May 4, 2019
    function updateDayCounter() {
        const startDate = new Date('2019-05-04');
        const today = new Date();
        const diffTime = Math.abs(today - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        document.getElementById('days-count').textContent = diffDays;
    }

    // Update day counter immediately and then every day
    updateDayCounter();
    setInterval(updateDayCounter, 24 * 60 * 60 * 1000);

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

    // Create initial hearts
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

    // Create hearts periodically
    setInterval(createHeart, 300);

    // Add click effect to photos
    const photos = document.querySelectorAll('.photo');
    photos.forEach((photo) => {
        photo.addEventListener('click', () => {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            photo.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 1000);

            // Add love message
            const message = document.createElement('div');
            message.classList.add('love-message');
            message.textContent = 'Te amo! ❤️';
            photo.appendChild(message);

            // Create burst of hearts on click
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.classList.add('floating-heart');
                    heart.style.left = (Math.random() * 100 - 50 + 50) + '%';
                    heart.style.top = (Math.random() * 100 - 50 + 50) + '%';
                    heart.style.animationDuration = Math.random() * 2 + 1 + 's';
                    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
                    heart.innerHTML = '❤️';
                    photo.appendChild(heart);

                    setTimeout(() => {
                        heart.remove();
                    }, 2000);
                }, i * 100);
            }

            // Remove message after animation
            setTimeout(() => {
                message.remove();
            }, 2000);
        });
    });

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
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            textContent.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect when text section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(textContent);
});

// Add custom styles for new elements
const style = document.createElement('style');
style.textContent = `
    .floating-heart {
        position: fixed;
        font-size: 20px;
        pointer-events: none;
        animation: float-up linear forwards;
        z-index: 1000;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple 1s linear;
        pointer-events: none;
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

    @keyframes ripple {
        to {
            transform: scale(4);
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