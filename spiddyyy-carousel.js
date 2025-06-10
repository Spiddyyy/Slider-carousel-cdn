 document.addEventListener('DOMContentLoaded', () => {
        // Calculate viewport-based defaults
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight - carouselConfig.header;

        // Set default configuration if carouselConfig is not defined
        if (!window.carouselConfig) {
            console.warn('carouselConfig not defined. Using default configuration.');
            window.carouselConfig = {
                width: `${viewportWidth}px`,
                height: `${viewportHeight}px`,
                autoplayInterval: 2000,
                transitionSpeed: '0.5s',
                buttonBg: 'rgba(0, 0, 0, 0.5)',
                buttonColor: 'white',
                showNavButtons: true,
                prevButtonContent: '❮',
                nextButtonContent: '❯',
                autoplay: true,
                header : 0   // dynmic header height adjustment

            };
        }

        const config = window.carouselConfig;
        const carouselContainer = document.querySelector('.spiddyyy-carousel-container');
        if (!carouselContainer) {
            console.error('Spiddyyy carousel container not found. Ensure a <div class="spiddyyy-carousel-container"> exists.');
            return;
        }

        // Validate and set dimensions
        const width = config.width.includes('%') || config.width.includes('vw') ? config.width : parseFloat(config.width) ? `${parseFloat(config.width)}px` : `${viewportWidth}px`;
        const height = config.height.includes('%') || config.height.includes('vh') ? config.height : parseFloat(config.height) ? `${parseFloat(config.height)}px` : `${viewportHeight}px`;

        carouselContainer.style.setProperty('--spiddyyy-carousel-width', width);
        carouselContainer.style.setProperty('--spiddyyy-carousel-height', height);
        carouselContainer.style.setProperty('--spiddyyy-transition-speed', config.transitionSpeed);
        carouselContainer.style.setProperty('--spiddyyy-button-bg', config.buttonBg);
        carouselContainer.style.setProperty('--spiddyyy-button-color', config.buttonColor);
        carouselContainer.style.setProperty('--spiddyyy-nav-display', config.showNavButtons ? 'block' : 'none');

        const carousel = document.querySelector('.spiddyyy-carousel');
        const prevButton = document.querySelector('.spiddyyy-prev');
        const nextButton = document.querySelector('.spiddyyy-next');
        const slideContents = document.querySelectorAll('.spiddyyy-slide-content');

        // Set custom button content
        if (prevButton && config.prevButtonContent) prevButton.innerHTML = config.prevButtonContent;
        if (nextButton && config.nextButtonContent) nextButton.innerHTML = config.nextButtonContent;

        if (slideContents.length === 0) {
            console.warn('No slides defined. Add <div class="spiddyyy-slide-content"> elements inside the spiddyyy-carousel.');
            return;
        }

        // Clear original content and prepare carousel
        carousel.innerHTML = '';

        // Create original slides
        slideContents.forEach(content => {
            const slideElement = document.createElement('div');
            slideElement.classList.add('spiddyyy-slide');
            slideElement.appendChild(content.cloneNode(true));
            slideElement.firstChild.style.display = 'block';
            carousel.appendChild(slideElement);
        });

        // Clone slides for infinite loop
        slideContents.forEach(content => {
            const cloneFirst = document.createElement('div');
            cloneFirst.classList.add('spiddyyy-slide');
            cloneFirst.appendChild(content.cloneNode(true));
            cloneFirst.firstChild.style.display = 'block';
            carousel.appendChild(cloneFirst);
        });

        slideContents.forEach(content => {
            const cloneLast = document.createElement('div');
            cloneLast.classList.add('spiddyyy-slide');
            cloneLast.appendChild(content.cloneNode(true));
            cloneLast.firstChild.style.display = 'block';
            carousel.insertBefore(cloneLast, carousel.firstChild);
        });

        const allSlides = document.querySelectorAll('.spiddyyy-carousel .spiddyyy-slide');
        const totalSlides = slideContents.length;
        const slideWidth = carouselContainer.offsetWidth; // Use actual container width for dynamic sizing

        function showSlide(index, useTransition = true) {
            currentIndex = index;
            if (currentIndex >= allSlides.length) {
                currentIndex = (currentIndex % totalSlides + totalSlides) % totalSlides + totalSlides;
            } else if (currentIndex < 0) {
                currentIndex = (currentIndex % totalSlides + totalSlides) % totalSlides + totalSlides;
            }
            carousel.style.transition = useTransition ? `transform ${config.transitionSpeed} ease-in-out` : 'none';
            carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }

        function nextSlide() {
            showSlide(currentIndex + 1);
        }

        function prevSlide() {
            showSlide(currentIndex - 1);
        }

        function startAutoPlay() {
            if (config.autoplay) {
                autoPlayInterval = setInterval(nextSlide, config.autoplayInterval);
            }
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        // Initialize carousel
        let currentIndex = totalSlides;
        showSlide(currentIndex, false);

        if (config.showNavButtons && prevButton && nextButton) {
            nextButton.addEventListener('click', () => {
                stopAutoPlay();
                nextSlide();
                startAutoPlay();
            });

            prevButton.addEventListener('click', () => {
                stopAutoPlay();
                prevSlide();
                startAutoPlay();
            });
        }

        carousel.addEventListener('transitionend', () => {
            if (currentIndex >= allSlides.length - totalSlides) {
                showSlide(currentIndex % totalSlides + totalSlides, false);
            } else if (currentIndex < totalSlides) {
                showSlide(currentIndex + totalSlides, false);
            }
        });

        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // Handle window resize for dynamic width
        window.addEventListener('resize', () => {
            const newWidth = carouselContainer.offsetWidth;
            carousel.style.transform = `translateX(-${currentIndex * newWidth}px)`;
        });

        startAutoPlay();
    });
