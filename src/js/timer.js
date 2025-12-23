(function () {
  const counters = document.querySelectorAll("[data-timer-value]");
  if (!counters.length) return;

  counters.forEach((counter) => {
    const targetAttr = counter.getAttribute("data-timer-to");
    if (!targetAttr) return;

    const targetDate = new Date(targetAttr);
    if (isNaN(targetDate)) return;

    const daysEl = counter.querySelector("[data-timer-days]");
    const hoursEl = counter.querySelector("[data-timer-hours]");
    const minutesEl = counter.querySelector("[data-timer-minutes]");

    if (!daysEl || !hoursEl || !minutesEl) return;

    const update = () => {
      const diff = targetDate - new Date();

      if (diff <= 0) {
        daysEl.textContent = "0";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        clearInterval(interval);
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);

      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);

      daysEl.textContent = days;
      hoursEl.textContent = String(hours).padStart(2, "0");
      minutesEl.textContent = String(minutes).padStart(2, "0");
    };

    update();
    const interval = setInterval(update, 60_000);
  });
})();
