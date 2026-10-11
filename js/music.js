const MusicPlayer = {
    audioElement: null,
    isPlaying: false,
    synthActive: false,
    audioContext: null,
    synthInterval: null,
    hasInteracted: false,
    init() {
        this.audioElement = document.getElementById('wedding-audio');
        const playBtn = document.getElementById('music-toggle-btn');
        if (!this.audioElement || !playBtn) return;
        if (typeof WEDDING_CONFIG !== 'undefined' && WEDDING_CONFIG.audio) {
            this.audioElement.src = WEDDING_CONFIG.audio.src;
        }
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePlay();
        });
        this.audioElement.addEventListener('play', () => {
            this.isPlaying = true;
            this.updateUI(true);
        });
        this.audioElement.addEventListener('pause', () => {
            this.isPlaying = false;
            this.updateUI(false);
        });
        this.audioElement.addEventListener('ended', () => {
            this.audioElement.currentTime = 0;
            this.audioElement.play().catch(() => {});
        });
        this.audioElement.addEventListener('error', (err) => {
            console.warn("Audio file gagal dimuat, menyiapkan Web Audio fallback:", err);
            if (WEDDING_CONFIG && WEDDING_CONFIG.audio && WEDDING_CONFIG.audio.fallbackSrc && this.audioElement.src.endsWith('.mp3')) {
                this.audioElement.src = WEDDING_CONFIG.audio.fallbackSrc;
                if (this.isPlaying) {
                    this.audioElement.play().catch(() => this.startSynth());
                }
            } else if (this.isPlaying) {
                this.startSynth();
            }
        });
    },
    startAfterOpen() {
        this.hasInteracted = true;
        this.play();
    },
    play() {
        if (!this.audioElement) return;
        const playPromise = this.audioElement.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.isPlaying = true;
                this.updateUI(true);
            }).catch(err => {
                console.warn("Autoplay terhalang atau audio error:", err);
                this.startSynth();
            });
        }
    },
    pause() {
        if (this.audioElement) {
            this.audioElement.pause();
        }
        if (this.synthActive) {
            this.stopSynth();
        }
        this.isPlaying = false;
        this.updateUI(false);
    },
    togglePlay() {
        if (this.isPlaying || this.synthActive) {
            this.pause();
        } else {
            this.play();
        }
    },
    updateUI(playing) {
        const btn = document.getElementById('music-toggle-btn');
        const disc = document.getElementById('music-disc');
        const icon = document.getElementById('music-icon');
        const waves = document.getElementById('music-waves');
        if (!btn) return;
        if (playing) {
            btn.setAttribute('aria-label', 'Jeda Musik');
            btn.classList.add('is-playing');
            if (disc) disc.classList.add('rotating');
            if (waves) waves.classList.add('active');
            if (icon) {
                icon.innerHTML = `
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                `;
            }
        } else {
            btn.setAttribute('aria-label', 'Putar Musik');
            btn.classList.remove('is-playing');
            if (disc) disc.classList.remove('rotating');
            if (waves) waves.classList.remove('active');
            if (icon) {
                icon.innerHTML = `
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                `;
            }
        }
    },
    startSynth() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            if (!this.audioContext) {
                this.audioContext = new AudioCtx();
            }
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            this.synthActive = true;
            this.isPlaying = true;
            this.updateUI(true);
            const chords = [
                [293.66, 369.99, 440.00, 587.33], 
                [220.00, 277.18, 329.63, 440.00], 
                [246.94, 293.66, 369.99, 493.88], 
                [185.00, 220.00, 277.18, 369.99], 
                [196.00, 246.94, 293.66, 392.00], 
                [293.66, 369.99, 440.00, 587.33], 
                [196.00, 246.94, 329.63, 392.00], 
                [220.00, 277.18, 329.63, 440.00]  
            ];
            let chordIndex = 0;
            let noteIndex = 0;
            const playNote = (freq) => {
                if (!this.synthActive || !this.audioContext) return;
                const osc = this.audioContext.createOscillator();
                const gain = this.audioContext.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                gain.gain.setValueAtTime(0.0001, this.audioContext.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.08, this.audioContext.currentTime + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 1.2);
                osc.connect(gain);
                gain.connect(this.audioContext.destination);
                osc.start();
                osc.stop(this.audioContext.currentTime + 1.25);
            };
            this.synthInterval = setInterval(() => {
                if (!this.synthActive) return;
                const currentChord = chords[chordIndex];
                playNote(currentChord[noteIndex]);
                noteIndex++;
                if (noteIndex >= currentChord.length) {
                    noteIndex = 0;
                    chordIndex = (chordIndex + 1) % chords.length;
                }
            }, 600);
        } catch (e) {
            console.warn("Web Audio fallback error:", e);
        }
    },
    stopSynth() {
        this.synthActive = false;
        if (this.synthInterval) {
            clearInterval(this.synthInterval);
            this.synthInterval = null;
        }
    }
};
document.addEventListener('DOMContentLoaded', () => {
    MusicPlayer.init();
});
