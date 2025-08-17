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

// Music Handling
function setupMusic() {
  const music = document.getElementById('weddingMusic');
  const musicControls = document.getElementById('music-controls');
  const toggleBtn = document.getElementById('toggleMusic');
  const icon = toggleBtn.querySelector('i');
  
  // Set initial volume (50%)
  music.volume = 0.5;
  
  // Toggle music play/pause
  function toggleMusic() {
    if (music.paused) {
      music.play()
        .then(() => {
          icon.classList.remove('fa-play');
          icon.classList.add('fa-pause');
          musicControls.classList.remove('hidden');
        })
        .catch(error => {
          console.error("Playback failed:", error);
        });
    } else {
      music.pause();
      icon.classList.remove('fa-pause');
      icon.classList.add('fa-play');
    }
  }
  
  // Show controls when needed
  function showMusicControls() {
    musicControls.classList.remove('hidden');
  }
  
  // Event listeners
  toggleBtn.addEventListener('click', toggleMusic);
  
  // Try to play automatically (may be blocked by browser)
  const playPromise = music.play();
  
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      // Autoplay was prevented - show play button
      showMusicControls();
    });
  }
  
  // Also try to play on first user interaction
  document.body.addEventListener('click', function firstInteraction() {
    music.play()
      .then(() => {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        musicControls.classList.remove('hidden');
      })
      .catch(e => console.log("Playback failed:", e));
    document.body.removeEventListener('click', firstInteraction);
  }, { once: true });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Timeline animation
  const timelineItems = document.querySelectorAll('.timeline-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  timelineItems.forEach(item => observer.observe(item));
  
  // Setup music
  setupMusic();
  
  // Setup flower rain effect if element exists
  if (document.getElementById('flower-rain-container')) {
    setupFlowerRain();
  }
});

// Flower rain effect (only if needed)
function setupFlowerRain() {
  const flowerRainContainer = document.getElementById('flower-rain-container');
  const ourStorySection = document.getElementById('our-story');
  const flowerImageSrc = "https://freesvg.org/img/Rosa-muscosa-alba---color.png";
  let flowerInterval;
  let flowersActive = false;

  function createFallingFlower() {
    if (!flowersActive) return;

    const flower = document.createElement('img');
    flower.src = flowerImageSrc;
    flower.classList.add('falling-flower');

    const size = Math.random() * 20 + 20;
    flower.style.width = `${size}px`;
    flower.style.height = `${size}px`;
    flower.style.left = `${Math.random() * 100}vw`;
    flower.style.animationDuration = `${Math.random() * 8 + 5}s`;
    flower.style.animationDelay = `-${Math.random() * 0.5}s`;
    flower.style.setProperty('--rotation', `${Math.random() * 360}deg`);

    flowerRainContainer.appendChild(flower);
    flower.addEventListener('animationend', () => flower.remove());
  }

  const flowerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!flowersActive) {
          flowersActive = true;
          flowerRainContainer.classList.add('active');
          flowerInterval = setInterval(createFallingFlower, 1000);
        }
      } else if (flowersActive) {
        flowersActive = false;
        clearInterval(flowerInterval);
        flowerRainContainer.classList.remove('active');
        setTimeout(() => flowerRainContainer.innerHTML = '', 1000);
      }
    });
  }, { threshold: 0.5 });

  flowerObserver.observe(ourStorySection);
}