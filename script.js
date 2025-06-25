// Three.js 3D Scene
let scene, camera, renderer, particles, roses = [];
let church, clouds = [],
    birds = [];
let sun; // Declare sun variable
let musicPlaying = false;
const bgMusic = document.getElementById('bgMusic');

// Set music properties
bgMusic.volume = 0.5; // Set volume to 50%
bgMusic.loop = true;

function init() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Light blue sky background

    // Camera
    // Initial camera setup - will be adjusted by handleResize
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 50, 400); // Base position

    // Renderer
    renderer = new THREE.WebGLRenderer({
        alpha: false,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Soft ambient light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6); // Direct light for shadows/definition
    directionalLight.position.set(50, 200, 100);
    scene.add(directionalLight);

    // Create 3D Church
    create3DChurch();

    // Create moving clouds
    createClouds(10); // Create 10 clouds

    // Create birds
    createBirds(5); // Create 5 birds

    // Create romantic particles (rose petals) - keeping from previous version
    createRoseParticles();

    // Create floating 3D roses - keeping from previous version
    createFloatingRoses();

    // Create 3D Sun
    createSun();

    // Call handleResize initially to set camera correctly based on current window size
    handleResize();

    animate();
}

function create3DChurch() {
    church = new THREE.Group();

    const bodyMaterial = new THREE.MeshPhongMaterial({
        color: 0xF5DEB3
    }); // Tan color
    const roofMaterial = new THREE.MeshPhongMaterial({
        color: 0x689F38
    }); // Green roof
    const doorMaterial = new THREE.MeshPhongMaterial({
        color: 0xA0522D
    }); // Brown door
    const windowMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.8
    }); // White window
    const towerMaterial = new THREE.MeshPhongMaterial({
        color: 0xF5DEB3
    }); // Tan for tower base
    const bellMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFD700
    }); // Gold bell
    const crossMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFD700
    }); // Gold color for the cross (changed from green)

    // Main Body (wider)
    const mainBody = new THREE.Mesh(new THREE.BoxGeometry(200, 100, 80), bodyMaterial);
    mainBody.position.set(0, 50, 0);
    church.add(mainBody);

    // Main Roof (triangular prism on top)
    const mainRoofShape = new THREE.Shape();
    mainRoofShape.moveTo(0, 50);
    mainRoofShape.lineTo(110, 0); // Wider base
    mainRoofShape.lineTo(-110, 0); // Wider base
    mainRoofShape.lineTo(0, 50);

    const mainRoofGeometry = new THREE.ExtrudeGeometry(mainRoofShape, {
        steps: 1,
        depth: 85, // Slightly wider than body depth
        bevelEnabled: false
    });
    mainRoofGeometry.rotateX(Math.PI / 2); // Rotate to be flat
    mainRoofGeometry.rotateZ(Math.PI / 2); // Rotate to align
    const mainRoof = new THREE.Mesh(mainRoofGeometry, roofMaterial);
    mainRoof.position.set(0, 100, 0); // Position on top of main body
    church.add(mainRoof);

    // Side Wings (wider and slightly shorter than main body)
    const sideWingWidth = 120;
    const sideWingHeight = 70;
    const sideWingDepth = 70;

    const leftWing = new THREE.Mesh(new THREE.BoxGeometry(sideWingWidth, sideWingHeight, sideWingDepth), bodyMaterial);
    leftWing.position.set(-150, 35, 0); // Position to the left of main body
    church.add(leftWing);

    const rightWing = new THREE.Mesh(new THREE.BoxGeometry(sideWingWidth, sideWingHeight, sideWingDepth), bodyMaterial);
    rightWing.position.set(150, 35, 0); // Position to the right of main body
    church.add(rightWing);

    // Side Roofs
    const sideRoofShape = new THREE.Shape();
    sideRoofShape.moveTo(0, 35);
    sideRoofShape.lineTo(65, 0);
    sideRoofShape.lineTo(-65, 0);
    sideRoofShape.lineTo(0, 35);

    const sideRoofGeometry = new THREE.ExtrudeGeometry(sideRoofShape, {
        steps: 1,
        depth: 75,
        bevelEnabled: false
    });
    sideRoofGeometry.rotateX(Math.PI / 2);
    sideRoofGeometry.rotateZ(Math.PI / 2);

    const leftRoof = new THREE.Mesh(sideRoofGeometry, roofMaterial);
    leftRoof.position.set(-150, 70, 0); // Position on top of left wing
    church.add(leftRoof);

    const rightRoof = new THREE.Mesh(sideRoofGeometry, roofMaterial);
    rightRoof.position.set(150, 70, 0); // Position on top of right wing
    church.add(rightRoof);


    // Tower Base (on top of main body)
    const towerBase = new THREE.Mesh(new THREE.BoxGeometry(60, 80, 60), towerMaterial);
    towerBase.position.set(0, 140, 0); // Position above main body
    church.add(towerBase);

    // Tower Roof (pyramid shape)
    const towerRoof = new THREE.Mesh(new THREE.ConeGeometry(50, 60, 4), roofMaterial); // 4 for pyramid shape
    towerRoof.rotation.y = Math.PI / 4; // Rotate to align with square base
    towerRoof.position.set(0, 200, 0); // Position on top of tower base
    church.add(towerRoof);

    // Cross on Tower (Increased size and changed color)
    const crossBar1 = new THREE.Mesh(new THREE.BoxGeometry(12, 48, 6), crossMaterial); // Slightly larger
    const crossBar2 = new THREE.Mesh(new THREE.BoxGeometry(48, 12, 6), crossMaterial); // Slightly larger
    crossBar2.rotation.z = Math.PI / 2; // Horizontal bar
    const crossGroup = new THREE.Group();
    crossGroup.add(crossBar1);
    crossGroup.add(crossBar2);
    crossGroup.position.set(0, 240, 0); // Position above tower roof
    church.add(crossGroup);

    // Bell (inside tower base arch)
    const bell = new THREE.Mesh(new THREE.SphereGeometry(20, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), bellMaterial); // Half sphere for bell
    bell.rotation.x = Math.PI; // Flip it to open downwards
    bell.position.set(0, 130, 0); // Inside tower base
    church.add(bell);

    // Door (arched)
    const doorShape = new THREE.Shape();
    doorShape.moveTo(-30, 0);
    doorShape.lineTo(30, 0);
    doorShape.lineTo(30, 70);
    doorShape.absarc(0, 70, 30, 0, Math.PI, true); // Arc for the top

    doorShape.lineTo(-30, 70);

    const doorGeometry = new THREE.ExtrudeGeometry(doorShape, {
        steps: 1,
        depth: 5,
        bevelEnabled: false
    });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 10, 41); // Position at front of main body, slightly forward
    church.add(door);

    // Round Window (on main facade)
    const roundWindow = new THREE.Mesh(new THREE.CylinderGeometry(20, 20, 5, 32), windowMaterial);
    roundWindow.rotation.x = Math.PI / 2;
    roundWindow.position.set(0, 80, 41); // Position on main facade
    church.add(roundWindow);

    // Square Windows (on side wings)
    const squareWindowGeometry = new THREE.BoxGeometry(30, 30, 5);
    const leftWindow = new THREE.Mesh(squareWindowGeometry, windowMaterial);
    leftWindow.position.set(-150, 40, 36); // Front of left wing
    church.add(leftWindow);
    const rightWindow = new THREE.Mesh(squareWindowGeometry, windowMaterial);
    rightWindow.position.set(150, 40, 36); // Front of right wing
    church.add(rightWindow);

    // Ground Plane
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), new THREE.MeshPhongMaterial({
        color: 0x7CB342
    })); // Green ground
    ground.rotation.x = -Math.PI / 2; // Rotate to be flat
    ground.position.y = 0;
    scene.add(ground);

    scene.add(church);
}

