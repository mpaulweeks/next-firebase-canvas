async function startClock() {
  const localStart = new Date();
  const resp = await fetch("http://worldtimeapi.org/api/ip");
  const data = await resp.json();
  const { utc_datetime } = data;
  const trueStart = new Date(utc_datetime);
  const offset = trueStart.getTime() - localStart.getTime();

  const interval = 60 * 1000;
  const divPrompt = document.getElementById('prompt');
  const divTimer = document.getElementById('timer');

  function loop() {
    const now = new Date().getTime() + offset;
    const rep = Math.floor(now / interval);
    const progress = Math.floor(now % interval);

    const prompt = allPrompts[rep % allPrompts.length];
    divPrompt.innerHTML = prompt;

    const remaining = Math.floor((interval - progress) / 1000);
    divTimer.innerHTML = remaining + 1;
  }
  loop();
  setInterval(loop, 400);
}
startClock();

const allPrompts = [
  'Dog',
  'Cat',
  'Frog',
]
