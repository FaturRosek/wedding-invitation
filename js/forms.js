const WeddingForms = {
    wishes: [],
    displayedWishesCount: 4,
    init() {
        this.initRSVP();
        this.initWishes();
        this.initGiftCopy();
    },
    initRSVP() {
        const rsvpForm = document.getElementById('rsvp-form');
        if (!rsvpForm) return;
        this.checkExistingRSVP();
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRSVPSubmit(rsvpForm);
        });
    },
    checkExistingRSVP() {
        try {
            const savedRSVP = localStorage.getItem(WEDDING_CONFIG.rsvp.storageKey);
            if (savedRSVP) {
                const data = JSON.parse(savedRSVP);
                const statusCard = document.getElementById('rsvp-existing-status');
                const statusDetails = document.getElementById('rsvp-existing-details');
                if (statusCard && statusDetails) {
                    statusDetails.textContent = `Tercatat untuk ${data.name}: ${data.attendance.toUpperCase()} (${data.guests} Tamu)`;
                    statusCard.classList.remove('hidden');
                }
            }
        } catch (e) {
            console.warn("Error reading local RSVP:", e);
        }
    },
    async handleRSVPSubmit(form) {
        const errorEl = document.getElementById('rsvp-error');
        const successEl = document.getElementById('rsvp-success');
        const submitBtn = form.querySelector('button[type="submit"]');
        if (errorEl) errorEl.classList.add('hidden');
        if (successEl) successEl.classList.add('hidden');
        const name = form.elements['name'] ? form.elements['name'].value.trim() : '';
        const attendance = form.elements['attendance'] ? form.elements['attendance'].value : '';
        const guests = form.elements['guests'] ? parseInt(form.elements['guests'].value, 10) : 1;
        const notes = form.elements['notes'] ? form.elements['notes'].value.trim() : '';
        if (!name) {
            this.showFormError(errorEl, "Silakan isi nama Anda.");
            return;
        }
        if (!attendance) {
            this.showFormError(errorEl, "Silakan pilih konfirmasi kehadiran Anda.");
            return;
        }
        if (attendance !== 'tidak_hadir' && (isNaN(guests) || guests < 1 || guests > WEDDING_CONFIG.rsvp.maxGuests)) {
            this.showFormError(errorEl, `Jumlah tamu harus antara 1 sampai ${WEDDING_CONFIG.rsvp.maxGuests} orang.`);
            return;
        }
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            submitBtn.textContent = "Mengirim Konfirmasi...";
        }
        const formData = new FormData(form);
        const rsvpPayload = {
            name,
            attendance,
            guests: attendance === 'tidak_hadir' ? 0 : guests,
            notes,
            timestamp: new Date().toISOString()
        };
        let isDelivered = false;
        try {
            const response = await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            });
            if (response.ok) {
                isDelivered = true;
            }
        } catch (netErr) {
            console.info("Pengiriman Netlify Forms offline/lokal:", netErr);
        }
        try {
            localStorage.setItem(WEDDING_CONFIG.rsvp.storageKey, JSON.stringify(rsvpPayload));
            isDelivered = true;
        } catch (e) {
            console.warn("Storage error:", e);
        }
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.textContent = "Kirim Konfirmasi Kehadiran";
        }
        if (isDelivered) {
            form.reset();
            if (successEl) {
                successEl.textContent = `Terima kasih ${name}, konfirmasi kehadiran Anda berhasil tersimpan!`;
                successEl.classList.remove('hidden');
            }
            this.checkExistingRSVP();
        } else {
            this.showFormError(errorEl, "Terjadi kendala saat mengirim. Silakan periksa koneksi Anda dan coba lagi.");
        }
    },
    showFormError(el, msg) {
        if (!el) return;
        el.textContent = msg;
        el.classList.remove('hidden');
    },
    initWishes() {
        const wishForm = document.getElementById('wish-form');
        const charCounter = document.getElementById('wish-char-count');
        const messageTextarea = document.getElementById('wish-message');
        this.loadWishes();
        this.renderWishesList();
        if (messageTextarea && charCounter) {
            messageTextarea.addEventListener('input', () => {
                const len = messageTextarea.value.length;
                charCounter.textContent = `${len} / ${WEDDING_CONFIG.wishes.maxChars}`;
                if (len > WEDDING_CONFIG.wishes.maxChars) {
                    charCounter.style.color = '#c0392b';
                } else {
                    charCounter.style.color = '';
                }
            });
        }
        if (wishForm) {
            wishForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleWishSubmit(wishForm);
            });
        }
        const loadMoreBtn = document.getElementById('wishes-load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.displayedWishesCount += 4;
                this.renderWishesList();
            });
        }
    },
    loadWishes() {
        let savedWishes = [];
        try {
            const raw = localStorage.getItem(WEDDING_CONFIG.wishes.storageKey);
            if (raw) {
                savedWishes = JSON.parse(raw);
            }
        } catch (e) {
            console.warn("Gagal membaca saved wishes:", e);
        }
        const initial = (WEDDING_CONFIG && WEDDING_CONFIG.wishes && WEDDING_CONFIG.wishes.initialWishes)
            ? WEDDING_CONFIG.wishes.initialWishes
            : [];
        this.wishes = [...savedWishes, ...initial];
    },
    renderWishesList() {
        const container = document.getElementById('wishes-list');
        const loadMoreBtn = document.getElementById('wishes-load-more-btn');
        const countBadge = document.getElementById('wishes-total-count');
        if (!container) return;
        if (countBadge) {
            countBadge.textContent = `${this.wishes.length} Doa & Harapan`;
        }
        container.innerHTML = '';
        if (this.wishes.length === 0) {
            const emptyEl = document.createElement('div');
            emptyEl.className = 'wishes-empty-state';
            emptyEl.textContent = 'Belum ada ucapan. Jadilah yang pertama memberikan doa restu!';
            container.appendChild(emptyEl);
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            return;
        }
        const slice = this.wishes.slice(0, this.displayedWishesCount);
        slice.forEach(wish => {
            const card = document.createElement('div');
            card.className = 'wish-item-card';
            const header = document.createElement('div');
            header.className = 'wish-card-header';
            const nameWrapper = document.createElement('div');
            nameWrapper.className = 'wish-sender-info';
            const avatar = document.createElement('div');
            avatar.className = 'wish-avatar';
            avatar.textContent = (wish.name && wish.name.trim().length > 0) ? wish.name.trim().charAt(0).toUpperCase() : 'T';
            const meta = document.createElement('div');
            const nameEl = document.createElement('h4');
            nameEl.className = 'wish-sender-name';
            nameEl.textContent = wish.name; 
            meta.appendChild(nameEl);
            if (wish.relation) {
                const relationEl = document.createElement('span');
                relationEl.className = 'wish-sender-relation';
                relationEl.textContent = wish.relation;
                meta.appendChild(relationEl);
            }
            nameWrapper.appendChild(avatar);
            nameWrapper.appendChild(meta);
            const timeEl = document.createElement('span');
            timeEl.className = 'wish-time';
            timeEl.textContent = wish.time || 'Baru saja';
            header.appendChild(nameWrapper);
            header.appendChild(timeEl);
            const body = document.createElement('p');
            body.className = 'wish-message-text';
            body.textContent = wish.message; 
            card.appendChild(header);
            card.appendChild(body);
            container.appendChild(card);
        });
        if (loadMoreBtn) {
            if (this.displayedWishesCount >= this.wishes.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-flex';
            }
        }
    },
    async handleWishSubmit(form) {
        const errorEl = document.getElementById('wish-error');
        const successEl = document.getElementById('wish-success');
        const submitBtn = form.querySelector('button[type="submit"]');
        if (errorEl) errorEl.classList.add('hidden');
        if (successEl) successEl.classList.add('hidden');
        const name = form.elements['name'] ? form.elements['name'].value.trim() : '';
        const relation = form.elements['relation'] ? form.elements['relation'].value.trim() : 'Sahabat';
        const message = form.elements['message'] ? form.elements['message'].value.trim() : '';
        if (!name) {
            this.showFormError(errorEl, "Silakan isi nama Anda.");
            return;
        }
        if (!message) {
            this.showFormError(errorEl, "Silakan tuliskan ucapan atau doa restu Anda.");
            return;
        }
        if (message.length > WEDDING_CONFIG.wishes.maxChars) {
            this.showFormError(errorEl, `Pesan tidak boleh melebihi ${WEDDING_CONFIG.wishes.maxChars} karakter.`);
            return;
        }
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            submitBtn.textContent = "Mengirim Doa...";
        }
        const newWish = {
            name,
            relation,
            message,
            time: "Baru saja",
            timestamp: new Date().toISOString()
        };
        const formData = new FormData(form);
        try {
            await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            });
        } catch (e) {
            console.info("Kirim ucapan offline/lokal:", e);
        }
        try {
            let savedWishes = [];
            const raw = localStorage.getItem(WEDDING_CONFIG.wishes.storageKey);
            if (raw) savedWishes = JSON.parse(raw);
            savedWishes.unshift(newWish);
            localStorage.setItem(WEDDING_CONFIG.wishes.storageKey, JSON.stringify(savedWishes));
        } catch (e) {
            console.warn("Storage save error:", e);
        }
        this.wishes.unshift(newWish);
        this.renderWishesList();
        form.reset();
        const charCounter = document.getElementById('wish-char-count');
        if (charCounter) charCounter.textContent = `0 / ${WEDDING_CONFIG.wishes.maxChars}`;
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.textContent = "Kirim Ucapan & Doa";
        }
        if (successEl) {
            successEl.textContent = "Aamiin. Terima kasih banyak atas doa dan ucapan tulus Anda!";
            successEl.classList.remove('hidden');
        }
    },
    initGiftCopy() {
        const copyButtons = document.querySelectorAll('[data-copy-target]');
        copyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetText = btn.getAttribute('data-copy-target');
                if (!targetText) return;
                navigator.clipboard.writeText(targetText).then(() => {
                    const originalText = btn.innerHTML;
                    btn.classList.add('copied');
                    btn.innerHTML = `
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        <span>Tersalin!</span>
                    `;
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.classList.remove('copied');
                    }, 2500);
                }).catch(err => {
                    console.warn("Gagal menyalin:", err);
                });
            });
        });
    }
};
document.addEventListener('DOMContentLoaded', () => {
    WeddingForms.init();
});