function createClouds(count) {
    const cloudMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.9
    });
    for (let i = 0; i < count; i++) {
        const cloudGroup = new THREE.Group();

        // Create multiple spheres of varying sizes and positions to form a cloud shape
        const numCloudParts = 5 + Math.floor(Math.random() * 5); // 5 to 9 spheres per cloud
        for (let j = 0; j < numCloudParts; j++) {
            const radius = 10 + Math.random() * 20; // Sphere radius between 10 and 30
            const sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 16, 16), cloudMaterial);
            sphere.position.set(
                (Math.random() - 0.5) * 50, // Increased horizontal spread for wider clouds
                (Math.random() - 0.5) * 30, // Spread spheres vertically
                (Math.random() - 0.5) * 40 // Spread spheres in depth
            );
            cloudGroup.add(sphere);
        }


        cloudGroup.position.set(
            Math.random() * 800 - 400, // X position
            Math.random() * 100 + 200, // Y position (Adjusted to be between 200 and 300 for better visibility in sky)
            Math.random() * 200 - 100 // Z position
        );
        clouds.push(cloudGroup);
        scene.add(cloudGroup);
    }
}

function createBirds(count) {
    // More bird-like shape: two arcs for wings
    const birdShape = new THREE.Shape();
    birdShape.moveTo(0, 0);
    birdShape.quadraticCurveTo(5, 5, 10, 0); // Right wing up then down
    birdShape.quadraticCurveTo(15, -5, 20, 0); // Right wing down then up

    birdShape.moveTo(0, 0); // Move back to origin for left wing
    birdShape.quadraticCurveTo(-5, 5, -10, 0); // Left wing up then down
    birdShape.quadraticCurveTo(-15, -5, -20, 0); // Left wing down then up


    const birdGeometry = new THREE.ExtrudeGeometry(birdShape, {
        steps: 1,
        depth: 1, // Thinner bird
        bevelEnabled: false
    });
    const birdMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000
    }); // Changed to black for better visibility

    for (let i = 0; i < count; i++) {
        const bird = new THREE.Mesh(birdGeometry, birdMaterial);
        bird.position.set(
            Math.random() * 800 - 400, // X
            Math.random() * 100 + 200, // Y (sky level)
            Math.random() * 100 - 50 // Z
        );
        bird.scale.set(1.5, 1.5, 1.5); // Increased scale for more visibility
        birds.push(bird);
        scene.add(bird);
    }
}


