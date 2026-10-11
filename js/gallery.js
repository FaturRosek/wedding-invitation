const GalleryLightbox = {
    currentIndex: 0,
    items: [],
    modal: null,
    modalImg: null,
    modalTitle: null,
    modalCaption: null,
    modalCounter: null,
    touchStartX: 0,
    touchEndX: 0,
    init() {
        this.modal = document.getElementById('gallery-lightbox');
        this.modalImg = document.getElementById('lightbox-image');
        this.modalTitle = document.getElementById('lightbox-title');
        this.modalCaption = document.getElementById('lightbox-caption');
        this.modalCounter = document.getElementById('lightbox-counter');
        if (!this.modal) return;
        if (typeof WEDDING_CONFIG !== 'undefined' && WEDDING_CONFIG.gallery) {
            this.items = WEDDING_CONFIG.gallery;
        }
        this.bindEvents();
    },
    bindEvents() {
        const galleryCards = document.querySelectorAll('[data-gallery-index]');
        galleryCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const index = parseInt(card.getAttribute('data-gallery-index'), 10);
                this.open(index);
            });
        });
        const closeBtn = document.getElementById('lightbox-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal || e.target.classList.contains('lightbox-backdrop')) {
                this.close();
            }
        });
        const prevBtn = document.getElementById('lightbox-prev-btn');
        const nextBtn = document.getElementById('lightbox-next-btn');
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.prev();
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.next();
            });
        }
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;
            if (e.key === 'Escape') {
                this.close();
            } else if (e.key === 'ArrowLeft') {
                this.prev();
            } else if (e.key === 'ArrowRight') {
                this.next();
            }
        });
        this.modal.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        this.modal.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
    },
    handleSwipe() {
        const diff = this.touchEndX - this.touchStartX;
        if (Math.abs(diff) > 40) {
            if (diff > 0) {
                this.prev(); 
            } else {
                this.next(); 
            }
        }
    },
    open(index) {
        if (index < 0 || index >= this.items.length) {
            index = 0;
        }
        this.currentIndex = index;
        this.updateContent();
        this.modal.classList.add('active');
        this.modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; 
    },
    close() {
        this.modal.classList.remove('active');
        this.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    },
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updateContent();
    },
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updateContent();
    },
    updateContent() {
        const item = this.items[this.currentIndex];
        if (!item) return;
        this.modalImg.style.opacity = '0';
        setTimeout(() => {
            this.modalImg.src = item.src;
            this.modalImg.alt = item.title || 'Foto Galeri Pernikahan';
            this.modalImg.onload = () => {
                this.modalImg.style.opacity = '1';
            };
        }, 150);
        if (this.modalTitle) {
            this.modalTitle.textContent = item.title || `Foto ${this.currentIndex + 1}`;
        }
        if (this.modalCaption) {
            this.modalCaption.textContent = item.caption || '';
        }
        if (this.modalCounter) {
            this.modalCounter.textContent = `${this.currentIndex + 1} / ${this.items.length}`;
        }
    }
};
document.addEventListener('DOMContentLoaded', () => {
    GalleryLightbox.init();
});
