 document.addEventListener('DOMContentLoaded', () => {
            // Set default configuration if carouselConfig is not defined
            if (!window.carouselConfig) {
                console.warn('carouselConfig not defined. Using default configuration.');
                window.carouselConfig = {
                    width: '600px',
                    height: '400px',
                    autoplayInterval: 2000,
                    transitionSpeed: '0.5s',
                    buttonBg: 'rgba(0, 0, 0, 0.5)',
                    buttonColor: 'white',
                    slides: []
                };
            }

            const config = window.carouselConfig;
            const carouselContainer = document.querySelector('.carousel-container');
            if (!carouselContainer) {
                console.error('Carousel container not found.');
                return;
            }

            carouselContainer.style.setProperty('--carousel-width', config.width);
            carouselContainer.style.setProperty('--carousel-height', config.height);
            carouselContainer.style.setProperty('--transition-speed', config.transitionSpeed);
            carouselContainer.style.setProperty('--button-bg', config.buttonBg);
            carouselContainer.style.setProperty('--button-color', config.buttonColor);

            const carousel = document.querySelector('.carousel');
            const prevButton = document.querySelector('.prev');
            const nextButton = document.querySelector('.next');
            let currentIndex = config.slides.length;
            let autoPlayInterval;

            const originalSlides = config.slides;

            // Create original slides
            originalSlides.forEach(slide => {
                const slideElement = document.createElement('div');
                slideElement.classList.add('slide');
                slideElement.innerHTML = slide.content;
                carousel.appendChild(slideElement);
            });

            // Clone slides for infinite loop
            originalSlides.forEach(slide => {
                const cloneFirst = document.createElement('div');
                cloneFirst.classList.add('slide');
                cloneFirst.innerHTML = slide.content;
                carousel.appendChild(cloneFirst);
            });

            originalSlides.slice().reverse().forEach(slide => {
                const cloneLast = document.createElement('div');
                cloneLast.classList.add('slide');
                cloneLast.innerHTML = slide.content;
                carousel.insertBefore(cloneLast, carousel.firstChild);
            });

            const allSlides = document.querySelectorAll('.carousel .slide');
            const totalSlides = originalSlides.length;
            const slideWidth = parseFloat(config.width);

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
                autoPlayInterval = setInterval(nextSlide, config.autoplayInterval);
            }

            function stopAutoPlay() {
                clearInterval(autoPlayInterval);
            }

            // Only initialize if there are slides
            if (totalSlides > 0) {
                showSlide(currentIndex, false);

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

                carousel.addEventListener('transitionend', () => {
                    if (currentIndex >= allSlides.length - totalSlides) {
                        showSlide(currentIndex % totalSlides + totalSlides, false);
                    } else if (currentIndex < totalSlides) {
                        showSlide(currentIndex + totalSlides, false);
                    }
                });

                carousel.addEventListener('mouseenter', stopAutoPlay);
                carousel.addEventListener('mouseleave', startAutoPlay);

                startAutoPlay();
            } else {
                console.warn('No slides defined in carouselConfig.');
            }
        });