function createRoseParticles() {
    const geometry = new THREE.BufferGeometry();
    const particleCount = 300;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 2000;
        positions[i3 + 1] = (Math.random() - 0.5) * 2000;
        positions[i3 + 2] = (Math.random() - 0.5) * 1000;

        // Pink rose petal colors
        colors[i3] = 0.9 + Math.random() * 0.1; // R (pink/red)
        colors[i3 + 1] = 0.3 + Math.random() * 0.3; // G (less green)
        colors[i3 + 2] = 0.5 + Math.random() * 0.3; // B (less blue)

        sizes[i] = Math.random() * 3 + 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
        size: 4,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function createFloatingRoses() {
    for (let i = 0; i < 5; i++) {
        const roseGeometry = new THREE.SphereGeometry(8, 8, 6);
        const roseMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(0.9, 0.7, 0.6),
            transparent: true,
            opacity: 0.8
        });

        const rose = new THREE.Mesh(roseGeometry, roseMaterial);
        rose.position.set(
            (Math.random() - 0.5) * 1000,
            (Math.random() - 0.5) * 1000,
            (Math.random() - 0.5) * 500
        );

        roses.push(rose);
        scene.add(rose);
    }
}

function createSun() {
    const sunGeometry = new THREE.SphereGeometry(50, 32, 32); // Size of the sun
    const sunMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFA500, // Initial orange color
        emissive: 0xFF8C00, // Darker orange for emissive glow
        emissiveIntensity: 0.8 // Initial emissive intensity
    });
    sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(-400, 300, -200); // Position it in the sky (x, y, z)
    scene.add(sun);
}

