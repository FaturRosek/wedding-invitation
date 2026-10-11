const GuestManager = {
    guestName: "Tamu Undangan",
    init() {
        this.extractGuestName();
        this.renderGuestName();
    },
    extractGuestName() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const rawParam = urlParams.get('to') || urlParams.get('guest') || urlParams.get('p');
            if (rawParam && rawParam.trim().length > 0) {
                let cleaned = rawParam.trim();
                if (cleaned.length > 60) {
                    cleaned = cleaned.substring(0, 60);
                }
                this.guestName = cleaned;
            } else {
                this.guestName = "Tamu Undangan";
            }
        } catch (e) {
            console.warn("Gagal membaca parameter tamu:", e);
            this.guestName = "Tamu Undangan";
        }
    },
    renderGuestName() {
        const guestElements = document.querySelectorAll('[data-guest-name]');
        guestElements.forEach(el => {
            el.textContent = this.guestName;
        });
        const rsvpNameInput = document.getElementById('rsvp-name');
        if (rsvpNameInput && this.guestName !== "Tamu Undangan") {
            rsvpNameInput.value = this.guestName;
        }
        const wishNameInput = document.getElementById('wish-name');
        if (wishNameInput && this.guestName !== "Tamu Undangan") {
            wishNameInput.value = this.guestName;
        }
    },
    getGuestName() {
        return this.guestName;
    }
};
document.addEventListener('DOMContentLoaded', () => {
    GuestManager.init();
});
