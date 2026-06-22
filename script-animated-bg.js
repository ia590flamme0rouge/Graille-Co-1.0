/* ============================================
   ✨ SYSTÈME DE PARTICULES FLOTTANTES NÉON
   ============================================ */

function createParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;

  const colors = ['gold', 'orange', 'pink'];
  const particleCount = window.innerWidth > 768 ? 35 : 15;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const colorClass = colors[Math.floor(Math.random() * colors.length)];
    particle.className = `particle ${colorClass}`;

    // Position aléatoire
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    // Mouvement aléatoire
    const tx = (Math.random() - 0.5) * 200;
    const ty = Math.random() * -300 - 100;

    // Timing
    const duration = 8 + Math.random() * 10;
    const delay = Math.random() * 2;
    const size = 3 + Math.random() * 5;

    // Appliquer les styles
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');
    particle.style.setProperty('--duration', duration + 's');
    particle.style.animationDelay = delay + 's';

    container.appendChild(particle);

    // Supprimer après animation
    setTimeout(() => {
      particle.remove();
    }, (duration + delay) * 1000);
  }
}

// Lancer les particules au chargement
window.addEventListener('load', () => {
  createParticles();
  // Régénérer toutes les 5 secondes
  setInterval(createParticles, 5000);
});

// ============================================
// PARALLAX SIMPLE AU MOUSEMOVE
// ============================================
document.addEventListener('mousemove', (e) => {
  const bg = document.querySelector('.animated-bg');
  if (!bg) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  
  bg.style.transform = `translate(${x}px, ${y}px)`;
});

document.addEventListener('mouseleave', () => {
  const bg = document.querySelector('.animated-bg');
  if (bg) {
    bg.style.transform = 'translate(0, 0)';
  }
});