function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.0001; // Global time variable for animation

    // Rotate particles gently
    if (particles) {
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;

        // Floating motion
        const positions = particles.geometry.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
            positions[i] += Math.sin(Date.now() * 0.001 + positions[i] * 0.01) * 0.1;
        }
        particles.geometry.attributes.position.needsUpdate = true;
    }

    // Animate floating roses
    roses.forEach((rose, index) => {
        rose.rotation.x += 0.01;
        rose.rotation.y += 0.01;
        rose.position.y += Math.sin(Date.now() * 0.001 + index) * 0.2;
    });

    // Animate clouds
    clouds.forEach(cloud => {
        cloud.position.x += 0.5; // Move clouds to the right
        if (cloud.position.x > 500) { // If off-screen to the right
            cloud.position.x = -500; // Reset to left
        }
    });

    // Animate birds (simple flapping and flying)
    birds.forEach((bird, index) => {
        bird.position.x += 1 + Math.sin(Date.now() * 0.005 + index) * 0.2; // Move right with slight sine wave
        bird.position.y = 200 + Math.sin(Date.now() * 0.005 + index * 0.5) * 20; // Flapping motion
        if (bird.position.x > 500) {
            bird.position.x = -500;
        }
    });

    // Rotate the sun and add sunrise effect
    if (sun) {
        sun.rotation.y += 0.002; // Rotate around its Y-axis
        sun.rotation.x += 0.001; // Rotate around its X-axis

        // Pulsating emissive intensity for "shining" effect
        sun.material.emissiveIntensity = 0.8 + Math.sin(time * 5) * 0.2; // Pulsates between 0.6 and 1.0

        // Subtle color shift for sunrise effect
        const r = 1.0; // Red component (full)
        const g = 0.65 + Math.sin(time * 2) * 0.1; // Green component shifts slightly (from 0.55 to 0.75)
        const b = 0.0; // Blue component (none, for warm colors)
        sun.material.color.setRGB(r, g, b);
    }


    renderer.render(scene, camera);
}

// Handle window resize and camera adjustments for responsiveness
function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;

    // Adjust camera Z position or FOV based on aspect ratio to prevent church overflow
    // A lower aspect ratio (taller, narrower screen like mobile in portrait) means we need to pull back
    if (camera.aspect < 1) { // Portrait mode on mobile
        camera.position.z = 550; // Pull camera further back
        camera.fov = 80; // Slightly wider FOV
    } else { // Landscape or desktop
        camera.position.z = 400; // Original position
        camera.fov = 75; // Original FOV
    }

    // Optional: Slightly scale down the church for very narrow screens if needed,
    // though camera adjustment is usually sufficient.
    // if (window.innerWidth < 480 && church) {
    //     church.scale.set(0.8, 0.8, 0.8);
    // } else if (church) {
    //     church.scale.set(1, 1, 1);
    // }

    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Listen for window resize events
window.addEventListener('resize', handleResize);

// Parallax effect on scroll - keeping this but it will mainly affect 3D particles if any
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (particles) {
        particles.rotation.y = scrolled * 0.0002;
    }
    // You could also add camera movement based on scroll if desired
    // camera.position.y = 50 + scrolled * 0.1;
});


// Main functions (unchanged)
function openInvitation() {
    document.getElementById('invitationCard').classList.add('open');
    document.getElementById('heavenGate').style.opacity = '0';
    document.getElementById('heavenGate').style.pointerEvents = 'none';
}

function closeInvitation() {
    document.getElementById('invitationCard').classList.remove('open');
    document.getElementById('heavenGate').style.opacity = '1';
    document.getElementById('heavenGate').style.pointerEvents = 'auto';
    roses.forEach(rose => {
        rose.material.emissive = new THREE.Color(0x000000);
    });
}

