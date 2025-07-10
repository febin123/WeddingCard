
    window.addEventListener('load', function() {
      const video = document.getElementById('bgVideo');
      video.muted = false; // Video will play with sound by default
      video.play().catch(e => console.log("Play failed:", e));

      // After everything is loaded, wait 1.5 seconds then fade out
      setTimeout(function() {
        document.body.classList.add('loaded');
        
        // Remove loading screen after fade out completes
        setTimeout(function() {
          document.querySelector('.loading-screen').style.display = 'none';
        }, 1000);
      }, 2000);
    });

    // Countdown timer
    function updateCountdown() {
      const weddingDate = new Date("February 14, 2026 00:00:00").getTime();
      const now = new Date().getTime();
      const distance = weddingDate - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      document.getElementById("days").textContent = days.toString().padStart(2, '0');
      document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
      document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
      document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update every second
    updateCountdown();
    setInterval(updateCountdown, 1000);


    // Video toggle
    document.getElementById('videoToggle').addEventListener('click', function() {
      const video = document.getElementById('bgVideo');
      const icon = this.querySelector('i');
      if (video.paused) {
        video.play();
        icon.classList.remove('fa-video-slash');
        icon.classList.add('fa-video');
      } else {
        video.pause();
        icon.classList.remove('fa-video');
        icon.classList.add('fa-video-slash');
      }
    });

    // Raining Flowers Logic
    const flowerRainContainer = document.getElementById('flower-rain-container');
    const ourStorySection = document.getElementById('our-story');
    const flowerImageSrc = "https://freesvg.org/img/Rosa-muscosa-alba---color.png"; // Use a light flower image
    let flowerInterval;
    let flowersActive = false;

    // Function to create a single falling flower
    function createFallingFlower() {
        if (!flowersActive) return; // Stop if effect is inactive

        const flower = document.createElement('img');
        flower.src = flowerImageSrc;
        flower.classList.add('falling-flower');

        // Randomize size
        const size = Math.random() * 20 + 20; // Size between 20px and 40px
        flower.style.width = `${size}px`;
        flower.style.height = `${size}px`;

        // Randomize horizontal position
        const startX = Math.random() * 100; // 0% to 100% of width
        flower.style.left = `${startX}vw`;

        // Randomize animation duration (for varied falling speeds)
        const duration = Math.random() * 8 + 5; // 5 to 13 seconds
        flower.style.animationDuration = `${duration}s`;

        // Randomize animation delay (to stagger drops)
        const delay = Math.random() * 0.5; // 0 to 0.5 seconds delay
        flower.style.animationDelay = `-${delay}s`; // Negative delay starts animation partway through

        // Random initial rotation
        const initialRotation = Math.random() * 360;
        flower.style.setProperty('--rotation', `${initialRotation}deg`);


        flowerRainContainer.appendChild(flower);

        // Remove flower after it falls off screen to prevent DOM clutter
        flower.addEventListener('animationend', () => {
            flower.remove();
        });
    }

    // Intersection Observer to detect when "Our Story" section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // "Our Story" section is in view
                if (!flowersActive) {
                    flowersActive = true;
                    flowerRainContainer.classList.add('active'); // Fade in container
                    // MODIFIED LINE: Increased interval for even fewer flowers
                    flowerInterval = setInterval(createFallingFlower, 1000); // Generate a flower every 1000ms (1 second)
                }
            } else {
                // "Our Story" section is out of view
                if (flowersActive) {
                    flowersActive = false;
                    clearInterval(flowerInterval); // Stop generating new flowers
                    flowerRainContainer.classList.remove('active'); // Fade out container

                    // Optional: Remove all existing flowers after a delay (matching fade-out)
                    setTimeout(() => {
                        flowerRainContainer.innerHTML = '';
                    }, 1000); 
                }
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    observer.observe(ourStorySection);
