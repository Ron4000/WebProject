// ════════════════════════════════════════════
//  Connection Status Bar — Terminal Simulation
// ════════════════════════════════════════════

const statusText = document.getElementById('statusText');
const statusDot  = document.querySelector('.status-dot');

const sequence = [
  { msg: 'Initializing...',                   delay: 0    },
  { msg: 'Establishing secure channel...',    delay: 1200 },
  { msg: 'Locating node: Sorsogon...',        delay: 2600 },
  { msg: 'Verifying identity: H.FULGAR...',   delay: 4100 },
  { msg: 'Syncing with CCDI network...',      delay: 5600 },
  { msg: '▌',                                 delay: 7000 },
  { msg: 'STATUS: ONLINE',                    delay: 7600, online: true },
];

const typeMessage = (text, onDone) => {
  statusText.textContent = '';
  let i = 0;

  const type = () => {
    if (i < text.length) {
      statusText.textContent += text[i++];
      setTimeout(type, 38);
    } else {
      onDone && onDone();
    }
  };

  type();
};

const runSequence = (index = 0) => {
  if (index >= sequence.length) return;

  const { msg, delay, online } = sequence[index];

  setTimeout(() => {
    typeMessage(msg, () => {
      if (online) {
        statusDot.classList.add('online');
        statusText.style.color = '#22c55e';
      }
    });
    runSequence(index + 1);
  }, delay);
};

document.addEventListener('DOMContentLoaded', runSequence);