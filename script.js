let clickCounter = parseInt(localStorage.getItem('clickCounter')) || 0;
let charge = parseInt(localStorage.getItem('charge')) || 300;
const maxCharge = 300;
const rechargeRate = 1;

const clickCounterDisplay = document.getElementById('click-counter');
const chargeCounterDisplay = document.getElementById('charge-counter');
const jarProgress = document.getElementById('jar-progress');
const progressBar = document.getElementById('progress-bar');
const coin = document.getElementById('coin');
const coinSound = document.getElementById('coin-sound');

function updateClickCounter() {
    clickCounterDisplay.textContent = clickCounter;
    localStorage.setItem('clickCounter', clickCounter);
}

function updateChargeCounter() {
    chargeCounterDisplay.textContent = charge;
}

function updateJarProgress() {
    const level = (clickCounter % 100) / 100;
    jarProgress.style.width = `${level * 100}%`;
}

function updateProgressBar() {
    progressBar.style.width = `${(charge / maxCharge) * 100}%`;
    localStorage.setItem('charge', charge);
}

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    document.body.appendChild(particle);
    setTimeout(() => {
        document.body.removeChild(particle);
    }, 1000);
}

coin.addEventListener('click', (e) => {
    if (charge > 0) {
        clickCounter++;
        charge--;
        updateClickCounter();
        updateChargeCounter();
        updateJarProgress();
        updateProgressBar();
        coinSound.currentTime = 0;
        coinSound.play();
        const rect = coin.getBoundingClientRect();
        createParticle(e.clientX, e.clientY);

        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;

        coin.style.transform = `rotateX(${offsetY / 10}deg) rotateY(${-offsetX / 10}deg) scale(0.95)`;

        setTimeout(() => {
            coin.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        }, 100);
    }
});

setInterval(() => {
    if (charge < maxCharge) {
        charge += rechargeRate;
        updateChargeCounter();
        updateProgressBar();
    }
}, 1000);

updateClickCounter();
updateChargeCounter();
updateJarProgress();
updateProgressBar();
