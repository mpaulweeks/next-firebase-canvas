
/* html

  <h1>
    Draw a <span id="prompt">???</span> in the next <span id="timer">???</span> seconds!
  </h1>

*/

const allPrompts = [
  'Dog',
  'Cat',
  'Frog',
];

async function startClock() {
  const localStart = new Date();
  const resp = await fetch("https://worldtimeapi.org/api/ip");
  const data = await resp.json();
  const { utc_datetime } = data;
  const trueStart = new Date(utc_datetime);
  const offset = trueStart.getTime() - localStart.getTime();

  const interval = 60 * 1000;
  const elmPrompt = document.getElementById('prompt');
  const elmTimer = document.getElementById('timer');

  function loop() {
    const now = new Date().getTime() + offset;
    const rep = Math.floor(now / interval);
    const progress = Math.floor(now % interval);

    const prompt = allPrompts[rep % allPrompts.length];
    elmPrompt.innerHTML = prompt;

    const remaining = Math.floor((interval - progress) / 1000);
    elmTimer.innerHTML = remaining + 1;
  }
  loop();
  setInterval(loop, 400);
}
startClock();