function handleRSVP() {
    const messageBox = document.createElement('div');
    messageBox.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 1002;
        text-align: center;
        font-family: 'Playfair Display', serif;
        color: #2c1810;
        max-width: 300px;
        line-height: 1.5;
    `;
    messageBox.innerHTML = `
        <p style="font-size: 1.2em; margin-bottom: 15px;">Thank you for your RSVP! 💕</p>
        <p style="margin-bottom: 10px;">Please contact us:</p>
        <p style="margin-bottom: 5px;">📧 febin.christin.wedding@gmail.com</p>
        <p>📱 +1 (555) 123-4567</p>
        <p style="margin-top: 20px; font-style: italic;">We can't wait to celebrate with you on our special day!</p>
        <button onclick="this.parentNode.remove()" style="
            background: linear-gradient(45deg, #ff6b9d, #c44569);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            margin-top: 20px;
            font-family: 'Playfair Display', serif;
            font-size: 1em;
            transition: all 0.3s ease;
        ">Close</button>
    `;
    document.body.appendChild(messageBox);
}

function toggleMusic() {
    const btn = document.getElementById('musicBtn');

    if (musicPlaying) {
        btn.innerHTML = '🎵';
        btn.title = 'Play Music';
        bgMusic.pause();
        musicPlaying = false;
    } else {
        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                    btn.innerHTML = '🔇';
                    btn.title = 'Mute Music';
                    musicPlaying = true;
                })
                .catch(error => {
                    console.log("Autoplay blocked:", error);
                    btn.innerHTML = '▶️';
                    btn.title = 'Click to play music';
                    document.addEventListener('click', function enableAudio() {
                        if (!musicPlaying) {
                            toggleMusic();
                        }
                        document.removeEventListener('click', enableAudio);
                    });
                });
        }
    }
}

// Initialize everything
window.addEventListener('load', () => {
    const heart = document.querySelector('.pumping-heart');
    const loadingText = document.querySelector('.loading-text');

    setTimeout(() => {
        heart.style.animation = 'none';
        heart.style.transform = 'rotate(-45deg) scale(1.5)';
        heart.style.opacity = '0';

        setTimeout(() => {
            document.getElementById('loading').style.opacity = '0';
            setTimeout(() => { // Changed from 1000ms to 2000ms to match CSS transition
                document.getElementById('loading').style.display = 'none';

                const playPromise = bgMusic.play();

                if (playPromise !== undefined) {
                    playPromise.then(() => {
                            musicPlaying = true;
                            document.getElementById('musicBtn').innerHTML = '🔇';
                            document.getElementById('musicBtn').title = 'Mute Music';
                        })
                       .catch(error => {
    console.log("Autoplay blocked:", error);
    document.getElementById('musicBtn').innerHTML = '▶️';
    document.getElementById('musicBtn').title = 'Click to play music';

    // Add a temporary message to inform the user
    const musicPrompt = document.createElement('div');
    musicPrompt.id = 'music-prompt';
    musicPrompt.style.cssText = `
        position: fixed;
        top: 80px; /* Below the music button */
        right: 20px;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 10px 15px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1003;
        font-family: 'Playfair Display', serif;
        color: #2c1810;
        font-size: 0.9em;
        text-align: center;
        opacity: 0;
        animation: fadeInOutMusicPrompt 5s forwards; /* Fade in and out */
    `;
    musicPrompt.innerHTML = '🎵 Click to enable music 🎵';
    document.body.appendChild(musicPrompt);

    // Define the animation in style.css or dynamically
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
        @keyframes fadeInOutMusicPrompt {
            0% { opacity: 0; transform: translateY(-10px); }
            10% { opacity: 1; transform: translateY(0); }
            90% { opacity: 1; transform: translateY(0); }\r
            100% { opacity: 0; transform: translateY(-10px); }\r
        }\r
    `, styleSheet.cssRules.length);


    document.addEventListener('click', function enableAudioOnce() {
        if (!musicPlaying) {
            toggleMusic();
            // Remove the prompt once music is enabled\r
            const existingPrompt = document.getElementById('music-prompt');
            if (existingPrompt) {
                existingPrompt.remove();
            }
        }
        document.removeEventListener('click', enableAudioOnce); // Remove self\r
    }, { once: true }); // Use { once: true } for a cleaner removal of the listener\r
});
                }
            }, 2000); // This delay now matches the 2s opacity transition in style.css\r
        }, 500);
    }, 4000);

    init();
    setInterval(createFloatingHeart, 2000); // Assuming createFloatingHeart exists or is a placeholder\r
});