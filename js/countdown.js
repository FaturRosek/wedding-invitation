const CountdownTimer = {
    targetTime: null,
    intervalId: null,
    init() {
        const isoString = (typeof WEDDING_CONFIG !== 'undefined' && WEDDING_CONFIG.event && WEDDING_CONFIG.event.countdownTargetISO)
            ? WEDDING_CONFIG.event.countdownTargetISO
            : "2027-04-08T07:00:00+07:00";
        this.targetTime = new Date(isoString).getTime();
        if (isNaN(this.targetTime)) {
            this.targetTime = Date.UTC(2027, 3, 8, 0, 0, 0);
        }
        this.update();
        this.intervalId = setInterval(() => this.update(), 1000);
    },
    update() {
        const now = new Date().getTime();
        const distance = this.targetTime - now;
        const daysEl = document.getElementById('cd-days');
        const hoursEl = document.getElementById('cd-hours');
        const minutesEl = document.getElementById('cd-minutes');
        const secondsEl = document.getElementById('cd-seconds');
        const messageEl = document.getElementById('cd-message');
        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
            return;
        }
        if (distance <= 0) {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            if (messageEl) {
                messageEl.textContent = "Alhamdulillah, Hari Bahagia Telah Tiba!";
                messageEl.classList.remove('hidden');
            }
            return;
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        daysEl.textContent = days < 10 ? `0${days}` : days;
        hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
        minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
        secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
    }
};
document.addEventListener('DOMContentLoaded', () => {
    CountdownTimer.init();
});
