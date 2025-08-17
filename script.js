// On page load, fade out loading screen
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
  
  setTimeout(function() {
    document.querySelector('.loading-screen').style.display = 'none';
  }, 1000);  
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

// Intersection Observer for Celebration Section
document.addEventListener('DOMContentLoaded', function() {
  const timelineItems = document.querySelectorAll('.timeline-item');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  timelineItems.forEach(item => {
    observer.observe(item);
  });

  // Music handling
  const music = document.getElementById('weddingMusic');
  music.volume = 0.5; // Set volume to 50% so it's not too loud

  function showMusicControls() {
    const musicControls = document.createElement('div');
    musicControls.className = 'music-controls';
    musicControls.innerHTML = `
      <button onclick="toggleMusic()" class="text-[#5a4a2a]">
        <i class="fas fa-play"></i>
      </button>
    `;
    document.body.appendChild(musicControls);
  }

  function toggleMusic() {
    if (music.paused) {
      music.play();
      document.querySelector('.music-controls i').classList.remove('fa-play');
      document.querySelector('.music-controls i').classList.add('fa-pause');
    } else {
      music.pause();
      document.querySelector('.music-controls i').classList.remove('fa-pause');
      document.querySelector('.music-controls i').classList.add('fa-play');
    }
  }

  // Try to play music automatically (may be blocked by browser)
  const playPromise = music.play();
  
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      // Autoplay was prevented - show play button
      showMusicControls();
    });
  }

  // Also try to play on first user interaction
  document.body.addEventListener('click', function firstInteraction() {
    music.play().catch(e => console.log("Playback failed:", e));
    document.body.removeEventListener('click', firstInteraction);
  }, { once: true });
});

// Raining Flowers Logic (keep your existing code for this)
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

     // Add this to your existing script section
  document.addEventListener('DOMContentLoaded', function() {
    // Try to play music after user interaction (to comply with autoplay policies)
    function playMusic() {
      const music = document.getElementById('weddingMusic');
      const playPromise = music.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Autoplay was prevented - show play button
          console.log('Autoplay prevented, showing play button');
          showMusicControls();
        });
      }
    }
    
    function showMusicControls() {
      const musicControls = document.createElement('div');
      musicControls.className = 'music-controls fixed bottom-4 right-4 bg-white p-2 rounded-full shadow-lg';
      musicControls.innerHTML = `
        <button onclick="document.getElementById('weddingMusic').play()" class="text-[#5a4a2a]">
          <i class="fas fa-play"></i>
        </button>
      `;
      document.body.appendChild(musicControls);
    }
    
    // Try to play when loading screen disappears
    document.querySelector('.loading-screen').addEventListener('transitionend', playMusic);
    
    // Also try to play on first user interaction
    document.body.addEventListener('click', function firstInteraction() {
      playMusic();
      document.body.removeEventListener('click', firstInteraction);
    }, { once: true });
  });