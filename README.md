# Slider Carousel CDN

This repository provides a lightweight, customizable, and continuous-loop image carousel, served via jsDelivr. It features smooth sliding transitions, navigation buttons, a 2-second autoplay interval, and hover-to-pause functionality, making it ideal for any website.

## Features
- **Continuous Loop**: Seamlessly cycles through images (1, 2, 3, 1, 2, 3, ...).
- **Autoplay**: Transitions every 2 seconds (configurable).
- **Navigation Buttons**: Previous (`❮`) and next (`❯`) buttons for manual control.
- **Hover-to-Pause**: Pauses autoplay when hovering over the carousel.
- **Customizable**: Adjust dimensions, transition speed, button styles, and images via a simple configuration object.
- **CDN-Hosted**: Delivered via jsDelivr for fast, global access using Cloudflare, Fastly, and other providers.

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge).
- Basic HTML knowledge to integrate the carousel.

### Integration
1. **Create an HTML File**:
   Copy the following code into your HTML file (e.g., `index.html`):

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Slider Carousel</title>
       <!-- CDN CSS -->
       <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/chethangowda001/Slider-carousel-cdn@latest/carousel.min.css">
   </head>
   <body>
       <div class="carousel-container">
           <div class="carousel" id="carousel"></div>
           <button class="nav-button prev">❮</button>
           <button class="nav-button next">❯</button>
       </div>

       <!-- Configuration -->
       <script>
           const carouselConfig = {
               width: '600px', // Carousel width
               height: '400px', // Carousel height
               autoplayInterval: 2000, // Time per slide in milliseconds
               transitionSpeed: '0.5s', // Transition duration
               buttonBg: 'rgba(0, 0, 0, 0.5)', // Button background
               buttonColor: 'white', // Button text/icon color
               images: [
                   { src: 'https://via.placeholder.com/600x400/FF0000/FFFFFF?text=Image+1', alt: 'Image 1' },
                   { src: 'https://via.placeholder.com/600x400/00FF00/FFFFFF?text=Image+2', alt: 'Image 2' },
                   { src: 'https://via.placeholder.com/600x400/0000FF/FFFFFF?text=Image+3', alt: 'Image 3' }
               ]
           };
       </script>
       <!-- CDN JavaScript -->
       <script src="https://cdn.jsdelivr.net/gh/chethangowda001/Slider-carousel-cdn@latest/carousel.min.js"></script>
   </body>
   </html>
