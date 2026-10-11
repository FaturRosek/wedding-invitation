document.addEventListener('DOMContentLoaded', () => {
    removeExternalBadges();
    syncConfigData();
    initCover();
    initScrollReveal();
    initNavigation();
    initCalendarButtons();
});
function removeExternalBadges() {
    const purge = () => {
        const badge = document.getElementById('nl-badge') || document.querySelector('.nl-badge') || document.querySelector('[aria-label*="Netlify"]');
        if (badge) badge.remove();
    };
    purge();
    const observer = new MutationObserver(purge);
    observer.observe(document.documentElement, { childList: true, subtree: true });
}
function syncConfigData() {
    if (typeof WEDDING_CONFIG !== 'undefined') {
        if (WEDDING_CONFIG.couple) {
            const heroImg = document.querySelector('.hero-image');
            if (heroImg && WEDDING_CONFIG.couple.mainPhoto) {
                heroImg.src = WEDDING_CONFIG.couple.mainPhoto;
            }
            const brideImg = document.querySelector('.profile-card:nth-of-type(1) .profile-photo-arch');
            if (brideImg && WEDDING_CONFIG.couple.bride && WEDDING_CONFIG.couple.bride.photo) {
                brideImg.src = WEDDING_CONFIG.couple.bride.photo;
            }
            const groomImg = document.querySelector('.profile-card:nth-of-type(3) .profile-photo-arch') || document.querySelector('.profile-card:last-of-type .profile-photo-arch');
            if (groomImg && WEDDING_CONFIG.couple.groom && WEDDING_CONFIG.couple.groom.photo) {
                groomImg.src = WEDDING_CONFIG.couple.groom.photo;
            }
        }
        if (WEDDING_CONFIG.location) {
            const venueTitle = document.querySelector('.location-venue-title');
            if (venueTitle && WEDDING_CONFIG.location.venueName) {
                venueTitle.textContent = WEDDING_CONFIG.location.venueName;
            }
            const venueAddress = document.querySelector('.location-address');
            if (venueAddress && WEDDING_CONFIG.location.fullAddress) {
                venueAddress.textContent = WEDDING_CONFIG.location.fullAddress;
            }
            const mapIframe = document.querySelector('.maps-frame-wrapper iframe');
            if (mapIframe && WEDDING_CONFIG.location.embedUrl) {
                mapIframe.src = WEDDING_CONFIG.location.embedUrl;
            }
            const dirBtn = document.querySelector('.location-actions a');
            if (dirBtn && WEDDING_CONFIG.location.directionUrl) {
                dirBtn.href = WEDDING_CONFIG.location.directionUrl;
            }
        }
    }
}
function initCover() {
    const cover = document.getElementById('invitation-cover');
    const openBtn = document.getElementById('open-invitation-btn');
    const mainContent = document.getElementById('main-invitation-content');
    if (!cover || !openBtn) return;
    document.body.classList.add('cover-locked');
    openBtn.addEventListener('click', () => {
        openBtn.classList.add('clicked');
        if (typeof MusicPlayer !== 'undefined' && MusicPlayer.startAfterOpen) {
            MusicPlayer.startAfterOpen();
        }
        cover.classList.add('opened');
        document.body.classList.remove('cover-locked');
        const floatingMusic = document.getElementById('floating-music');
        if (floatingMusic) floatingMusic.classList.add('visible');
        setTimeout(() => {
            const heroSection = document.getElementById('hero');
            if (heroSection) {
                heroSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 400);
        setTimeout(() => {
            cover.style.display = 'none';
        }, 1200);
    });
}
function initScrollReveal() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        document.querySelectorAll('.reveal-on-scroll').forEach(el => {
            el.classList.add('revealed');
        });
        return;
    }
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                obs.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });
    revealElements.forEach(el => observer.observe(el));
}
function initNavigation() {
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        if (backToTopBtn) {
            if (scrollY > 600) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    }, { passive: true });
}
function initCalendarButtons() {
    const calendarBtn = document.getElementById('add-calendar-btn');
    if (!calendarBtn) return;
    calendarBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const title = encodeURIComponent("Pernikahan Siti Rohmah & Mohammad Syakroni");
        const details = encodeURIComponent("Akad Nikah: 07.00 WIB\nResepsi: 13.00 WIB\nLokasi: Bupanjang, Tengket, Arosbaya, Bangkalan\n\nKehadiran dan doa restu Anda merupakan kehormatan bagi kami.");
        const location = encodeURIComponent("Bupanjang, Tengket, Arosbaya, Bangkalan, Jawa Timur");
        const dates = "20270408T000000Z/20270408T100000Z";
        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
        window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
    });
}
