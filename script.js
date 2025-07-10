document.addEventListener('DOMContentLoaded', function() {
    // Create coin rain effect
    function createCoinRain() {
        const coinRain = document.querySelector('.coin-rain');
        const coinsCount = window.innerWidth < 768 ? 15 : 30;
        
        for (let i = 0; i < coinsCount; i++) {
            const coin = document.createElement('div');
            coin.classList.add('coin');
            
            // Random position
            const left = Math.random() * 100;
            coin.style.left = `${left}%`;
            
            // Random size
            const size = 10 + Math.random() * 15;
            coin.style.width = `${size}px`;
            coin.style.height = `${size}px`;
            
            // Random animation duration
            const duration = 5 + Math.random() * 15;
            coin.style.animationDuration = `${duration}s`;
            
            // Random delay
            const delay = Math.random() * 15;
            coin.style.animationDelay = `${delay}s`;
            
            // Random opacity
            const opacity = 0.5 + Math.random() * 0.5;
            coin.style.opacity = opacity;
            
            coinRain.appendChild(coin);
        }
    }
    
    createCoinRain();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Discord member count
    async function fetchDiscordMembers() {
        try {
            const response = await fetch('https://discord.com/api/guilds/1388208596348833844/widget.json');
            const data = await response.json();
            
            if (data.members) {
                const memberCount = data.members.length;
                document.getElementById('memberCount').textContent = `${memberCount.toLocaleString()}+ members`;
                document.getElementById('onlineCount').textContent = data.members.filter(m => m.status !== 'offline').length;
                
                // Update stats
                document.getElementById('members-count').textContent = `${Math.floor(memberCount * 1.5).toLocaleString()}+`;
            }
        } catch (error) {
            console.error('Error fetching Discord member count:', error);
            document.getElementById('memberCount').textContent = 'Community';
        }
    }
    
    fetchDiscordMembers();
    
    // Gold particle background
    function initGoldParticles() {
        const container = document.getElementById('gold-particles');
        const particlesCount = window.innerWidth < 768 ? 30 : 80;
        
        for (let i = 0; i < particlesCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('gold-particle');
            
            // Random position
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            particle.style.left = `${left}%`;
            particle.style.top = `${top}%`;
            
            // Random size
            const size = 2 + Math.random() * 4;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random opacity
            const opacity = 0.2 + Math.random() * 0.5;
            particle.style.opacity = opacity;
            
            // Random animation
            const duration = 10 + Math.random() * 20;
            const delay = Math.random() * 10;
            particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;
            
            container.appendChild(particle);
        }
    }
    
    initGoldParticles();
    
    // Animate stats
    function animateStats() {
        const successRate = document.getElementById('success-rate');
        const uptime = document.getElementById('uptime');
        
        let rate = 95;
        const rateInterval = setInterval(() => {
            rate += 0.1;
            successRate.textContent = `${rate.toFixed(1)}%`;
            
            if (rate >= 99.9) {
                clearInterval(rateInterval);
                successRate.textContent = '99.9%';
            }
        }, 20);
        
        let uptimeValue = 95;
        const uptimeInterval = setInterval(() => {
            uptimeValue += 0.5;
            uptime.textContent = `${uptimeValue.toFixed(0)}%`;
            
            if (uptimeValue >= 100) {
                clearInterval(uptimeInterval);
                uptime.textContent = '100%';
            }
        }, 20);
    }
    
    // Initialize animations when stats are in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.stats-section'));
    
    // Gold hover effects
    const goldElements = document.querySelectorAll('.gold-text, .gold-button, .feature-icon, .nav-logo');
    goldElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.filter = 'brightness(1.1)';
        });
        el.addEventListener('mouseleave', () => {
            el.style.filter = 'brightness(1)';
        });
    });
    
    // Parallax effect for hero illustration
    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 20;
        const y = (window.innerHeight / 2 - e.pageY) / 20;
        const goldAnimation = document.querySelector('.gold-animation');
        
        if (goldAnimation) {
            goldAnimation.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
        }
    });
});